import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { 
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import moment from 'moment'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import Status from '../Status/Status'
import FileItem from '../Mocha/FileItem'
import InputGroupError from '../inputs/InputGroupError/InputGroupError'
import LangOption from '../inputs/LangOption/LangOption'

const useStyles = makeStyles(theme => ({
  // contentText: {
  //   marginBottom: theme.spacing(2)
  // },
  // formUpload: {
  //   marginTop: theme.spacing(3)
  // },
  // formButtons: {
  //   marginTop: theme.spacing(2)
  // },
  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.success.light
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: '70%'
  },
  btnSelectReport: {
    margin: theme.spacing(3,0,3)
  },
  input: {
    display: 'none'
  },
  spinner: {
    margin: theme.spacing(2, 0),
    maxWidth: '250px'
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
}),{name: 'AddParticipantInfoDialog'})

const formDataDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  lang: null,
  firstName_error: false,
  lastName_error: false,
  email_error: false,
  lang_error: false,
  file: null,
  file_error: false,
  file_errorTitle: '',
  file_errorMessage: '',
  updateUser_error: false
}

const AddParticipantInfoDialog = (props) => {
  const {open, setParentState, patient: {firstName, lastName, email, lang, patientId, dateCreated} = {} } = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(formDataDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const { trackEvent } = useTracking()
  const [submitText, setSubmitText] = useState(t('form.save'))
  const stringRegex = /^[a-zA-Z\s]{1,}/
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //from https://emailregex.com/
  const {token, uuid, patients} = loginContext

  useEffect(() => {
    setIsOpen(open)
    setSubmitText(t('form.save'))
    setFormData(prev => ({
      ...prev,
      firstName,
      lastName,
      email,
      lang
    }))
  },[open, firstName, lastName, email, lang, t])

  const updatePatient = async (activate = false) => {
    const updatedPatients = patients.map(patient => {
      if (patient.patientId === patientId) {
        let returnObj
        if(activate){
          returnObj = {
            ...patient,
            portalAccountStatus: "ACCT_ACTIVE",
          }
        } else {
          returnObj = {
            ...patient,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            lang: formData.lang,
          }
        }
        return returnObj
      } else {
        return patient
      }
    })
    // sort alphabetically
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    // bring new accounts to the top
    .sort((a,b) => {
      if(a.portalAccountStatus === "ACCT_NEW" && b.portalAccountStatus !== "ACCT_NEW") {
        return -1
      }
      if(b.portalAccountStatus === "ACCT_NEW" && a.portalAccountStatus !== "ACCT_NEW") {
        return 1
      }
      return 0
    })
    
    dispatch({
      type: 'accountActivated',
      patients: updatedPatients
    })
  } // end: updatePatient

  const handleClose = (e, success = false) => {
    if(setParentState){
      if(typeof success === 'boolean'){
        setParentState(success)
      } else {
        setParentState(false)
      }
    } else {
      setIsOpen(false)
    }
    // reset the form
    setTimeout(() => {
      setFormData(formDataDefaults)
      setActiveStep(0)
    }, 200)
  }

  const handleOnChange = event => {
    const field = event.target

    setFormData(prev => ({
      ...prev,
      [field.id]: field.value
    }))
  }

  const updateLang = lang => {
    setFormData(prev => ({
      ...prev,
      lang
    }))
  }

  // controled file input
  const handleFileChange = (event) => {
    //f = f.replace(/.*[\/\\]/, ''); -ie: evt.target.files[0].name
    const file = event.currentTarget.files.item(0)

    if(file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }))
    }
  }

  const handleRemoveFile = () => {
    const fileInput = document.getElementById('report-upload-file')
    fileInput.value = null
    setFormData({
      ...formData,
      file: null,
      file_error: false
    })
  }

  // ie11 does not support the `form` attribute connecting a submit button outside a form to the form's submit event
  const submitForm = (e) => {
    handleFormSubmit(e)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if(activeStep === 0) {
      // validate fields
      const firstName_error = !stringRegex.test(formData.firstName)
      const lastName_error = !stringRegex.test(formData.lastName)
      const email_error = !emailRegex.test(formData.email)
      const lang_error = typeof formData.lang === 'string' ? false : true

      // set validations
      setFormData(prev => ({
        ...prev,
        firstName_error,
        lastName_error,
        email_error,
        lang_error
      }))

      // if there are no errors...
      if (!firstName_error && !lastName_error && !email_error && !lang_error) {
        trackEvent({
          prop42: `BioBank_NewParticipant|Next`,
          eVar42: `BioBank_NewParticipant|Next`,
          events: 'event75',
          eventName: 'NewParticipantNext'
        })
        // submit user update
        setActiveStep(2) // show spinning loader while fetch is running
        getAPI.then(api => {
          api.updateParticipantDetails({
            uuid,
            token,
            patient: {
              patientId,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              lang: formData.lang
            }
          }).then(resp => {
            if(resp instanceof Error) {
              //TODO: perhaps another status message?
              throw resp
            } else {
              // save successful, move to the next step - upload consent form
              updatePatient()
              setActiveStep(1)
              setSubmitText(t('form.submit'))
            }
          })
          .catch(error => {
            console.error(error)
            setActiveStep(0)
            setFormData(prevState => ({
              ...prevState,
              updateUser_error: true
            }))
  
          })
        })
      }
    }

    if(activeStep === 1) {
      const file_error = !formData.file

      // set validations
      setFormData(prev => ({
        ...prev,
        file_error
      }))

      // verify that report data exists before fetch call
      if(!!formData.file) {

        // validate file type
        if(formData.file.type !== 'application/pdf') {
          setFormData(prevState => ({
            ...prevState,
            file_error: true,
            file_errorTitle:t('form.error.fileType.title'),
            file_errorMessage:t('form.error.fileType.message'),
          }))

          return
        }

        // submit consent form
        setActiveStep(2) // show spinning loader while fetch is running
        trackEvent({
          prop42: `BioBank_NewParticipant|Submit`,
          eVar42: `BioBank_NewParticipant|Submit`,
          events: 'event78',
          eventName: 'NewParticipantSubmit'
        })

        getAPI.then(api => {
          return api.uploadPatientReport({
            patientId,
            uuid,
            reportFile: formData.file,
            fileType: 'PPE_FILETYPE_ECONSENT_FORM',
            token
          }).then(resp => {
            if(resp instanceof Error) {
              // Save unsuccessful - display status error
              throw resp
            } else {
              // return API so user can be activated
              return getAPI
            }
          })
          .then(api => {
            return api.activateParticipant({
              uuid,
              token,
              patient: {
                patientId
              }
            })
          })
          .then(resp => {
            if(resp instanceof Error) {
              // Save unsuccessful - display status error
              throw resp
            } else {
              // update patient data front-end state
              updatePatient(true).then(() => {
                // save successful, close modal and redirect to Participant View
                navigate(`/account/participant/${patientId}`, {
                  state: {
                    newParticipantActivated: true
                  }
                })

              })
            }
          })
          .catch(error => {
            console.error(error)
            setActiveStep(1)
            setFormData(prevState => ({
              ...prevState,
              file_error: true,
              file_errorTitle:t('form.error.uploadFile.title'),
              file_errorMessage:t('form.error.uploadFile.message'),
            }))
          })
        })
      }
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" disableTypography><Typography variant="h3" component="h3">{t('title')}</Typography></DialogTitle>
      <DialogContent>
        <Typography>{t('subtitle')}</Typography>
      <Stepper className="Stepper--small-labels" activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel><Typography>{t('stepper.0.label')}</Typography></StepLabel>
        </Step>
        <Step>
          <StepLabel><Typography>{t('stepper.1.label')}</Typography></StepLabel>
        </Step>
      </Stepper>
      <Paper elevation={25} className={classes.paper}>
        {activeStep >= 1 && <Typography variant="h3">{formData.firstName} {formData.lastName}</Typography>}
        <Typography variant={activeStep === 0 ? "h3" : "body1"}>{t('a_common:participant.id')}: {patientId}</Typography>
        <Typography>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
      <form id="activatePatient" className={classes.form} autoComplete="off" onSubmit={handleFormSubmit}>
        {activeStep === 0 && (
          <div id="activatePatient--step-0">
            <TextField
              error={formData.firstName_error}
              required
              id="firstName"
              label={t('form.firstName')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleOnChange}
              value={formData.firstName}
              helperText={formData.firstName_error && t('form.error.firstName')}
            />
            <TextField
              error={formData.lastName_error}
              required
              id="lastName"
              label={t('form.lastName')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleOnChange}
              value={formData.lastName}
              helperText={formData.lastName_error && t('form.error.lastName')}
            />
            <TextField
              error={formData.email_error}
              required
              id="email"
              label={t('form.email')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleOnChange}
              value={formData.email}
              helperText={formData.email_error && t('form.error.email')}
            />
            <InputGroupError error={formData.lang_error} errorMessage={t('form.lang.error')}>
              <LangOption 
                id="lang"
                label={t('form.lang.label')}
                helperText={t('form.lang.helper_text')}
                editMode={true}
                value={formData.lang}
                onChange={updateLang}
              />
            </InputGroupError>
            {formData.updateUser_error && <Status state="error" title={t('form.error.updateUser.title')} message={t('form.error.updateUser.message')} />}
          </div>
        )}
        {activeStep === 1 && (
          <div id="activatePatient--step-1">
            {formData.file && formData.file.name && (
              <FileItem file={formData.file} onRemove={handleRemoveFile} />
            )}
            <input
              accept=".pdf"
              className={classes.input}
              id="report-upload-file"
              type="file"
              onChange={handleFileChange}
            />
            {!formData.file && (
              <label htmlFor="report-upload-file">
                <Button className={classes.btnSelectReport} variant="outlined" color="primary" component="span">{t('form.consentFile')}</Button>
              </label>
            )}
            {formData.file_error && <Status state="error" title={formData.file_errorTitle} message={formData.file_errorMessage} />}
          </div>
        )}
        {activeStep === 2 && (
          <div id="activatePatient--loading">
            <CircularProgress className={classes.progress} size={70} />
            <Typography className={classes.titleUploading} variant="h6">{t('progress')}</Typography>
          </div>
        )}
      </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={activeStep === 1 && !formData.file || activeStep === 1 && formData.file_error} color="primary" variant="contained" type="submit" data-form="activatePatient" onClick={submitForm}>{submitText}</Button>
        <Button variant="text" color="primary" className={classes.btnCancel} onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddParticipantInfoDialog