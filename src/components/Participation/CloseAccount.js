import React, { useContext } from 'react'
import { Box, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTracking } from 'react-tracking'

import { LoginContext } from '../login/Login.context'
import { AuthContext } from '../login/AuthContext'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  crc_card: {
    maxWidth: 450,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(5),
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  },
  formControl: {
    margin: theme.spacing(2, 0, 5),
  },
  btnCancel: {
    marginLeft: theme.spacing(1)
  },
  confirm: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const CloseAccount = (props) => {
  const classes = useStyles()
  const { trackEvent } = useTracking()
  const [loginContext, dispatch] = useContext(LoginContext)
  const { signoutRedirectCallback } = useContext(AuthContext)
  const { crc } = loginContext

  const handleSubmit = () => {
    const {uuid, token} = loginContext
    trackEvent({
      prop42: `BioBank_ChangeParticipation|Close:CloseAccount`,
      eVar42: `BioBank_ChangeParticipation|Close:CloseAccount`,
      events: 'event78'
    })
    getAPI.then(api => {
      api.closeAccount({uuid, token}).then(resp => {
        if(resp) {
          // Save successful, also update the user context data
          signoutRedirectCallback({
            accountClosed: true
          })
          dispatch({
            type: 'reset'
          })
        } else {
          alert(resp.message)
        }
      })
    })
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Close your online account</Typography>
      <Typography paragraph={true}>You may choose to close your online Biobank account at any time. You can close your online account, but still participate in the Biobank. </Typography>
      <Typography component="div">
        After you close your online account:
        <ul className="bulletList bulletList--spreadOut">
          <li>You won't be able to access your consent form or biomarker reports. Please ask your research coordinator if you want copies of the form or the report. </li>
          <li>Your login.gov account will remain active. You can use this account to access other government services.</li>
          <li>NCI will keep any data stored in the Biobank website (such as your usage history, notifications, biomarker reports, and consent form). If you wish to permanently delete this data, please contact your research coordinator.</li>
        </ul>
        <Typography>Once you close your account, you will have to contact your clinical research coordinator to re-open it.</Typography>
        <Paper className={classes.crc_card}>
          <Typography variant="h3">Your Research Coordinator</Typography>
          <Typography>{crc.firstName} {crc.lastName}</Typography>
          <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
          <Typography><a href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
        </Paper>
      </Typography>
      <div className={classes.formButtons}>
        <Button className={classes.confirm} variant="contained" onClick={handleSubmit}>Close online account</Button>
        <Button className={classes.btnCancel} variant="text" onClick={props.cancel}><ClearIcon />Cancel</Button>
      </div>
    </Box>
  )
}

export default CloseAccount