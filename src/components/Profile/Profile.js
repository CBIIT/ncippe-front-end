import React, { useContext, useState } from 'react'
import { Box, Divider, FormControl, Input, InputLabel, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { LoginContext } from '../../components/login/Login.context'
import Email from '../inputs/Email'
import PhoneNumber from '../inputs/PhoneNumber'
import EmailOption from '../inputs/EmailOption'
import LangOption from '../inputs/LangOption'
// import { api } from '../../data/api'
import getAPI from '../../data'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  boxTitle: {
    display: 'flex',
    "& :first-child": {
      flex: 1
    }
  },
  formControl: {
    minWidth: '200px',
    
    '& .MuiInput-formControl': {
      marginTop: 20
    }
  },
  cta: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(3)
  },
  label: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none"
  },
  btnSubmit: {
    marginRight: theme.spacing(1)
  }
}),{name: 'Profile'})

const Profile = (props) => {
  // if there's a patientId then this profile is being edited by an admin, otherwise it's being edited by the user
  const {patientId} = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [editMode, setEditMode] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  
  const { t, i18n } = useTranslation(['a_accountSettings','a_common'])

  let profileData = loginContext

  if(patientId) {
    profileData = loginContext.patients.find(patient => patient.patientId === patientId)
  }
  
  const [userPhone, setUserPhone] = useState(profileData.phoneNumber)
  const [userOptIn, setUserOptIn] = useState(profileData.allowEmailNotification)
  const [userLang, setUserLang] = useState(profileData.lang || 'en')

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneNumber = event.target['phone-number-input'].value || ''
    const allowEmailNotification = event.target['notifications-input'].checked ? true : false
    // pattern must be a valid phone number or empty input mask pattern
    const phonePattern = /\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}|\(\s{3}\)\s{4}-\s{4}/
  

    let isValid = phonePattern.test(phoneNumber)
    setErrorPhone(!isValid)

    if(isValid) {
      const cleanPhoneNumber = phoneNumber.replace(/\D*/g,"") // remove formatting and just send numbers
      const data = {
        phoneNumber: cleanPhoneNumber,
        allowEmailNotification,
        lang: userLang
      }

      const { uuid } = profileData
      const { token } = loginContext

      // Redundant - cannot get to participant profile if UUID does not exist
      if (!uuid) {
        throw new Error('The profile you are attempting to update does not have a valid UUID.')
      }

      getAPI.then(api => {
        api.updateUser({uuid, token, data}).then(resp => {
          if(resp instanceof Error) {
            console.error(resp.message)
          } else {
            PubSub.publish('ANALYTICS', {
              events: 'event78',
              eventName: 'ProfileSettingsSave', 
              prop42: `BioBank_ProfileSettings|Save`,
              eVar42: `BioBank_ProfileSettings|Save`,
            })
            // Save successful
            // update either the admin's patient list or the user data
            if(patientId) {
              dispatch({
                type: 'addPatientData',
                patients: loginContext.patients.map(patient => {
                  if(patient.patientId === patientId){
                    patient.phoneNumber = phoneNumber
                    patient.allowEmailNotification = allowEmailNotification
                    patient.lang = userLang
                  }
                  return patient
                })
              })
            } else {
              dispatch({
                type: 'update',
                userData: {
                  phoneNumber,
                  allowEmailNotification,
                  lang: userLang
                }
              })
              i18n.changeLanguage(userLang)
            }
            toggleEditMode()
          }
        })
      })
    }
  }

  const cancelEdit = () => {
    //restore user context
    setUserPhone(profileData.phoneNumber)
    setErrorPhone(false)
    setUserOptIn(profileData.allowEmailNotification)
    setUserLang(profileData.lang || 'en')

    toggleEditMode()
  }

  const updatePhoneNumber = (number) => {
    setUserPhone(number)
  }
  
  const updateEmailOption = () => {
    setUserOptIn(!userOptIn)
  }

  const updateLang = (lang) => {
    setUserLang(lang)
  }

  const toggleEditMode = () => {
    if(!editMode){
      PubSub.publish('ANALYTICS', {
        events: 'event73',
        eventName: 'ProfileSettingsEdit',
        prop42: `BioBank_ProfileSettings|Edit`,
        eVar42: `BioBank_ProfileSettings|Edit`,
      })
    }
    setEditMode(!editMode)
  }

  return (
    <Paper className={classes.root} elevation={25}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box className={classes.boxTitle}>
          <Typography variant="h3" component="h3" gutterBottom>{t('profile.title')}</Typography>
          {!editMode && (
            <Button 
              className={classes.editButton} 
              variant="text" 
              color="primary"
              onClick={toggleEditMode}
            >
              <EditIcon/> {t('a_common:buttons.edit')}
            </Button>
          )}
        </Box>
        <Email value={profileData.email} />
        <Divider />
        <PhoneNumber value={userPhone} editMode={editMode} error={errorPhone} onChange={updatePhoneNumber} />
        <Divider />
        <EmailOption value={userOptIn} editMode={editMode} onClick={updateEmailOption} />
        <Divider />
        {profileData.roleName === "ROLE_PPE_PARTICIPANT" && <LangOption label={t('profile.lang.title')} value={userLang} editMode={editMode} onChange={updateLang} />}
        {profileData.roleName === "ROLE_PPE_PARTICIPANT" && <Divider />}

        {editMode && (
          <FormControl className={`${classes.formControl} ${classes.cta}`} >
            <Button className={classes.btnSubmit} type="submit" variant="contained" color="primary">{t('a_common:buttons.save')}</Button>
            <Button variant="text" onClick={cancelEdit} color="primary"><ClearIcon />{t('a_common:buttons.cancel')}</Button>
          </FormControl>
        )}
      </form>

    </Paper>
  )
}

export default Profile