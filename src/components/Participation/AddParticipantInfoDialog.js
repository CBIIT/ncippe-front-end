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
  btnCancel: {
    marginLeft: theme.spacing(2)
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
}))

const formDataDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  firstName_error: false,
  lastName_error: false,
  email_error: false,
  file: null,
  uploadError: false
}

const formValidationDefaults = {
  firstName: false,
  lastName: false,
  email: false,
  hasFile: false
}

const AddParticipantInfoDialog = (props) => {
  const {open, setParentState, patient: {patientId, dateCreated} = {} } = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(formDataDefaults)
  const [formDataValidation, setFormDataValidation] = useState(formValidationDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const { trackEvent } = useTracking()
  const stringRegex = /^[a-zA-Z\s]{1,}/
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // const {patients} = loginContext

  useEffect(() => {
    setIsOpen(open)
    //clean up
    return () => {}
  },[open])

  useEffect(() => {
    const {token, uuid} = loginContext
    // if we're validating then we're attempting to submit the form
    if (activeStep === 0 && formDataValidation.firstName && formDataValidation.lastName && formDataValidation.email) {
      trackEvent({
        prop42: `BioBank_NewParticipant|Next`,
        eVar42: `BioBank_NewParticipant|Next`,
        events: 'event75'
      })
      // submit user update
      getAPI.then(api => {
        api.updateParticipantDetails({
          uuid,
          token,
          patient: {
            patientId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          }
        }).then(resp => {
          if(resp instanceof Error) {
            //TODO: perhaps another status message?
            console.error(resp.message)
          } else {
            // save successful, move to the next step - upload consent form
            setActiveStep(1)
            // TODO: dispatch update
            // At this point the patient had name, email and marked as active
            // Front-end store should be updated to reflect backend updates
            // This disrupts the flow
            // perhaps only send fetch requests when both name and consent file has been completed
            // send both requests together in a Promise.all
          }
        })
        .catch(error => {
          console.error(error)
        })
      })
    }
    if( activeStep === 1 && formDataValidation.hasFile) {
      // submit consent form
      setActiveStep(2)
      trackEvent({
        prop42: `BioBank_NewParticipant|Submit`,
        eVar42: `BioBank_NewParticipant|Submit`,
        events: 'event78'
      })
      // setTimeout(() => {
      getAPI.then(api => {
        api.uploadPatientReport({
          patientId,
          uuid,
          reportFile: formData.file,
          fileType: 'PPE_FILETYPE_ECONSENT_FORM',
          token
        }).then(resp => {
          if(resp instanceof Error) {
            // Save unsuccessful - display status error
            setActiveStep(1)
            setFormData(prevState => ({
              ...prevState,
              uploadError: true
            }))
          } else {
            // update patient data front-end state
            const { patients } = loginContext
            const updatedPatients = patients.map(patient => {
              if (patient.patientId === patientId) {
                return {
                  ...patient,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  portalAccountStatus: null,
                }
              } else {
                return patient
              }
            }).sort((a, b) => a.lastName.localeCompare(b.lastName))

            dispatch({
              type: 'accountActivated',
              patients: updatedPatients
            })

            // save successful, close modal and redirect to Participant View
            navigate(`/dashboard/participant/${patientId}`, {
              state: {
                newParticipantActivated: true
              }
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
      })
    // }, 5000)
    }
  }, [formDataValidation])

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
      setFormDataValidation(formValidationDefaults)
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
      uploadError: false
    })
  }

  const handleFormSubmit = (e) => {
    if(activeStep === 0) {
      // reverse error booleans. If test fails then error is true
      setFormData(prev => ({
        ...prev,
        firstName_error: !stringRegex.test(formData.firstName),
        lastName_error: !stringRegex.test(formData.lastName),
        email_error: !emailRegex.test(formData.email)
      }))
      // if test fails then validation is false
      setFormDataValidation(prev => ({
        ...prev,
        firstName: stringRegex.test(formData.firstName),
        lastName: stringRegex.test(formData.lastName),
        email: emailRegex.test(formData.email)
      }))
    }

    if(activeStep === 1) {
      // validate consent form added
      if(!!formData.file) {
        setFormDataValidation(prev => ({
          ...prev,
          hasFile: true
        }))
      } else {
        setFormDataValidation(prev => ({
          ...prev,
          hasFile: false
        }))
        alert("you must upload a file")
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
      <DialogTitle id="responsive-dialog-title" disableTypography><Typography variant="h3" component="h3">{t('pageTitle')}</Typography></DialogTitle>
      <DialogContent>
        <Typography>{t('subtitle')}</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel><Typography>{t('stepper.0.label')}</Typography></StepLabel>
        </Step>
        <Step>
          <StepLabel><Typography>{t('stepper.1.label')}</Typography></StepLabel>
        </Step>
      </Stepper>
      <Paper elevation={3} className={classes.paper}>
        {activeStep === 1 && <Typography variant="h3">{formData.firstName} {formData.lastName}</Typography>}
        <Typography variant={activeStep === 0 ? "h3" : "body1"}>{t('a_common:participant.id')}: {patientId}</Typography>
        <Typography>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
      {activeStep === 0 && (
        <form id="activatePatient" className={classes.form} autoComplete="off" onSubmit={handleFormSubmit}>
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
        </form>
      )}
      {activeStep === 1 && (
        <>
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
          {formData.uploadError && <Status state="error" title={t('form.error.submit.title')} message={t('form.error.submit.message')} />}
        </>
      )}
      {activeStep === 2 && (
        <>
        <CircularProgress className={classes.progress} size={70} />
        <Typography className={classes.titleUploading} variant="h6">{t('progress')}</Typography>
        </>
      )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">{t('a_common:buttons.next')}</Button>
        <Button variant="text" className={classes.btnCancel} onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddParticipantInfoDialog