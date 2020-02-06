import React from 'react';
import { Link as RouterLink } from '@reach/router'
import { Button, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  formButtons: {
    marginBottom: theme.spacing(2)
  },
  btnCancel: {
    marginLeft: theme.spacing(1)
  }
}))

const LeaveOptions = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const { trackEvent } = useTracking()

  const trackClick = (e) => {
    trackEvent({
      prop42: `BioBank_ChangeParticipation|Leave:Understand`,
      eVar42: `BioBank_ChangeParticipation|Leave:Understand`,
      events: 'event76'
    })
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">{t('leave.0.pageTitle')}</Typography>
      <Typography variant="h2" className={classes.gutterBottom_2}>{t('leave.0.subtitle')}</Typography>
      <Typography component="div"><RenderContent source={t('leave.0.body')} /></Typography>
      <div className={classes.formButtons}>
        <Button variant="contained" color="primary" component={RouterLink} to='../leaveQuestions' onClick={trackClick}>{t('leave.0.submit')}</Button>
        <Button className={classes.btnCancel} variant="text" onClick={props.cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </div>
    </Box>
  )
}

export default LeaveOptions