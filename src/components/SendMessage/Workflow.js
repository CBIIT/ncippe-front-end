import React, { useState } from 'react'
import { Box, Button, Divider, Typography, CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { navigate } from '@reach/router'


import getAPI from '../../data'
import NewMessageStepper from './NewMessageStepper'
import Recipients from './Recipients'

const useStyles = makeStyles( theme => ({
  divider: {
    margin: theme.spacing(2, 0, 4, 0)
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
  formButtons: {
    marginTop: theme.spacing(2)
  },
  btnSubmit: {
    marginRight: theme.spacing(1)
  },
}),{name: 'NewMessageWorkflow'})

const NewMessageWorkflow = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage','a_common'])
  const [activeStep, setActiveStep] = useState(0)

  const validateAudience = (e) => {
    setActiveStep(1)
  }

  const validateMessage = (e) => {
    setActiveStep(2)
  }

  const confirmMessage = (e) => {
    setActiveStep(3)

    // simulate submitting message through api
    setTimeout(() => {
      setActiveStep(4)
    }, 2000)
  }

  const goBack = (e) => {
    if(activeStep === 0) {
      navigate(-1)
    } else {
      setActiveStep(prev => --prev)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // trigger function based on current active step
    switch (activeStep) {
      case 0:
        validateAudience()
        break
      case 1:
        validateMessage()
        break
      case 2:
        confirmMessage()
        break
      default:
        return false
    }
  }

  return (
    <Box>
      <NewMessageStepper activeStep={activeStep} />

      <Divider className={classes.divider} />
      <form id="sendNewMessage" autoComplete="off" onSubmit={handleFormSubmit}>
        {activeStep === 0 && (
          <Recipients />
        )}
        {activeStep === 1 && (
          <div>message</div>
        )}
        {activeStep === 2 && (
          <div>confirm</div>
        )}
        {activeStep === 3 && (
          <>
          <CircularProgress className={classes.progress} size={70} />
          <Typography className={classes.titleUploading} variant="h6">{t('progress.message')}</Typography>
          </>
        )}
        {activeStep === 4 && (
          <div>complete</div>
        )}
        <div className={classes.formButtons}>
          <Button className={classes.btnSubmit} variant="contained" color="primary" type="submit">{t('a_common:buttons.next')}</Button>
          <Button variant="text" color="primary" onClick={goBack}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
        </div>
      </form>
    </Box>
  )
}

export default NewMessageWorkflow

