import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Clear as ClearIcon, Save as SaveIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import getAPI from '../../data'
import { AddParticipantContext } from './AddParticipant.context'
import { LoginContext } from '../login/Login.context'
import WorkflowStepper from './WorkflowStepper'
import ParticipantInfo from './ParticipantInfo'
import AddConsent from './AddConsent'
import Progress from '../Progress'

const AddParticipantWorkflow = (props) => {
  const {open = false, setParentState, patient: {firstName, lastName, email, lang, patientId, dateCreated} = {} } = props
  const [addParticipantContext, dispatch] = useContext(AddParticipantContext)
  const [loginContext, loginDispatch] = useContext(LoginContext)
  const {token, uuid, patients} = loginContext
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [isOpen, setIsOpen] = useState(false)
  const [submitText, setSubmitText] = useState(t('form.saveActivate'))
  const navigate = useNavigate();

  // set activeStep when navigation value changes
  useEffect(() => {
    // console.log(addParticipantContext.navigate)
    if(addParticipantContext.navigate) {
      handleNavigate(addParticipantContext.navigate)
    }
  }, [addParticipantContext.navigate])

  useEffect(() => {
    setIsOpen(open)
    // pass any available patient data into context
    dispatch({
      type: "update",
      data: {
        patientId,
        firstName,
        lastName,
        email,
        lang,
      }
    })
  },[dispatch, open, patientId, firstName, lastName, email, lang])

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

    //reset the form after fade out
    setTimeout(() => {
      handleNavigate("reset")
    }, 200)
  }

  const updatePatientList = async (activate = false) => {
    const updatedPatients = patients.map(patient => {
      if (patient.patientId !== patientId) {
        return patient
      } 
      return activate ? {
        ...patient,
        portalAccountStatus: "ACCT_ACTIVE",
      } : {
        ...patient,
        firstName: addParticipantContext.firstName,
        lastName: addParticipantContext.lastName,
        email: addParticipantContext.email,
        lang: addParticipantContext.lang,
      };
    })
    .sort((a,b) => {
      const aNew = a.portalAccountStatus === 'ACCT_NEW';
      const bNew = b.portalAccountStatus === 'ACCT_NEW';
      if (aNew !== bNew) return aNew ? -1 : 1; // ACCT_NEW first
      return (a.lastName || '').localeCompare(b.lastName || '');
    })
    
    loginDispatch({
      type: 'accountActivated',
      patients: updatedPatients
    })
  } // end: updatePatientList
  
  // ★ CHANGED: refresh from server using existing API (no new endpoints)
  const refreshPatientsFromServer = async () => {
    const api = await getAPI;
    const freshUser = await api.fetchUser({ uuid, token });
    const freshPatients = Array.isArray(freshUser?.patients) ? freshUser.patients : [];
    loginDispatch({ type: 'accountActivated', patients: freshPatients });
  };

  const saveParticipantData = () => {
    // e.preventDefault()
    getAPI.then(async api => {
      return await api.updateParticipantDetails({
        uuid,
        patient: {
          patientId,
          firstName: addParticipantContext.firstName,
          lastName: addParticipantContext.lastName,
          email: addParticipantContext.email,
          lang: addParticipantContext.lang
        }
      }).then(resp => {
        if(resp == null || resp instanceof Error) {
          //TODO: perhaps another status message?
          throw resp
        } else {
          // save successful, move to the next step - upload consent form
          dispatch({
            type: "navigate",
            data: "addReport"
          })
          updatePatientList()
          return refreshPatientsFromServer()
        }
      })
      .catch(error => {
        if(error?.message?.includes('User.Email_UNIQUE') ){
          dispatch({
            type: "error",
            data: {
              existingEmail_error: true,
              updateUser_error: true,
              navigate: "participantId"
            }
          })
          return
        }
        dispatch({
          type: "error",
          data: {
            updateUser_error: true,
            navigate: "participantId"
          }
        })
      })
    })
  }

  const saveConsentForm = () => {
    // fake response delay
    // setTimeout(() => {
    // api[env].uploadPatientReport({
    getAPI.then(async api => {
      return await api.uploadPatientReport({
        patientId: addParticipantContext.patientId,
        uuid,
        reportFile: addParticipantContext.file,
        fileType: 'PPE_FILETYPE_ECONSENT_FORM'
      })
      .then(resp => {
        if(resp instanceof Error) {
          throw resp
        } else {
          // Save successful
          dispatch({
            type: 'navigate',
            data: 'finish'
          });
          PubSub.publish('ANALYTICS', {
            events: 'event80',
            eventName: 'NewParticipantComplete',
            prop42: `BioBank_NewParticipant|Completed`,
            eVar42: `BioBank_NewParticipant|Completed`,
          });
        }
      })
      .catch(error => {
        // Save unsuccessful - go back a step
        dispatch({
          type: 'error',
          data: {
            upload_error: true,
            navigate: 'addReport'
          }
        });
        PubSub.publish('ANALYTICS', {
          events: 'event81',
          eventName: 'UploadError',
          prop42: `BioBank_ConsentUpload|Error: Failed to upload to server`,
          eVar42: `BioBank_ConsentUpload|Error: Failed to upload to server`,
        });
      });
    });
  // }, 3000)
  };

  const activateParticipant = () => {
    getAPI.then(async api => {
      return await api.activateParticipant({
        uuid,
        token,
        patient: {
          patientId
        }
      })
    })
    .then(resp => {
      if(resp instanceof Error) {
        // Activation unsuccessful - display status error
        throw resp
      } else {
        // update patient data front-end state
        updatePatientList(true).then(() => refreshPatientsFromServer())
        .then(() => {
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
      dispatch({
        type: 'error',
        data: {
          activate_error: true,
          navigate: 'dashboard'
        }
      })
    })
  }

  const handleNavigate = (to) => {
    switch (to) {
      case 'dashboard':
        navigate('/account')
        break
      case 'reset':
        setActiveStep(0)
        setSubmitText(t('form.saveActivate'))
        dispatch({
          type: 'reset'
        })
        break
      case 'participantId':
        setActiveStep(0)
        setSubmitText(t('form.saveActivate'))
        break
      case 'addReport':
        setActiveStep(1)
        setSubmitText(t('form.submit'))
        break
      case 'submit':
        if(activeStep === 0) {
          setActiveStep(2)
          saveParticipantData()
        } else if (activeStep === 1) {
          setActiveStep(2)
          saveConsentForm()
        }
        break
      case 'finish': 
        activateParticipant()
        break
      default:
        console.error(`form navigation step '${to}' not found`)
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title"><Typography variant="h3" component="h3">{t('title')}</Typography></DialogTitle>
      <DialogContent>
        <Typography>{t('subtitle')}</Typography>
        <WorkflowStepper activeStep={activeStep} />
        <Paper elevation={25} sx={{ position: 'relative',p: 4,mb: 2,
          bgcolor: theme => theme.palette.success.light,
          [theme.breakpoints.down('sm')]: {p: 2,}, }}>
          {activeStep >= 1 && <Typography variant="h3">{addParticipantContext.firstName} {addParticipantContext.lastName}</Typography>}
          <Typography variant={activeStep === 0 ? "h3" : "body1"}>{t('a_common:participant.id')}: {patientId}</Typography>
          <Typography>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
        </Paper>
        {activeStep === 0 && (
          // participant ID
          (<ParticipantInfo />)
        )}
        {activeStep === 1 && (
          // select report to upload
          (<AddConsent />)
        )}
        {activeStep === 2 && (
          // upload progress. On success - redirected to Participant View
          (<Progress title={t('progress')} />)
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" id="Submit2" type="submit" form="activatePatient" >{submitText}</Button>
        <Button variant="text" color="primary" sx={{ my: 1,textTransform: 'none',fontWeight: 600,
        fontFamily: '"Open Sans", sans-serif',}} onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddParticipantWorkflow