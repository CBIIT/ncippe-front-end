// RequireAuth.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../components/login/Login.context';
import { getAPI } from '../data';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const RequireAuth = ({ children }) => {
  const [state, dispatch] = useContext(LoginContext);
  const [loading, setLoading] = useState(!state.auth);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      console.log('[RequireAuth] Fetching user...')
      try {
        const api = await getAPI
        const params = location.state?.uuid ? { uuid: location.state.uuid } : null
        const userData = await api.loginUser(params)
        if (userData && !(userData instanceof Error)) {
          console.log('[RequireAuth] User data loaded:', userData)
          dispatch({ type: 'update', userData: { auth: true, ...userData } })
          const lang = userData.lang || 'en'
          moment.locale(lang)
          if (lang !== i18n.language) i18n.changeLanguage(lang)

          if (userData.roleName === 'ROLE_PPE_MOCHA_ADMIN' && /^\/account(?!-)/.test(location.pathname)) {
            console.log('[RequireAuth] Redirecting to /account-mocha...')
            navigate('/account-mocha', { replace: true })
          }
        } else {
          console.error('[RequireAuth] Login error or invalid data')
          navigate('/error', { replace: true })
        }
      } catch (e) {
        console.error(e)
        navigate('/error', { replace: true })
      } finally {
        if(isMounted) {
          setLoading(false)
          console.log('[RequireAuth] Loading complete')
        }
      }
    }

    if (!state.auth){
       fetchUser()
    }else {
      setLoading(false)
    }
    return () => {
      isMounted = false
    }
  }, [loading])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p>{t('components.signin.loading')}</p>
      </div>
    )
  }

  return state.auth ? <>{children} </> : <Navigate to="/" replace state={{ from: location }} />
}
// const RequireAuth = ({ children }) => {
//   const [state] = useContext(LoginContext)
//   const location = useLocation()

//   if (!state.auth) {
//     return <Navigate to="/" state={{ from: location }} replace />
//   }

//   return <>{children}</>
// }
export default RequireAuth