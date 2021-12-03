import React, { useContext, useEffect, useState } from 'react'
import { Box, Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { navigate } from '@reach/router'

import { MochaContext } from './Mocha.context'

import UploadStepper from './UploadStepper'
import ParticipantId from './ParticipantId'
import AddReport from './AddReport'
import Progress from '../Progress'
import Finished from './Finished'

const useStyles = makeStyles( theme => ({
  paper: {
    padding: theme.spacing(5)
  },
  divider: {
    marginBottom: theme.spacing(3)
  },
  formUpload: {
    marginTop: theme.spacing(3)
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
}),{name: 'UploadReportWorkflow'})

const MochaReport = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [mochaContext, dispatch] = useContext(MochaContext)
  const { t } = useTranslation(['a_landingMocha','a_common'])

  // set activeStep when navigation value changes
  useEffect(() => {
    if(mochaContext.navigate) {
      switch (mochaContext.navigate) {
        case 'dashboard':
          navigate('/account-mocha')
          break
        case 'participantId':
        case 'reset':
          setActiveStep(0)
          break
        case 'addReport':
          setActiveStep(1)
          break
        case 'submit':
          setActiveStep(2)
          // handleFormSubmit()
          break
        case 'finish':
          setActiveStep(3)
          break
        case 'restart':
          dispatch({
            type: 'reset'
          })
          break
        default:
          console.error(`form navigation step '${mochaContext.navigate}' not found`)
      }
    }
  }, [mochaContext.navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={classes.root}>
      <Box mb={5}>
        <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        <Typography>{t('description')}</Typography>
      </Box>
      <Paper className={classes.paper} elevation={25}>
        <UploadStepper activeStep={activeStep} />
        <Divider className={classes.divider} />
        
        <form id="uploadPatientReport" className={classes.formUpload} autoComplete="off" onSubmit={handleSubmit}>
          {activeStep === 0 && (
            // participant ID
            <ParticipantId />
          )}
          {activeStep === 1 && (
            // select report to upload
            <AddReport />
          )}
          {activeStep === 2 && (
            // upload progress
            <Progress title={t('upload.2.progress')} />
          )}
          {activeStep === 3 && (
            // success
            <Finished />
          )}
        </form>
      </Paper>
    </div>
  )
}

export default MochaReport