import React, { useContext, useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LoginContext } from '../login/SharedLogin/Login.context'
import { api } from '../../data/api'

import NotificationItem from './NotificationItem'

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(3, 0)
  }
}))

const Notifications = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {notificationList, newNotificationCount} = loginContext
  const count = notificationList ? notificationList.length : 0

  useEffect(() => {
    //mark notifications as read
    if(newNotificationCount){
      const {token, env, userGUID} = loginContext
      api[env].notificationsMarkAsRead({userGUID, token})
    }
  },[])

  return count ? <>
    <Typography variant="h2" className={classes.header}>
      You have {count} Notification{count !== 1 && 's'}
    </Typography>
    {notificationList.map((item, i) => (
      <NotificationItem key={i} notification={item} />
    ))}
    </> : (
    <Typography variant="h6" className={classes.header}>
      You do not have any notifications.
    </Typography>
  )
}

export default Notifications