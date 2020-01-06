import React, { useContext, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
      <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/notifications.svg`} alt='notification icon' aria-hidden="true"></img>
      <Typography variant="h2" component="h2">You have {count} Notification{count !== 1 ? 's' : ''}</Typography>
    </div>
    {count ? 
      notifications.map((item, i) => <NotificationItem key={i} notification={item} />)
      :
      <Typography variant="h6" className={classes.header}>You do not have any notifications.</Typography>
    }
  </>
}

export default Notifications