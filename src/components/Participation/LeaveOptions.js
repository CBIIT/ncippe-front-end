import React from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router-dom'
import { Button, Box, Typography } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import RenderContent from '../utils/RenderContent'

const LeaveOptions = () => {
  const { isMobile, cancel } = useOutletContext();
  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const trackClick = (e) => {
    PubSub.publish('ANALYTICS', {
      events: 'event76',
      eventName: 'ChangeParticipationLeave',
      prop42: `BioBank_ChangeParticipation|Leave:Understand`,
      eVar42: `BioBank_ChangeParticipation|Leave:Understand`,
    })
  }

  return (
    <Box>
      <Typography sx={{mb: 2 }} variant={isMobile ? "h2" : "h1"} component="h1">
        {t('leave.0.pageTitle')}</Typography>
      <Typography variant={isMobile ? "h3" : "h2"} sx={{mb: 2 }} component="h2">
        {t('leave.0.subtitle')}</Typography>
      <Typography component="div">
        <RenderContent children={t('leave.0.body')} />
      </Typography>
      <Box sx={{ mb: 2}}>
        <Button sx={{ mr:1 }} variant="contained" 
        color="primary" component={RouterLink} to='../leaveQuestions' 
        onClick={trackClick}>{t('leave.0.submit')}</Button>
        <Button variant="text" color="primary" onClick={cancel}>
          <ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </Box>
    </Box>
  )
}

export default LeaveOptions