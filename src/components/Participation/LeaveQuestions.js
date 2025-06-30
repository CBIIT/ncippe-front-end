import React, { useContext, useState } from 'react'
import { Button, Box, Dialog, DialogContent, DialogActions, FormControl, TextField, Typography } from '@mui/material'
import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { LoginContext } from '../login/Login.context'
// import { api } from '../../data/api'
import getAPI from '../../data'
import InputGroupError from '../inputs/InputGroupError'
import Status from '../Status'
import RenderContent from '../utils/RenderContent'

const LeaveQuestions = ({location, cancel,isMobile} ) => {
  
  const user = location?.state?.user

  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const [loginContext, dispatch] = useContext(LoginContext)
  const [questionData, setQuestionData] = useState({})
  const [q1Error, setQ1Error] = useState(false)
  const [q2Error, setQ2Error] = useState(false)
  const [q3Error, setQ3Error] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const changeQuestion = (event, value) => {
    const id = event.currentTarget.parentNode.id

    switch (id) {
      case "q1":
        setQ1Error(false)
        break;
      case "q2":
        setQ2Error(false)
        break;
      case "q3":
        setQ3Error(false)
        break;
      default:
        console.error("question id not found")
    }

    setQuestionData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const changeTextareaQuestion = (event) => {
    const id = event.currentTarget.id
    const value = event.currentTarget.value
    setQuestionData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const validateQuestions = () => {
    let isValid = true
    if(!questionData.q1) {
      setQ1Error(true)
      isValid = false
    }
    if(!questionData.q2) {
      setQ2Error(true)
      isValid = false
    }
    if(!questionData.q3) {
      setQ3Error(true)
      isValid = false
    }
    return isValid
  }

  const handleNextStep = () => {
    // validate - check for errors
    if(validateQuestions()){
      PubSub.publish('ANALYTICS', {
        events: 'event77',
        eventName: 'ChangeParticipationLeave',
        prop42: `BioBank_ChangeParticipation|Leave:LeaveBioBank`,
        eVar42: `BioBank_ChangeParticipation|Leave:LeaveBioBank`,
      })
      // open modal for final confirmation
      setIsModalOpen(true)
    }else{
      return
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    const {uuid, patientId, token, patients} = loginContext
    const q1 = {
      question: document.getElementById('q1-text').textContent,
      answer: questionData['q1'],
      questionOrder: "1"
    }
    const q2 = {
      question: document.getElementById('q2-text').textContent,
      answer: questionData['q2'],
      questionOrder: "2"
    }
    const q3 = {
      question: document.getElementById('q3-text').textContent,
      answer: questionData['q3'],
      questionOrder: "3"
    }
    const q4 = {
      question: document.getElementById('q4-text').textContent,
      answer: questionData['q4'],
      questionOrder: "4"
    }

    const data = [ q1, q2, q3, q4 ]
  

    PubSub.publish('ANALYTICS', {
      events: 'event78',
      eventName: 'ChangeParticipationLeave',
      prop42: `BioBank_ChangeParticipation|Leave:Confirm`,
      eVar42: `BioBank_ChangeParticipation|Leave:Confirm`,
    })

    getAPI.then(api => {
      api.withdrawUser({
        uuid,
        patientId: user ? user.patientId : patientId,
        qsAnsDTO: data,
        token
      })
      .then(resp => {
        // console.log("resp", resp)
        // TODO: catch errors on 500 response
        if(resp instanceof Error) {
          setSaveError(resp)
        } else {
          // Save successful, also update the user context data
          // Siteminder doesn't want to send us JSON in this instance. Ensure the response is in JSON format.
          if (typeof resp === 'string') {
            resp = JSON.parse(resp)
          }
          if(user) {
            // mark this one patient as withdrawn in the user's patients array
            const updatedPatientList = patients.map(patient => {
              if (patient.patientId === user.patientId) {
                return {
                  ...patient,
                  isActiveBiobankParticipant: false
                }
              }
              return patient
            })
            dispatch({
              type: 'update',
              userData: {
                patients: updatedPatientList
              }
            })

          } else {
            // update user data
            dispatch({
              type: 'update',
              userData: {
                ...resp
              }
            })
          }
          // close the modal
          cancel()
        }
      })
      .catch(error => {
        console.error(error)
      })
    })
  }

  return (
    <Box sx={{ px: 1,py:2, width:'100%', maxWidth:720, mx:'auto' }}>
    
      <Typography sx={{ mb: 2 }} variant={isMobile ? "h2" : "h1"} component="h1">{t('leave.1.pageTitle')}</Typography>
      {user ? 
      <>
      <Typography variant={isMobile ? "h3" : "h2"} component="h2">{t('leave.1.subtitle.admin',{firstName:user.firstName,lastName:user.lastName})}</Typography>
      <Typography sx={{ mb: 2 }}>{t('leave.1.description.admin')}</Typography>
      </>
      :
      <Typography sx={{ mb: 2 }}>{t('leave.1.description.participant')}</Typography>
      }
      
      <Typography id="q1-text" variant={isMobile ? "h4" : "h3"} gutterBottom>
        { user ? 
        t('leave.1.form.questions.0.question.admin'):t('leave.1.form.questions.0.question.participant')
      }</Typography>
      <Typography color="text.secondary" gutterBottom>
        { user ? 
        t('leave.1.form.questions.0.helper_text.admin'):t('leave.1.form.questions.0.helper_text.participant')
      }</Typography>
      <FormControl component="fieldset" fullWidth margin='normal' >
        <InputGroupError error={q1Error} errorMessage={t('leave.1.form.error')}>
          <ToggleButtonGroup
            id="q1"  sx={{
                pt: 1,
                '& .MuiToggleButton-root': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  backgroundColor: 'white',
                  px: 3,
                },
                '& .Mui-selected': {
                  color: 'white',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            value={questionData.q1}
            exclusive
            onChange={changeQuestion}
          >
            <ToggleButton value="Yes">{t('a_common:buttons.yes')}</ToggleButton>
            <ToggleButton value="No">{t('a_common:buttons.no')}</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>

      <Typography id="q2-text" variant={isMobile ? "h4" : "h3"}>{user ?
        t('leave.1.form.questions.1.question.admin'):t('leave.1.form.questions.1.question.participant')
      }</Typography>
      <Typography color="text.secondary" gutterBottom >{user ?
        t('leave.1.form.questions.1.helper_text.admin'):t('leave.1.form.questions.1.helper_text.participant')
      }</Typography>
      <FormControl component="fieldset" fullWidth margin='normal' >
        <InputGroupError error={q2Error} errorMessage={t('leave.1.form.error')}>
          <ToggleButtonGroup
            id="q2"  sx={{
                pt: 1,
                '& .MuiToggleButton-root': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  backgroundColor: 'white',
                  px: 3,
                },
                '& .Mui-selected': {
                  color: 'white',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            value={questionData.q2}
            exclusive
            onChange={changeQuestion}
          >
            <ToggleButton value="Yes">{t('a_common:buttons.yes')}</ToggleButton>
            <ToggleButton value="No">{t('a_common:buttons.no')}</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>
      
      <Typography id="q3-text" variant={isMobile ? "h4" : "h3"}>{user ?
        t('leave.1.form.questions.2.question.admin'):t('leave.1.form.questions.2.question.participant')
      }</Typography>
      <Typography color="text.secondary" gutterBottom >{user ? 
        t('leave.1.form.questions.2.helper_text.admin'):t('leave.1.form.questions.2.helper_text.participant')
      }</Typography>
      <FormControl component="fieldset" fullWidth margin='normal'>
        <InputGroupError error={q3Error} errorMessage={t('leave.1.form.error')}>
          <ToggleButtonGroup
            id="q3"
            value={questionData.q3}
            exclusive
            onChange={changeQuestion}
             sx={{
                pt: 1,
                '& .MuiToggleButton-root': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  backgroundColor: 'white',
                  px: 3,
                },
                '& .Mui-selected': {
                  color: 'white',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
          >
            <ToggleButton value="Yes">{t('a_common:buttons.yes')}</ToggleButton>
            <ToggleButton value="No">{t('a_common:buttons.no')}</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>

      <Typography id="q4-text" variant={isMobile ? "h4" : "h3"}>{user ?
        t('leave.1.form.questions.3.question.admin'):t('leave.1.form.questions.3.question.participant')
      }</Typography>
      <Typography color="text.secondary" gutterBottom >{user ? 
        t('leave.1.form.questions.3.helper_text.admin'):t('leave.1.form.questions.3.helper_text.participant')
      }</Typography>
      <FormControl component="fieldset" fullWidth margin='normal'>
        <TextField
          id="q4"
          label={t('leave.1.form.questions.3.textfield.label')}
          multiline
          rows={6}
          margin="normal"
          variant="outlined"
          helperText={t('leave.1.form.questions.3.textfield.helper_text')}
          inputProps={{ maxLength: 1000, }}
          onChange={changeTextareaQuestion}
        />
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 5 }} >
        <Button  sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }} variant="contained" onClick={handleNextStep}>{t('leave.1.submit')}</Button>
        <Button  sx={{ alignSelf: 'flex-end' }} variant="text" color="primary" onClick={cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          { user ? <>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3">{t('leave.2.modalTitle.admin',{user:`${user.firstName} ${user.lastName}`})}</Typography>
            <Typography>{t('leave.2.body.admin')}</Typography>
          </>:<>
            <Typography variant={isMobile ? "h4" : "h3"} component="h3"><RenderContent children={t('leave.2.modalTitle.participant')} /></Typography>
            <Typography>{t('leave.2.body.participant')}</Typography>
          </>}

          {saveError && <Status state="error" title={saveError.name} message={saveError.message} />}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" 
          sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }}>
            {t('leave.2.submit')}</Button>
          <Button variant="text" color="primary" onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
 
  )
}

export default LeaveQuestions