import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Divider, Typography, CircularProgress} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import getAPI from '../../data'

import { SendMessageContext } from './SendMessage.context'
import { LoginContext } from '../login/Login.context'

import NewMessageStepper from './NewMessageStepper'
import Recipients from './Recipients'
import ComposeMessage from './ComposeMessage'
import Preview from './Preview'
import Status from '../Status'
import FormButtons from './FormButtons'

const NewMessageWorkflow = () => {
  const { t } = useTranslation(['a_sendMessage','a_common'])
  const [activeStep, setActiveStep] = useState(0)
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)
  const [loginContext] = useContext(LoginContext)
  const navigate = useNavigate()
  
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
    
    getAPI.then(async api => {
      const { roles, subject, message} = sendMessageContext
      // formatted to match notifications api
      return await api.sendMessage({
        sentBy: loginContext.uuid,
        audiences:roles,
        subject: {
          en: subject,
          es: subject
        },
        message: {
          en: message,
          es: message
        }
      }).then(resp => {
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
      <Divider sx={{ my: 2 , mb: 4}} />

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
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
            <CircularProgress size={70} />
            <Typography sx={{ ml: 3 }} variant="h6">{t('progress.message')}</Typography>
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
              rightButtons={<Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={() => handleNavigate('dashboard')}>{t('success.buttons.return')}</Button>}
            />
          </Box>
        )}
      </form>
    </Box>
  )
}

export default NewMessageWorkflow