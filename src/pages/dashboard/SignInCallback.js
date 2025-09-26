import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, CircularProgress, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import { AuthContext } from '../../components/login/AuthContext'
import { LoginContext } from '../../components/login/Login.context'
import getAPI from '../../data'

const SignInCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handledRef = useRef(false); // To prevent multiple executions
  const [loginContext, dispatch] = useContext(LoginContext)
  const { roleName, uuid, auth, mockState } = loginContext
  const authContext = useContext(AuthContext)
  const { signinRedirectCallback } = authContext
  const { t } = useTranslation(['a_common'])
 
  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const handleAuth = async () => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const state = query.get('state'); // The state parameter from the OIDC redirect

    const routerState = location.state || {};
    // if (!routerState) {
    //   navigate('/error', {
    //     state: {
    //       error: {
    //         status: 'error',
    //         name: 'MissingState',
    //         message: t('components.signin.error.no_state'),
    //       },
    //     },
    //   })
    //   return
    // }

    const useMockData = routerState.mockUserLogin || mockState;
    try{

      let profile, id_token, access_token, api, token, user, jti

      if (useMockData) {
          const resp = await signinRedirectCallback({
            mockUserLogin: true,
            state: mockState,
          })
          profile = routerState?.profile || {}
          //const uuid = resp?.id_token
          jti = profile.jti
      } else {

        let codeVerifier = sessionStorage.getItem('code_verifier');

        // If not found, generate a new code_verifier (random string, usually 43-128 chars, URL-safe)
        if (!codeVerifier) {
          // Generate an unbiased random string of length 64 using rejection sampling
          const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
          const verifierLength = 64;
          const codeArray = [];
          while (codeArray.length < verifierLength) {
            const randomBytes = crypto.getRandomValues(new Uint8Array(1));
            const byte = randomBytes[0];
            // Accept bytes < 198 to avoid modulo bias (66 * 3 = 198)
            if (byte < 198) {
              codeArray.push(charset[byte % 66]);
            }
          }
          codeVerifier = codeArray.join('');
          sessionStorage.setItem('code_verifier', codeVerifier);
        }

        if (!code || !codeVerifier) {
            console.error('Missing authorization code');
            navigate('/error', { state: { message: 'Authentication code missing' } });
            return;      
          } 
 
        // exchange OIDC code for token via backend
        const response = await axios.post('/publicapi/auth/exchange', {
          code,
          code_verifier: codeVerifier,
          });
        //console.log('Token exchange response:', response.data);

        // Token successfully retrieved from backend
        // Assign id_token to the already defined variable
        id_token = response.data.id_token;
        access_token = response.data.access_token;

        // Optional: store tokens in local/session storage or use cookies
        //profile = authContext.parseJwt(id_token); // Use authService to parse
        const userInfo = await getAPI.then(api => { 
          return api.fetchLoginGovUserInfo(access_token).then(data => {
          if (data instanceof Error) {
            throw new Error(t('components.signin.error.not_auth'));
          }
          return data;
          });
        });
        profile = userInfo || {};
        jti = profile?.jti;
      }
      if (!profile.sub || !profile.email) {
          throw new Error(t('components.signin.error.not_auth'));
      }
     
      const uuid = profile.userid || profile.sub; // Use userId or sub as UUID
      const email = profile.email;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('id_token', id_token);
      localStorage.setItem('loggeduser_UUID', uuid);
        // Fetch application-specific token and user data from your backend
      const { tokenResp } = await getAPI.then(api => {
        return api.fetchToken({ uuid, email, id_token }).then(data => {
          if (data instanceof Error) {
            throw new Error(t('components.signin.error.not_auth'));
          }
          return data;
        });
      });
      token = tokenResp?.token;

      user = await getAPI.then(api => {
        return api.fetchUser({uuid, token}).then(data => {

          if(data instanceof Error){
            throw new Error(t('components.signin.error.not_auth'))
          } else {
            return data
          }
        })
      })

      dispatch({
        type: 'update',
        userData: {
          jti: jti,
          auth: true,
          token,
          ...user
        }
      }) 
          
      //localStorage.setItem('access_token', access_token);
      //localStorage.setItem('id_token', id_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Optionally, you can navigate to a different page after successful login
      // navigate('/dashboard');
    } catch(error){
      localStorage.clear();
      dispatch({
        type: 'reset'
      })
        navigate('/error', {
          state: {
            error: {
              status: 'error',
              name: error.name,
              message: error.message
            },
          },
        })
      }
    }

    handleAuth()
  }, [dispatch, mockState, location.state, signinRedirectCallback, authContext.authService,t, navigate ])

  useEffect(() => {
    if(uuid && auth && roleName) {
      window.$role = roleName.slice(9)
      const targetRoute =
        roleName === 'ROLE_PPE_MOCHA_ADMIN' ? '/account-mocha' : '/account'
      navigate(targetRoute)
    }
  }, [uuid, auth, roleName, navigate])

  // /signin-callback or similar page in React
  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get("code");
  //   if (code) {
  //     fetch(`/api/v1/auth/callback?code=${code}`, {
  //       method: 'POST',
  //       credentials: 'include',
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       // Store session data or navigate accordingly
  //     });
  //   }
  // }, []);

  return (
    <Container sx={{ textAlign: 'center', paddingTop: 10, marginBottom: 4 }}>
      <CircularProgress sx={{
    display: 'inline-block',
    verticalAlign: 'middle',
    color: 'primary.main', // or another color
    mr: 2, // marginRight if needed
  }} size={70} />
      <Typography sx={{  marginLeft: 3, display: 'inline' }} variant="h6">
        {t('components.signin.loading')}
      </Typography>
    </Container>
  )
}

export default SignInCallback