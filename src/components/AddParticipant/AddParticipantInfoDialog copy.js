import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Button, Box,
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
  useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import moment from 'moment'
import { styled } from '@mui/material/styles'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import Status from '../Status'
import FileItem from '../FileItem/FileItem'
import InputGroupError from '../inputs/InputGroupError'
import LangOption from '../inputs/LangOption'

const StyledTextField = styled(TextField)(({ theme }) => ({ // ★ CHANGED: responsive widths via breakpoints
  width: '100%',
  [theme.breakpoints.up('sm')]: { width: '80%' },
  [theme.breakpoints.up('md')]: { width: '70%' },
}));

const AddParticipantInfoDialog = (props) => {
  const {open, setParentState, patient: {firstName, lastName, email, lang, patientId, dateCreated} = {} } = props

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
    updateUserError: false,
    uploadError: false
  }
  
  const formValidationDefaults = {
    firstName: false,
    lastName: false,
    email: false,
    lang: false,
    hasFile: false
  }
  
  const [loginContext, dispatch] = useContext(LoginContext)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(formDataDefaults)
  const [formDataValidation, setFormDataValidation] = useState(formValidationDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const { trackEvent } = useTracking()
  const [submitText, setSubmitText] = useState(t('form.save'))
  const stringRegex = /^[a-zA-Z\s]{1,}/
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //from https://emailregex.com/
  // const {patients} = loginContext
  const {token, uuid, patients} = loginContext
  const navigate = useNavigate();

  useEffect(() => {
    // ★ CHANGED: submission side-effects moved into handleFormSubmit(); effect left intentionally empty.
  }, [formDataValidation])

   // local optimistic helpers
   const updatePatientLocal = () => {
    const updatedPatients = patients
      .map((p) =>
        p.patientId === patientId
          ? {
              ...p,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              lang: formData.lang,
            }
          : p
      )
      .sort((a, b) => {
        const aNew = a.portalAccountStatus === 'ACCT_NEW';
        const bNew = b.portalAccountStatus === 'ACCT_NEW';
        if (aNew !== bNew) return aNew ? -1 : 1;
        return (a.lastName || '').localeCompare(b.lastName || '');
      });

    dispatch({ type: 'accountActivated', patients: updatedPatients });
  };

  const activatePatientLocal = () => {
    const updatedPatients = patients.map((p) =>
      p.patientId === patientId ? { ...p, portalAccountStatus: null } : p
    );
    dispatch({ type: 'accountActivated', patients: updatedPatients });
  };

  // refresh via existing API
  const refreshFromServer = async () => {
    try {
      const api = await getAPI;
      const freshUser = await api.fetchUser({ uuid, token });
      const freshPatients = Array.isArray(freshUser?.patients) ? freshUser.patients : [];
      dispatch({ type: 'accountActivated', patients: freshPatients });
    } catch {
      // non-fatal
    }
  };

  // seed values & keep label synced like original deps [open, firstName, lastName, email, lang, t]
  useEffect(() => {
    if (!open) return;
    setFormData((prev) => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      lang: lang || 'en',
      updateUserError: false,
      uploadError: false,
      noFileError: false,
    }));
    setFormDataValidation({
      firstName: !!(firstName || '').trim(),
      lastName: !!(lastName || '').trim(),
      email: email ? emailRegex.test(email) : true,
      lang: typeof (lang || 'en') === 'string',
      hasFile: false,
    });
    setActiveStep(0);
    setSubmitText(t('form.save'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, firstName, lastName, email, lang, t]);


  // useEffect(() => {
  //   const updatePatient = () => {
  //     const updatedPatients = patients.map(patient => {
  //       if (patient.patientId === patientId) {
  //         return {
  //           ...patient,
  //           firstName: formData.firstName,
  //           lastName: formData.lastName,
  //           email: formData.email,
  //           lang: formData.lang,
  //         }
  //       } else {
  //         return patient
  //       }
  //     })
  //     // sort alphabetically
  //     .sort((a, b) => a.lastName.localeCompare(b.lastName))
  //     // bring new accounts to the top
  //     .sort((a,b) => {
  //       if(a.portalAccountStatus === "ACCT_NEW" && b.portalAccountStatus !== "ACCT_NEW") {
  //         return -1
  //       }
  //       if(b.portalAccountStatus === "ACCT_NEW" && a.portalAccountStatus !== "ACCT_NEW") {
  //         return 1
  //       }
  //       return 0
  //     })
      

  //     dispatch({
  //       type: 'accountActivated',
  //       patients: updatedPatients
  //     })
  //   }
    
  //   const activatePatient = () => {
      
  //     const updatedPatients = patients.map(patient => {
  //       if (patient.patientId === patientId) {
  //         return {
  //           ...patient,
  //           portalAccountStatus: null,
  //         }
  //       } else {
  //         return patient
  //       }
  //     })

  //     dispatch({
  //       type: 'accountActivated',
  //       patients: updatedPatients
  //     })
  //   }
  //   // if we're validating then we're attempting to submit the form
  //   if (activeStep === 0 && formDataValidation.firstName && formDataValidation.lastName && formDataValidation.email && formDataValidation.lang) {
  //     trackEvent({
  //       prop42: `BioBank_NewParticipant|Next`,
  //       eVar42: `BioBank_NewParticipant|Next`,
  //       events: 'event75',
  //       eventName: 'NewParticipantNext'
  //     })
  //     // submit user update
  //     setActiveStep(2)
  //     getAPI.then(api => {
  //       api.updateParticipantDetails({
  //         uuid,
  //         token,
  //         patient: {
  //           patientId,
  //           firstName: formData.firstName,
  //           lastName: formData.lastName,
  //           email: formData.email,
  //           lang: formData.lang
  //         }
  //       }).then(resp => {
  //         if(resp instanceof Error) {
  //           //TODO: perhaps another status message?
  //           throw resp
  //         } else {
  //           // save successful, move to the next step - upload consent form
  //           updatePatient()
  //           setActiveStep(1)
  //           setSubmitText(t('form.submit'))
  //         }
  //       })
  //       .catch(error => {
  //         //console.error(error)
  //         setActiveStep(0)
  //         setFormData(prevState => ({
  //           ...prevState,
  //           updateUserError: true
  //         }))

  //       })
  //     })
  //   }
  //   if( activeStep === 1 && formDataValidation.hasFile) {
  //     // submit consent form
  //     setActiveStep(2)
  //     trackEvent({
  //       prop42: `BioBank_NewParticipant|Submit`,
  //       eVar42: `BioBank_NewParticipant|Submit`,
  //       events: 'event78',
  //       eventName: 'NewParticipantSubmit'
  //     })
  //     // setTimeout(() => {
  //     getAPI.then(api => {
  //       api.uploadPatientReport({
  //         patientId,
  //         uuid,
  //         reportFile: formData.file,
  //         fileType: 'PPE_FILETYPE_ECONSENT_FORM',
  //         token
  //       }).then(resp => {
  //         if(resp instanceof Error) {
  //           // Save unsuccessful - display status error
  //           throw resp
  //         } else {
  //           // return API so user can be activated
  //           return getAPI
  //         }
  //       })
  //       .then(api => {
  //         api.activateParticipant({
  //           uuid,
  //           token,
  //           patient: {
  //             patientId
  //           }
  //         })
  //       })
  //       .then(resp => {
  //         if(resp instanceof Error) {
  //           // Save unsuccessful - display status error
  //           throw resp
  //         } else {
  //           // update patient data front-end state
  //           activatePatient();
  //           // save successful, close modal and redirect to Participant View
  //           navigate(`/account/participant/${patientId}`, {
  //             state: {
  //               newParticipantActivated: true
  //             }
  //           })
  //         }
  //       })
  //       .catch(error => {
  //         //console.error(error)
  //         setActiveStep(1)
  //         setFormData(prevState => ({
  //           ...prevState,
  //           uploadError: true
  //         }))
  //       })
  //     })
  //   // }, 5000)
  //   }
  // }, [formDataValidation])

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
      uploadError: false
    })
  }

  // ie11 does not support the `form` attribute connecting a submit button outside a form to the form's submit event
  const submitForm = (e) => {
    handleFormSubmit(e)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if(activeStep === 0) {
      // reverse error booleans. If test fails then error is true
      const validFirst = stringRegex.test(formData.firstName);
      const validLast = stringRegex.test(formData.lastName);
      const validEmail = (formData.email === null || formData.email === '') ? true : emailRegex.test(formData.email);
      const validLang = typeof formData.lang === 'string';
    

      setFormData(prev => ({
        ...prev,
        firstName_error: !validFirst,
        lastName_error: !validLast,
        email_error: !validEmail,
        lang_error: !validLang,
      }));
      // if test fails then validation is false
      setFormDataValidation(prev => ({
        ...prev,
        firstName: validFirst,
        lastName: validLast,
        email: validEmail,
        lang: validLang,
      }))
    
      if (validFirst && validLast && validEmail && validLang) {
        try {
          trackEvent({
            prop42: `BioBank_NewParticipant|Next`,
            eVar42: `BioBank_NewParticipant|Next`,
            events: 'event75',
            eventName: 'NewParticipantNext'
          })
          setActiveStep(2);
          const api = await getAPI;
          await api.updateParticipantDetails({
            uuid,
            token,
            patient: {
              patientId,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              lang: formData.lang
            }
          });
          updatePatientLocal(); 
          await refreshFromServer();
          setActiveStep(1);
          setSubmitText(t('form.submit'));
        } catch (err) {
          setActiveStep(0);
          setFormData(prev => ({ ...prev, updateUserError: true })); // ★ CHANGED
        }
        return
      }
    }

    if(activeStep === 1) {
      // validate consent form added
      const hasFile = !!formData.file;
      setFormDataValidation(prev => ({ ...prev, hasFile }));
      setFormData(prev => ({ ...prev, noFileError: !hasFile }));

      if (!hasFile) return;

      try {
        trackEvent({
          prop42: `BioBank_NewParticipant|Submit`,
          eVar42: `BioBank_NewParticipant|Submit`,
          events: 'event78',
          eventName: 'NewParticipantSubmit'
        })
        setActiveStep(2);
        const api = await getAPI;
        await api.uploadPatientReport({
          patientId,
          uuid,
          reportFile: formData.file,
          fileType: 'PPE_FILETYPE_ECONSENT_FORM',
          token
        });
        await api.activateParticipant({
          uuid,
          token,
          patient: { patientId }
        });
  
        activatePatientLocal(); 
        await refreshFromServer();
       
        navigate(`/account/participant/${patientId}`, {
          state: { newParticipantActivated: true }
        });
      } catch (err) {
        setActiveStep(1);
        setFormData(prev => ({ ...prev, uploadError: true })); // ★ CHANGED
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
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h3" component="h3">{t('title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{t('subtitle')}</Typography>
        <Stepper className="Stepper--small-labels" activeStep={activeStep} 
        alternativeLabel>
          <Step>
            <StepLabel><Typography>{t('stepper.0.label')}</Typography></StepLabel>
          </Step>
          <Step>
            <StepLabel><Typography>{t('stepper.1.label')}</Typography></StepLabel>
          </Step>
        </Stepper>
      <Paper elevation={25} sx={{ position: 'relative', p:{ xs:2, md: 4} , mb: 2, 
      bgcolor: theme => theme.palette.success.light, }}>
        {activeStep >= 1 && <Typography variant="h3">{formData.firstName} {formData.lastName}</Typography>}
        <Typography variant={activeStep === 0 ? "h3" : "body1"}>{t('a_common:participant.id')}: {patientId}</Typography>
        <Typography>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
      {activeStep === 0 && (
        <Box component='form' id="activatePatient" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off" onSubmit={handleFormSubmit}>
          <StyledTextField
            fullWidth
            error={formData.firstName_error}
            required
            id="firstName"
            label={t('form.firstName')}
            margin="normal"
            variant="outlined"
            onChange={handleOnChange}
            value={formData.firstName}
            helperText={formData.firstName_error && t('form.error.firstName')}
          />
          <StyledTextField
            fullWidth
            error={formData.lastName_error}
            required
            id="lastName"
            label={t('form.lastName')}
            margin="normal"
            variant="outlined"
            onChange={handleOnChange}
            value={formData.lastName}
            helperText={formData.lastName_error && t('form.error.lastName')}
          />
          <StyledTextField
            fullWidth
            error={formData.email_error}
            required
            id="email"
            label={t('form.email')}
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
          {formData.updateUserError && <Status state="error" title={t('form.error.updateUser.title')} message={t('form.error.updateUser.message')} />}
        </Box>
      )}
      {activeStep === 1 && (
        <Box component='form' id="activatePatient" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off" onSubmit={handleFormSubmit}>
          {formData.file && formData.file.name && (
            <FileItem file={formData.file} onRemove={handleRemoveFile} />
          )}
          <input
            accept=".pdf"
            style={{ display: 'none' }}
            id="report-upload-file"
            type="file"
            onChange={handleFileChange}
          />
          {!formData.file && (
            <label htmlFor="report-upload-file">
              <Button sx={{ my: 2,textTransform: 'none',fontWeight: 600,
        fontFamily: '"Open Sans", sans-serif',}} variant="outlined" color="primary" component="span">{t('form.consentFile')}</Button>
            </label>
          )}
          {formData.noFileError && <Status state="error" title={t('form.error.noFile.title')} message={t('form.error.noFile.message')} />}
          {formData.uploadError && <Status state="error" title={t('form.error.uploadFile.title')} message={t('form.error.uploadFile.message')} />}
        </Box>
      )}
      {activeStep === 2 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
        <CircularProgress  size={70} />
        <Typography  variant="h6">{t('progress')}</Typography>
        </Box>
      )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" type="submit" 
        data-form="activatePatient" onClick={submitForm}>{submitText}</Button>
        <Button variant="text" color="primary" sx={{ my: 1,textTransform: 'none',fontWeight: 600,
        fontFamily: '"Open Sans", sans-serif',}}
 onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddParticipantInfoDialog