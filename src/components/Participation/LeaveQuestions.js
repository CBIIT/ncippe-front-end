import React, { useContext, useState } from 'react'
import { Button, Box, Dialog, DialogContent, DialogActions, FormControl, TextField, Typography } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Clear as ClearIcon } from '@material-ui/icons'

import { LoginContext } from '../login/Login.context'
import { api } from '../../data/api'
import InputGroupError from '../inputs/InputGroupError/InputGroupError'
import Status from '../Status/Status'

const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2, 0, 5),
  },
  gutterBottom_2: {
    marginBottom: theme.spacing(2)
  },
  dim: {
    color: theme.palette.grey.medium
  },
  toggleButtonGroup: {
    paddingTop: theme.spacing(1),
    '& .MuiToggleButton-root': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(0, 3)
    },
    '& .MuiToggleButton-root:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '& .Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    '& .Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  textFieldFormControl: {
    width: '100%',
    marginBottom: theme.spacing(5)
  },
  formButtons: {
    marginBottom: theme.spacing(2)
  },
  btnCancel: {
    marginLeft: theme.spacing(1)
  },
  confirm: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const LeaveQuestions = (props) => {
  const {location: {state: {user}},cancel} = props
  const classes = useStyles()
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
      // open modal for final confirmation
      setIsModalOpen(true)
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    const {uuid, patientId, env, token, patients} = loginContext
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

    const data = [
      q1,
      q2,
      q3,
      q4
    ]

    api[env].withdrawUser({
      uuid,
      patientId: user ? user.patientId : patientId,
      qsAnsDTO: data,
      token
    })
    .then(resp => {
      console.log("resp", resp)
      // TODO: catch errors on 500 response
      if(resp instanceof Error) {
        setSaveError(resp)
      } else {
        // Save successful, also update the user context data
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
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Leave the Biobank</Typography>
      {user ? 
      <>
      <Typography variant="h2" component="h2">This will end {user.firstName} {user.lastName}'s participation</Typography>
      <Typography className={classes.gutterBottom_2}>Please guide the participant through the following questions so that we can handle their biospecimens and related information in an appropriate manner.</Typography>
      </>
      :
      <Typography className={classes.gutterBottom_2}>Before you leave the Biobank, we need to ask youa few questions about how to handle your samples and information.</Typography>
      }
      

      <Typography id="q1-text" variant="h3" gutterBottom>{ user ? 
        "May we continue to share the participant’s previously donated blood and tissue as well as relevant medical information with researchers?"
        :
        "May we continue to share the samples and medical information we already collected with researchers?"
      }</Typography>
      <Typography className={classes.dim}>Unfortunately, we can't get back samples and information that have already been shared.</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputGroupError error={q1Error} errorMessage="You must complete this field">
          <ToggleButtonGroup
            id="q1"
            className={classes.toggleButtonGroup}
            value={questionData.q1}
            exclusive
            onChange={changeQuestion}
          >
            <ToggleButton value="Yes">Yes</ToggleButton>
            <ToggleButton value="No">No</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>

      <Typography id="q2-text" variant="h3">{user ?
        "May we continue to access the participant’s medical record for research purposes?"
        :
        "May we continue to use the information in your medical record for research?"
      }</Typography>
      <Typography className={classes.dim}>We may collect information from {user ? "the participant's" : "your"} medical record for 10 years or longer. This may include information about {user ? "their" : "your"} diagnosis and past treatments. {user ? "They" : "You"} may opt out at any time.</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputGroupError error={q2Error} errorMessage="You must complete this field">
          <ToggleButtonGroup
            id="q2"
            className={classes.toggleButtonGroup}
            value={questionData.q2}
            exclusive
            onChange={changeQuestion}
          >
            <ToggleButton value="Yes">Yes</ToggleButton>
            <ToggleButton value="No">No</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>
      
      <Typography id="q3-text" variant="h3">Would {user ? "the participant" : "you"} like us to contact {user ? "them" : "you"} to talk about leaving the program and answer any questions {user ? "they" : "you"} may have?</Typography>
      <Typography className={classes.dim}>{user ? 
        "If they select yes, you or another research coordinator will call them."
        :
        "If you select yes, your research coordinator will call you."
      }</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputGroupError error={q3Error} errorMessage="You must complete this field">
          <ToggleButtonGroup
            id="q3"
            className={classes.toggleButtonGroup}
            value={questionData.q3}
            exclusive
            onChange={changeQuestion}
          >
            <ToggleButton value="Yes">Yes</ToggleButton>
            <ToggleButton value="No">No</ToggleButton>
          </ToggleButtonGroup>
        </InputGroupError>
      </FormControl>

      <Typography id="q4-text" variant="h3">Why {user ? "does the participant" : "do you"} want to leave the Biobank?</Typography>
      <Typography className={classes.dim}>Telling us why {user ? "they are" : "you're"} leaving will help us improve the program for future participants.</Typography>
      <FormControl component="fieldset" className={classes.textFieldFormControl}>
        <TextField
          id="q4"
          label="Reason for leaving (optional)"
          multiline
          rows="6"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          helperText="1000 character limit"
          inputProps={{
            maxLength: 1000,
          }}
          onChange={changeTextareaQuestion}
        />
      </FormControl>

      <div className={classes.formButtons}>
        <Button variant="contained" color="primary" onClick={handleNextStep}>Leave the Biobank</Button>
        <Button className={classes.btnCancel} variant="text" onClick={cancel}><ClearIcon />Cancel</Button>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          { user ? <>
          <Typography variant="h3" component="h3">Please confirm that {user.firstName} {user.lastName} is leaving the Biobank.</Typography>
          <Typography>The participant will need to speak to their doctor if they'd like to rejoin in the future.</Typography>
          </>:<>
          <Typography variant="h3" component="h3">Thank you for your participation in the Cancer Moonshot<sup>SM</sup> Biobank. Please confirm your decision to leave the Biobank.</Typography>
          <Typography>You'll need to speak to your coordinator if you'd like to rejoin in the future.</Typography>
          </>}

          {saveError && <Status state="error" title={saveError.name} message={saveError.message} />}

        </DialogContent>
        <DialogActions>
          <Button className={classes.confirm} onClick={handleSubmit} variant="contained">Confirm</Button>
          <Button variant="text" className={classes.btnCancel} onClick={handleClose}><ClearIcon />Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LeaveQuestions