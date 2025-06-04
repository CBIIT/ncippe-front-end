import React, { useContext, useEffect, useState } from 'react'
import { Box, Divider, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MochaContext } from './Mocha.context'
import UploadStepper from './UploadStepper'
import ParticipantId from './ParticipantId'
import AddReport from './AddReport'
import Progress from '../Progress'
import Finished from './Finished'

const MochaReport = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [mochaContext, dispatch] = useContext(MochaContext)
  const { t } = useTranslation(['a_landingMocha','a_common'])
  const navigate = useNavigate();

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
  }, [mochaContext.navigate, dispatch, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Box >
      <Box mb={5}>
        <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        <Typography>{t('description')}</Typography>
      </Box>
      <Paper sx={{ p: 5 }} elevation={25}>
        <UploadStepper activeStep={activeStep} />
        <Divider sx={{ mb:3 }} />
        
        <Box component='form' id="uploadPatientReport" 
        sx={{ mt: 3 }} autoComplete="off" onSubmit={handleSubmit}>
          {activeStep === 0 && (
            // participant ID
            (<ParticipantId />)
          )}
          {activeStep === 1 && (
            // select report to upload
            (<AddReport />)
          )}
          {activeStep === 2 && (
            // upload progress
            (<Progress title={t('upload.2.progress')} />)
          )}
          {activeStep === 3 && (
            // success
            (<Finished />)
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default MochaReport