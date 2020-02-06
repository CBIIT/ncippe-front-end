import React, { useContext, useState } from 'react'

import { FormControl, Input, InputLabel, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

import { LoginContext } from '../../components/login/Login.context'
import PhoneNumbner from '../inputs/PhoneNumber/PhoneNumber'
import EmailOption from '../inputs/EmailOption/EmailOption'
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
  formControl: {
    minWidth: '200px',
    '& .MuiInput-formControl': {
      marginTop: 20
    }
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  cta: {
    display: 'flex',
    flexDirection: 'row'
  },
  label: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none"
  },
  btnCancel: {
    marginLeft: theme.spacing(1)
  }
}))

// add edit button to toggle editMode state
// pass editMode to phone and notification components
// save event handler to submit data back to the server
// cancel will revert values back to data values

const Profile = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [editMode, setEditMode] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [userPhone, setUserPhone] = useState(loginContext.phoneNumber)
  const [userOptIn, setUserOptIn] = useState(loginContext.allowEmailNotification)
  const { t } = useTranslation(['a_accountSettings','a_common'])
  const { trackEvent } = useTracking()


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
        allowEmailNotification
      }
      const { token, uuid } = loginContext

      getAPI.then(api => {
        api.updateUser({uuid, token, data}).then(resp => {
          if(resp instanceof Error) {
            console.error(resp.message)
          } else {
            trackEvent({
              prop42: `BioBank_ProfileSettings|Save`,
              eVar42: `BioBank_ProfileSettings|Save`,
              events: 'event78'
            })
            // Save successful, also update the user context data
            dispatch({
              type: 'update',
              userData: {
                phoneNumber,
                allowEmailNotification
              }
            })
            toggleEditMode()
          }
        })
      })
    }
  }

  const cancelEdit = () => {
    //restore user context
    setUserPhone(loginContext.phoneNumber)
    setUserOptIn(loginContext.allowEmailNotification)

    toggleEditMode()
  }

  const updatePhoneNumber = (number) => {
    setUserPhone(number)
  }
  
  const updateEmailOption = () => {
    setUserOptIn(!userOptIn)
  }

  const toggleEditMode = () => {
    if(!editMode){
      trackEvent({
        prop42: `BioBank_ProfileSettings|Edit`,
        eVar42: `BioBank_ProfileSettings|Edit`,
        events: 'event73'
      })
    }
    setEditMode(!editMode)
  }

  return (
    <Paper className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        {/* todo: pencil icon and text button */}
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
        <Typography variant="h3" component="h3" gutterBottom>
        {t('profile.title')}
        </Typography>
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
        <EmailOption value={userOptIn} editMode={editMode} onClick={updateEmailOption} />
        {editMode && (
          <FormControl className={`${classes.formControl} ${classes.cta}`} >
            <Button type="submit" variant="contained" color="primary">{t('a_common:buttons.save')}</Button>
            <Button className={classes.btnCancel} variant="text" onClick={cancelEdit} color="primary">{t('a_common:buttons.cancel')}</Button>
          </FormControl>
        )}
      </form>
    </Paper>
  )
}

export default Profile