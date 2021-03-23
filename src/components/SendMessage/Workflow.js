import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Divider, Typography, CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { navigate } from '@reach/router'

import getAPI from '../../data'

import { SendMessageContext } from './SendMessage.context'
import NewMessageStepper from './NewMessageStepper'
import Recipients from './Recipients'
import ComposeMessage from './ComposeMessage'
import Preview from './Preview'
import Status from '../Status'
import FormButtons from './FormButtons'

const useStyles = makeStyles( theme => ({
  divider: {
    margin: theme.spacing(2, 0, 4, 0)
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  rightButtons: {
    textAlign: 'right',
    '& button': {
      marginLeft: theme.spacing(2)
    }
  },
}),{name: 'NewMessageWorkflow'})


const NewMessageWorkflow = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage','a_common'])
  const [activeStep, setActiveStep] = useState(0)
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)

  useEffect(() => {
    if(sendMessageContext.navigate) {
      handleNavigate(sendMessageContext.navigate)
    }
  }, [sendMessageContext.navigate])

  //TODO: perhaps save message content to local storage every 30 seconds?

  const handleFormSubmit = (event) => {
    if(event){
      event.preventDefault()
    }
    
    getAPI.then(api => {
      const { audiences, subject, message} = sendMessageContext
      return api.sendMessage({audiences, subject, body:message}).then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        handleNavigate('finish')
      })
    })
    .catch(error => {
      dispatch({
        type: 'error',
        data: error
      })
      handleNavigate('finish')
    })
  }

  const handleNavigate = (to) => {
    switch (to) {
      case 'dashboard':
        navigate('/account')
        break
      case 'recipients':
        setActiveStep(0)
        break
      case 'composeMessage':
        setActiveStep(1)
        break
      case 'preview':
        setActiveStep(2)
        break
      case 'submit':
        setActiveStep(3)
        handleFormSubmit()
        break
      case 'finish':
        setActiveStep(4)
        break
      case 'repeat':
        setActiveStep(0)
        dispatch({
          type: 'reset'
        })
        break
      default:
        console.error(`form navigation step '${to}' not found`)
    }
  }

  return (
    <Box>
      <NewMessageStepper activeStep={activeStep} />
      <Divider className={classes.divider} />

      <form id="sendNewMessage" autoComplete="off">
        {activeStep === 0 && (
          <Recipients />
        )}
        {activeStep === 1 && (
          <ComposeMessage />
        )}
        {activeStep === 2 && (
          <Preview />
        )}
        {activeStep === 3 && (
          <Box>
            <CircularProgress className={classes.progress} size={70} />
            <Typography className={classes.titleUploading} variant="h6">{t('progress.message')}</Typography>
          </Box>
        )}
        {activeStep === 4 && (
          <Box>
            {sendMessageContext.serverError ? 
              <Status 
                state="error"
                title={t('error.title')}
                message={t('error.message')}
              />
              :
              <Status 
                state="success"
                title={t('success.title')}
                message={t('success.message')}
              />
            }
            <FormButtons
              leftButtons={<Button variant="outlined" color="primary" onClick={() => handleNavigate('repeat')}>{t('success.buttons.repeat')}</Button>}
              rightButtons={<Button className={classes.btnSubmit} variant="contained" color="primary" onClick={() => handleNavigate('dashboard')}>{t('success.buttons.return')}</Button>}
            />
          </Box>
        )}
      </form>
    </Box>
  )
}

export default NewMessageWorkflow