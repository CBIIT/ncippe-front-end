import React, { useContext, useState } from 'react'

import { Box, Divider, FormControl, Input, InputLabel, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { LoginContext } from '../../components/login/Login.context'
import PhoneNumbner from '../inputs/PhoneNumber/PhoneNumber'
import EmailOption from '../inputs/EmailOption/EmailOption'
import LangOption from '../inputs/LangOption/LangOption'
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

const Profile = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [editMode, setEditMode] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [userPhone, setUserPhone] = useState(loginContext.phoneNumber)
  const [userOptIn, setUserOptIn] = useState(loginContext.allowEmailNotification)
  const [userLang, setUserLang] = useState(loginContext.lang || 'en')
  const { t, i18n } = useTranslation(['a_accountSettings','a_common'])

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneNumber = event.target['phone-number-input'].value || ''
    const allowEmailNotification = event.target['notifications-input'].checked ? true : false
    // pattern must be a valid phone number or empty input mask pattern
    const phonePattern = /\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}|\(\s{3}\)\s{4}-\s{4}/

    const valid = phonePattern.test(phoneNumber)
    setErrorPhone(!valid)
    if(valid) {
      const cleanPhoneNumber = phoneNumber.replace(/\D*/g,"") // remove formatting and just send numbers
      const data = {
        phoneNumber: cleanPhoneNumber,
        allowEmailNotification,
        lang: userLang
      }
      const { token, uuid } = loginContext

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
            // Save successful, also update the user context data
            dispatch({
              type: 'update',
              userData: {
                phoneNumber,
                allowEmailNotification,
                lang: userLang
              }
            })
            i18n.changeLanguage(userLang)
            toggleEditMode()
          }
        })
      })
    }
  }

  const cancelEdit = () => {
    //restore user context
    setUserPhone(loginContext.phoneNumber)
    setErrorPhone(false)
    setUserOptIn(loginContext.allowEmailNotification)
    setUserLang(loginContext.lang || 'en')

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
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel 
            htmlFor="email-input" 
            shrink
            className={classes.label}
          >
            {t('profile.email')}
          </InputLabel>
          <Input
            id="email-input"
            placeholder={t('profile.email')}
            value={loginContext.email}
            readOnly={true}
            disabled
          />
        </FormControl>
        <PhoneNumbner value={userPhone} editMode={editMode} error={errorPhone} onChange={updatePhoneNumber} />
        <Divider />
        <EmailOption value={userOptIn} editMode={editMode} onClick={updateEmailOption} />
        <Divider />
        {loginContext.roleName === "ROLE_PPE_PARTICIPANT" && <LangOption label={t('profile.lang.title')} value={userLang} editMode={editMode} onChange={updateLang} />}
        {loginContext.roleName === "ROLE_PPE_PARTICIPANT" && <Divider />}

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