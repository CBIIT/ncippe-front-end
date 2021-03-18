import React, { useContext, useState, useCallback } from 'react'
import { Box, Container} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import getAPI from '../../data'
import Breadcrumbs from '../../components/Breadcrumbs'
import Notifications from '../../components/Notifications'

const Page = () => {
  const { t } = useTranslation(['a_common'])
  const [loginContext, dispatch] = useContext(LoginContext)
  const { notifications, newNotificationCount, lang, uuid, token } = loginContext
  const [ isNewSeen, setIsNewSeen ] = useState(false)

  // This callback is used in useEffect hook of <Notifications>, wrapping in useCallback to prevent rerenders
  const clearNewNotifications = useCallback(() => {
    if(newNotificationCount){
      setIsNewSeen(true)
      dispatch({
        type: 'clearNewNotifications'
      })
    }
  },[newNotificationCount, dispatch])

  // This callback is used in useEffect hook of <Notifications>, wrapping in useCallback to prevent rerenders
  const notificationsMarkAsRead = useCallback(() => {
    if(isNewSeen){
      getAPI.then(api => {
        api.notificationsMarkAsRead({uuid, token}).then((resp)=>{
          if(resp instanceof Error) {
            console.error(resp.message)
          } else {
            dispatch({
              type: 'notificationsMarkAsRead'
            })
          }
        })
      })
    }
  },[isNewSeen, dispatch, uuid, token])

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.notificationView.metaData.title')}</title>
        <meta name="title" content={t('components.notificationView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Notifications 
          notifications={notifications} 
          lang={lang}
          onLoad={clearNewNotifications} 
          onUnload={notificationsMarkAsRead}
        />
      </Container>
    </Box>
  )
}

export default Page