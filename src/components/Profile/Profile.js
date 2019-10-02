import React, { useContext, useState } from 'react'

import { FormControl, TextField, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';

import { LoginContext } from '../../components/login/Login.context'
import PhoneNumbner from '../inputs/PhoneNumber/PhoneNumber'
import EmailOption from '../inputs/EmailOption/EmailOption'
import { getBool } from '../../utils/utils'
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
  const [loginContext, dispatch] = useContext(LoginContext)
  const [editMode, setEditMode] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [userPhone, setUserPhone] = useState(loginContext.phoneNumber)
  const [userOptIn, setUserOptIn] = useState(loginContext.allowEmailNotification)


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
      const { token, env, uuid } = loginContext
      const userId = env === 'local' ? loginContext.id : loginContext.uuid
      api[env].updateUser({uuid: userId, token, data})
        .then(resp => {
          if(resp === true) {
            // Save successful, also update the user context data
            dispatch({
              type: 'update',
              userData: {
                phoneNumber,
                allowEmailNotification
              }
            })
            toggleEditMode()
          } else {
            alert(resp.message)
          }
        })
    }
  }

  const cancelEdit = (event) => {
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
        <Typography variant="h3" component="h3" gutterBottom>
        Your contact information
        </Typography>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="Email"
            disabled
            value={loginContext.email}
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