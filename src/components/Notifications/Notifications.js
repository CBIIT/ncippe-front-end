import React, { useContext, useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LoginContext } from '../login/SharedLogin/Login.context'
import { api } from '../../data/api'

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
    <div className={classes.titleWithIcon}>
      <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/notifications.svg`} alt='notification icon' aria-hidden="true"></img>
      <Typography variant="h2" component="h2">You have {count} Notification{count !== 1 && 's'}</Typography>
    </div>

    {notificationList.map((item, i) => (
      <NotificationItem key={i} notification={item} />
    ))}
    </> : <>
    <div className={classes.titleWithIcon}>
      <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/notifications.svg`} alt='notification icon' aria-hidden="true"></img>
      <Typography variant="h2" component="h2">You have {count} Notification{count !== 1 && 's'}</Typography>
    </div>
    <Typography variant="h6" className={classes.header}>
      You do not have any notifications.
    </Typography>
    </>
}

export default Notifications