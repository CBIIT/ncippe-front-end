import React, { useContext, useEffect, useState } from 'react'

import { FormControl, TextField, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';

import { LoginContext } from '../../components/login/SharedLogin/Login.context'
import PhoneNumbner from '../inputs/PhoneNumber/PhoneNumber'
import EmailOption from '../inputs/EmailOption/EmailOption'
import { getBool, formatPhoneNumber } from '../../utils/utils'
import { api } from '../../data/api'

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
    margin: theme.spacing(1),
    minWidth: '200px'
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  cta: {
    display: 'flex',
    flexDirection: 'row'
  }
}))

// add edit button to toggle editMode state
// pass editMode to phone and notification components
// save event handler to submit data back to the server
// cancel will revert values back to data values

const Profile = (props) => {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  // set the initial state of the email to prevent error while user data is being fetched
  const [userProfile, setUserProfile] = useState({
    email: '',
    phoneNumber: '',
    allowEmailNotification: true
  })
  const [userPhone, setUserPhone] = useState('')
  const [userOptIn, setUserOptIn] = useState(true)
  const loginContext = useContext(LoginContext)

  // fetch profile data for the logged in user
  useEffect(() => {
    const {userGUID, token, env} = loginContext
    // fetch call
    api[env].fetchUser({userGUID, token})
      .then(data => {
        const userData = {
          ...data,
          allowEmailNotification: getBool(data.allowEmailNotification), //convert "allowEmailNotification" to boolean
          phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
        }
        setUserProfile(userData)
        // create phone and email states in case user cancels form updates - revert values
        setUserPhone(userData.phoneNumber)
        setUserOptIn(userData.allowEmailNotification)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneNumber = event.target['phone-number-input'].value || ''
    // pattern must be a valid phone number or empty input mask pattern
    const phonePattern = /\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}|\(\s{3}\)\s{4}-\s{4}/

    const valid = phonePattern.test(phoneNumber)
    setErrorPhone(!valid)
    if(valid) {
      const data = {
        phoneNumber,
        allowEmailNotification: event.target['notifications-input'].checked ? "1" : "0"
      }
      const { token, env } = loginContext
      const userGUID = env === 'local' ? loginContext.id : loginContext.userGUID
      api[env].updateUser({userGUID, token, data})
        .then(res => {
          if(res === true) {
            toggleEditMode()
          } else {
            alert(res.message)
          }
        })
    }
  }

  const cancelEdit = (event) => {
    //restore user context
    setUserPhone(userProfile.phoneNumber)
    setUserOptIn(userProfile.allowEmailNotification)

    toggleEditMode()
  }

  const updatePhoneNumber = (number) => {
    setUserPhone(number)
  }
  
  const updateEmailOption = () => {
    setUserOptIn(!userOptIn)
  }


  const toggleEditMode = () => setEditMode(!editMode)

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
            <EditIcon/> Edit
          </Button>
        )}
        <Typography variant="h2" gutterBottom>
          {userProfile.firstName} {userProfile.lastName}
        </Typography>
        <Typography>
          Your contact information
        </Typography>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="Email"
            disabled
            value={userProfile.email}
            placeholder="email"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
        <PhoneNumbner value={userPhone} editMode={editMode} error={errorPhone} onChange={updatePhoneNumber} />
        <EmailOption value={userOptIn} editMode={editMode} onClick={updateEmailOption} />
        {editMode && (
          <FormControl className={`${classes.formControl} ${classes.cta}`} >
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="text" onClick={cancelEdit} color="primary">Cancel</Button>
          </FormControl>
        )}
      </form>
    </Paper>
  )
}

export default Profile