import React, { useContext, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { LoginContext } from '../login/Login.context'
// import { api } from '../../data/api'
import getAPI from '../../data'

import NotificationItem from './NotificationItem'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
}))

const Notifications = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const { notifications } = loginContext
  const count = notifications ? notifications.length : 0
  const { t } = useTranslation('a_common')

  useEffect(() => {
    //mark notifications as read on unmount
    const {token, uuid, newNotificationCount} = loginContext
    if(newNotificationCount){
      dispatch({
        type: 'clearNewNotifications'
      })
    }
    return () => {
      if(newNotificationCount){
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
    }
  },[])

  return <>
    <div className={classes.titleWithIcon}>
      <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/notifications.svg`} alt={t('a_common:icons.notifications')} aria-hidden="true"></img>
      <Typography variant="h2" component="h2">{t('components.notificationView.pageTitle', {count})}</Typography>
    </div>
    {count ? 
      notifications.map((item, i) => <NotificationItem key={i} notification={item} lang={loginContext.lang} />)
      :
      <Typography variant="h6" className={classes.header}>{t('components.notificationView.no_results')}</Typography>
    }
  </>
}

export default Notifications