import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext, LoginConsumer }  from '../components/login/Login.context'
import getAPI from '../data'; 
import moment from 'moment';
import 'moment/locale/es';
moment.locale('en')

const PrivateRoute = () => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useContext(LoginContext)
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let params = null
        if (window.history.state?.uuid) {
          params = { uuid: window.history.state.uuid }
        }

        const api = await getAPI
        const data = await api.loginUser(params)

        if (!data || data instanceof Error) throw new Error(data)

        dispatch({
          type: 'update',
          userData: {
            auth: true,
            ...data
          }
        })

        // Handle role-specific redirect
        if (data.roleName === 'ROLE_PPE_MOCHA_ADMIN' && /^\/account(?!-)/.test(window.location.pathname)) {
          navigate('/account-mocha', { replace: true })
        }
      } catch (err) {
        console.error(err)
        navigate('/error', { replace: true })
      }
    }

    if (!state.auth) {
      fetchUserData()
    } else {
      const lang = state.lang || 'en'
      moment.locale(lang)
      if (lang !== i18n.language) {
        i18n.changeLanguage(lang)
        moment.locale(lang)
      }
    }
  }, [state, dispatch, i18n, navigate, t])

  if (!state.auth) return null // or a loading spinner
  return <Outlet />
}

export default PrivateRoute;
