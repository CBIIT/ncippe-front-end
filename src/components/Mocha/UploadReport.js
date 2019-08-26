import React, { useContext, useState } from 'react';
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import UploadStepper from './UploadStepper'
import FileItem from './FileItem'
import { isValidUUID } from '../../utils/utils'
import Status from '../Status/Status'
// import ToggleEnvButton from '../login/SharedLogin/ToggleEnvButton'

const useStyles = makeStyles( theme => ({
  root: {
  },
  spinner: {
    margin: theme.spacing(2, 0),
    maxWidth: '250px'
  },
  formUpload: {
    marginTop: theme.spacing(3)
  },
  formButtons: {
    marginTop: theme.spacing(2)
  },
  buttonClear: {
    marginLeft: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  confirmPatient_details: {
    margin: theme.spacing(3, 0)
  }
}))

const formDataDefaults = {
  reportFile: null,
  patientId: '',
  uploadError: false
}

const patientDataDefaults = {
  patientId: '',
  firstName: '',
  lastName: '',
  error: false,
  noFound: false
}

const UploadReport = (props) => {
  const classes = useStyles()
  const [formData, setFormData] = useState(formDataDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const [patientData, setPatientData] = useState(patientDataDefaults)
  const [loginContext, dispatch] = useContext(LoginContext)

  // controlled text input
  const handlePatientId = (event) => {
    // reset error if value is removed manually
    // const error = patientData.error && event.target.value !== '' ? true : false

    setPatientData({
      ...patientData,
      patientId: event.target.value
    })
  }

  // controled file input
  const handleFileChange = (event) => {
    // console.log(event.currentTarget.files); // cancel returns null
    // console.log(event.currentTarget.files.item(0)); // cancel returns null
    //f = f.replace(/.*[\/\\]/, ''); -ie: evt.target.files[0].name
    const file = event.currentTarget.files.item(0)

    if(file) {
      setFormData({
        ...formData,
        reportFile: file
      })
    }
  }

  const handleRemoveFile = () => {
    const fileInput = document.getElementById('report-upload-file')
    fileInput.value = null;
    setFormData({
      ...formData,
      reportFile: null,
      uploadError: false
    })
  }

  const validatePatientId = (event) => {
    const {token, env} = loginContext
    
    // clear any previous errors
    if(patientData.error) {
      setPatientData(prevState => ({
        ...prevState,
        error: false
      }))
    }
    // validate GUID length before next/api call
    // example GUID: b36284a2-cecf-4756-996c-abb0d8ba652c
    if(isValidUUID(patientData.patientId)) {

      api[env].fetchUser({userGUID: patientData.patientId, token})
      .then(resp => {
        if(resp.hasOwnProperty('userName')){
          // user found - progress
          const {firstName, lastName, userGUID: patientId} = resp
          setPatientData(prevState => ({
            ...prevState,
            firstName,
            lastName,
            notFound: false
          }))
          setFormData(prevState => ({
            ...prevState,
            patientId
          }))
          setActiveStep(1)
        } else {
          // user not found - show error
          setPatientData(prevState => ({
            ...prevState,
            notFound: true
          }))
        }
      })
    } else {
      // validation error
      setPatientData(prevState => ({
        ...prevState,
        error: true
      }))
    }
  }

  const uploadFile = () => {
    const {token, env, userGUID} = loginContext

    // verify that report data exists before fetch call
    if(!!formData.reportFile) {
      setActiveStep(2)
      // reset errors
      setFormData(prevState => ({
        ...prevState,
        uploadError: false
      }))
      // fake response delay
      // setTimeout(() => {
        api[env].uploadPatientReport({
          patientGUID: formData.patientId,
          userGUID,
          reportFile: formData.reportFile,
          token
        })
        .then(resp => {
          if(resp === true) {
            // Save successful
            setActiveStep(3)
          } else {
            // Save unsuccessful - go back a step
            setActiveStep(1)
            setFormData(prevState => ({
              ...prevState,
              uploadError: true
            }))
          }
        })
      // }, 3000)
    } else {
      // submit button is disabled if there is no file - this is now just a fallback
      alert("you must upload a file")
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // trigger function based on current active step
    switch (activeStep) {
      case 0:
        validatePatientId()
        break
      case 1:
        uploadFile()
        break
      default:
        validatePatientId()
    }
  }

  const goBack = () => {
    if(activeStep === 0) {
      setPatientData(prevState => ({
        ...prevState,
        patientId: '',
        error: false,
        notFound: false
      }))
    } else if (activeStep === 1) {
      handleRemoveFile()
      setActiveStep(activeStep - 1)
    } else {
      setActiveStep(activeStep - 1)
    }
  }

  const resetForm = () => {
    setActiveStep(0)
    setFormData(formDataDefaults)
    setPatientData(patientDataDefaults)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">Upload Biomarker test reports</Typography>
      <Typography>Once you upload a report, you will associate it with a participant. At that point, the participant, their provider, and their CRC's will be able to view and download the report.</Typography>
      <UploadStepper activeStep={activeStep} />
      
      <form id="uploadPatientReport" className={classes.formUpload} autoComplete="off" onSubmit={handleFormSubmit}>

      {activeStep === 0 && (
        <>
        <Typography variant="h6">Enter the ID of the patient associated with this report.</Typography>
        <TextField
          error={patientData.error}
          required
          id="patientId-required"
          label="Patient ID"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          helperText={patientData.error ? "Please enter a valid 8 character Patient ID" : "This number is on the top of the report"}
          onChange={handlePatientId}
          value={patientData.patientId}
        />
        {patientData.notFound && <Status state="error" title="This patient is not in the system" message="Please double check the Patient ID on the hard copy of the report and re-enter it above. If this problem persists, contact the system administrator." />}
        <div className={classes.formButtons}>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>Next</Button>
            <Button variant="text" className={classes.buttonClear} onClick={goBack}><ClearIcon />Cancel</Button>
        </div>
        </>
      )}


      {activeStep === 1 && (
        <>
        <Typography variant="h5">Patient: {patientData.firstName} {patientData.lastName}</Typography>
        <Typography variant="h6">Select a report to upload</Typography>
        {formData.reportFile && formData.reportFile.name && (
          <FileItem file={formData.reportFile} onRemove={handleRemoveFile} />
        )}

        <input
          accept=".pdf"
          className={classes.input}
          id="report-upload-file"
          type="file"
          onChange={handleFileChange}
        />
        {!formData.reportFile && (
          <label htmlFor="report-upload-file">
            <Button variant="outlined" color="primary" component="span">Select a report</Button>
          </label>
        )}
        {formData.uploadError && <Status state="error" title="Report failed to upload" message="We're sorry, something went wrong. Please try to upload this report again. If this problem persists, contact your system administrator." />}

        <div className={classes.formButtons}>
          <Button variant="contained" color="primary" onClick={handleFormSubmit} disabled={!formData.reportFile}>Submit</Button>
          <Button variant="text" className={classes.buttonClear} onClick={goBack}><ClearIcon />Cancel</Button>
        </div>
        </>
      )}

      {activeStep === 2 && (
        <>
        <Typography variant="h6">Uploading report...</Typography>
        <img src={`/${process.env.PUBLIC_URL}assets/images/spinner-dna.svg`} className={classes.spinner} alt="Loading..." />
        </>
      )}

      {activeStep === 3 && (
        <>
        <Status state="success" title="Biomarker report uploaded successfully!" message="We sent an email to let the patient, their provider, and their CRC know." />
        <div className={classes.formButtons}>
          <Button variant="contained" onClick={resetForm}>Upload another report</Button>
        </div>
        </>
      )}

      {/* <ToggleEnvButton /> */}
        
      </form>
    </div>
  )
}

export default UploadReport
