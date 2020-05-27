import React, { useContext, useState } from 'react';
import { Box, Button, Divider, Paper, Typography, TextField, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import UploadStepper from './UploadStepper'
import FileItem from './FileItem'
import { isValidUserId } from '../../utils/utils'
import Status from '../Status/Status'

const useStyles = makeStyles( theme => ({
  paper: {
    padding: theme.spacing(5)
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
  btnSelectReport: {
    margin: theme.spacing(2,0,4)
  },
  btnSubmit: {
    marginRight: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  confirmPatient_details: {
    margin: theme.spacing(3, 0)
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
  divider: {
    marginBottom: theme.spacing(3)
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

const UploadReport = () => {
  const classes = useStyles()
  const [formData, setFormData] = useState(formDataDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const [patientData, setPatientData] = useState(patientDataDefaults)
  const [loginContext] = useContext(LoginContext)
  const { t } = useTranslation(['a_landingMocha','a_common'])
  const { trackEvent } = useTracking()

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
    const {token} = loginContext
    
    // clear any previous errors
    if(patientData.error) {
      setPatientData(prevState => ({
        ...prevState,
        error: false
      }))
    }
    // validate GUID length before next/api call
    // example GUID: b36284a2-cecf-4756-996c-abb0d8ba652c
    if(isValidUserId(patientData.patientId)) {

      // api[env].fetchUser({patientId: patientData.patientId, token})
      getAPI.then(api => {
        api.fetchUser({patientId: patientData.patientId, token})
          .then(resp => {
            if(resp.hasOwnProperty('message')) {
              // user not found - show error
              setPatientData(prevState => ({
                ...prevState,
                notFound: true
              }))
              trackEvent({
                prop42: `BioBank_AdminUpload|Error: User not found in the system`,
                eVar42: `BioBank_AdminUpload|Error: User not found in the system`,
                events: 'event81',
                eventName: 'PatientIDError'
              })
            } else {
              // user found - progress
              const {firstName, lastName, patientId} = resp
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
              trackEvent({
                prop42: `BioBank_AdminUpload|PatientIDEntered`,
                eVar42: `BioBank_AdminUpload|PatientIDEntered`,
                events: 'event73',
                eventName: 'PatientIDEntered'
              })
            }
          })
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
    const {token, uuid} = loginContext

    // verify that report data exists before fetch call
    if(!!formData.reportFile) {
      setActiveStep(2)
      trackEvent({
        prop42: `BioBank_AdminUpload|FilesUploaded`,
        eVar42: `BioBank_AdminUpload|FilesUploaded`,
        events: 'event78',
        eventName: 'FilesUploaded'
      })
      // reset errors
      setFormData(prevState => ({
        ...prevState,
        uploadError: false
      }))
      // fake response delay
      // setTimeout(() => {
        // api[env].uploadPatientReport({
        getAPI.then(api => {
          api.uploadPatientReport({
            patientId: formData.patientId,
            uuid,
            reportFile: formData.reportFile,
            fileType: 'PPE_FILETYPE_BIOMARKER_REPORT',
            token
          })
          .then(resp => {
            if(resp instanceof Error) {
              // Save unsuccessful - go back a step
              setActiveStep(1)
              setFormData(prevState => ({
                ...prevState,
                uploadError: true
              }))
              trackEvent({
                prop42: `BioBank_AdminUpload|Error: Failed to upload to server`,
                eVar42: `BioBank_AdminUpload|Error: Failed to upload to server`,
                events: 'event81',
                eventName: 'AdminUploadError'
              })
            } else {
              // Save successful
              setActiveStep(3)
              trackEvent({
                prop42: `BioBank_AdminUpload|Completed`,
                eVar42: `BioBank_AdminUpload|Completed`,
                events: 'event80',
                eventName: 'AdminUploadComplete'
              })
            }
          })
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
      <Box mb={5}>
        <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        <Typography>{t('description')}</Typography>
      </Box>
      <Paper className={classes.paper} elevation={25}>
        <UploadStepper activeStep={activeStep} />
        <Divider className={classes.divider} />
        
        <form id="uploadPatientReport" className={classes.formUpload} autoComplete="off" onSubmit={handleFormSubmit}>

        {activeStep === 0 && (
          <>
          <Typography variant="h6">{t('upload.0.form_title')}</Typography>
          <TextField
            error={patientData.error}
            required
            id="patientId-required"
            label={t('upload.0.input_label')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            helperText={patientData.error ? t('upload.0.input_error') : t('upload.0.input_helper_text')}
            onChange={handlePatientId}
            value={patientData.patientId}
            inputProps={{
              maxLength: 20,
            }}
          />
          {patientData.notFound && <Status state="error" title={t('upload.0.error.title')} message={t('upload.0.error.message')} />}
          <div className={classes.formButtons}>
              <Button className={classes.btnSubmit} variant="contained" color="primary" type="submit">{t('a_common:buttons.next')}</Button>
              <Button variant="text" onClick={goBack}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
          </div>
          </>
        )}


        {activeStep === 1 && (
          <>
          <Typography variant="h2" component="h2">{t('upload.1.form_title')}: {patientData.firstName} {patientData.lastName}</Typography>
          <Typography variant="h3">{t('upload.1.form_subtitle')}</Typography>
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
              <Button className={classes.btnSelectReport} variant="outlined" color="primary" component="span">{t('upload.1.button_select')}</Button>
            </label>
          )}
          {formData.uploadError && <Status state="error" title={t('upload.1.error.title')} message={t('upload.1.error.message')} />}

          <div className={classes.formButtons}>
            <Button className={classes.btnSubmit} variant="contained" color="primary" onClick={handleFormSubmit} disabled={!formData.reportFile}>{t('a_common:buttons.submit')}</Button>
            <Button variant="text" onClick={goBack}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
          </div>
          </>
        )}

        {activeStep === 2 && (
          <>
          <CircularProgress className={classes.progress} size={70} />
          <Typography className={classes.titleUploading} variant="h6">{t('upload.2.progress')}</Typography>
          {/* <img src={`/${process.env.PUBLIC_URL}assets/images/spinner-dna.svg`} className={classes.spinner} alt="Loading..." /> */}
          </>
        )}

        {activeStep === 3 && (
          <>
          <Status state="success" title={t('upload.3.success.title')} message={t('upload.3.success.message')} />
          <div className={classes.formButtons}>
            <Button variant="contained" color="primary" onClick={resetForm}>{t('upload.3.success.button_reset')}</Button>
          </div>
          </>
        )}
        </form>
      </Paper>
    </div>
  )
}

export default UploadReport
