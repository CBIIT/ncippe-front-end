import React from 'react'
import PropTypes from 'prop-types'

import { FormControl, TextField, Paper, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginContext } from '../../components/login/SharedLogin/Login.context'
import PhoneNumbner from '../inputs/PhoneNumber/PhoneNumber'
import EmailOption from '../inputs/EmailOption/EmailOption'
import { getBool, formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '200px'
  },
}))

// add edit button to toggle editMode state
// pass editMode to phone and notification components
// save event handler to submit data back to the server
// cancel will revert values back to data values

const Profile = (props) => {
  const classes = useStyles()
  // const [editMode, setEditMode] = React.useState(false)
  // set the initial state of the email to prevent error while user data is being fetched
  const [userProfile, setUserProfile] = React.useState({
    email: ''
  })
  const login = React.useContext(LoginContext)

  // fetch profile data for the logged in user
  React.useEffect(() => {
    fetch(`/api/users?userGUID=${login.userId}`)
      .then(resp => resp.json())
      .then(data => {
        //format "phoneNumber" field
        //convert "allowEmailNotification" to boolean
        const userData = {
          ...data[0],
          allowEmailNotification: getBool(data[0].allowEmailNotification),
          phoneNumber: formatPhoneNumber(data[0].phoneNumber)
        }
        setUserProfile(userData)
      })
  }, [])

  return (
    <Paper className={classes.root}>
      <Button className={classes.edit}>Edit</Button>
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
      <PhoneNumbner value={userProfile.phoneNumber} editMode />
      <EmailOption value={userProfile.allowEmailNotification} editMode />
    </Paper>
  )
}

export default Profile