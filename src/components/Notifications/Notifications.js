import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NotificationItem from './NotificationItem'


/**
 * A listing of notifications. On viewing notifications, all "new" items are marked as read.
 */
const Notifications = (props) => {
  const { onLoad, onUnload, notifications, lang } = props
  const count = notifications ? notifications.length : 0
  const { t } = useTranslation('a_common')

  useEffect(() => {
    //mark notifications as read when screen loads
    if(onLoad){
      onLoad()
    }
  },[onLoad])

  useEffect(() => {
    //mark notifications as read in the backend on unmount
    return () => {
      if(onUnload){
        onUnload()
      }
    }
  },[onUnload])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box component='img'  sx={{ width: '49px', mr: 3 }} src={`${process.env.PUBLIC_URL}/assets/icons/notifications.svg`} 
        alt={t('a_common:icons.notifications')} aria-hidden="true"></Box>
       <Typography variant="h2" component="h2">
        { count > 1 ? t('components.notificationView.pageTitle_plural', {count}):
        t('components.notificationView.pageTitle', {count})}
      </Typography>
      </Box>
      
      {count ? 
        notifications.map((item, i) => <NotificationItem key={i} notification={item} lang={lang} />)
        :
        <Typography variant="h6" sx={{ mb: 2 }}>{t('components.notificationView.no_results')}</Typography>
      }
    </>
  )
}

Notifications.displayName = "Notifications"
Notifications.propTypes = {
  /**
   * An array of notifications as structured for the `NotificationItem` component
   */
  notifications: PropTypes.arrayOf(PropTypes.object),
  /**
   * The language preference for this user
   */
  lang: PropTypes.oneOf(['en','es']),
  /**
   * The callback when notifications are first loaded
   */
  onLoad: PropTypes.func,
  /**
   * The callback when the component unloads (returning to the Dashboard)
   */
  onUnload: PropTypes.func
}

export default Notifications