import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import { Box, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'

import { LoginContext } from '../login/Login.context'
import { AuthContext } from '../login/AuthContext'
import { api } from '../../data/api'

const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  bulletList: {
    listStyleType: 'disc',
    marginLeft: 30,
    '& > li': {
      paddingLeft: 10,
      marginBottom: theme.spacing(2)
    }
  },
  crc_card: {
    maxWidth: 450,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(5)
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
  const [loginContext, dispatch] = useContext(LoginContext)
  const { signoutRedirectCallback } = useContext(AuthContext)

  const handleSubmit = () => {
    const {uuid, env, token} = loginContext
    api[env].closeAccount({uuid, token}).then(resp => {
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
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Close your online account</Typography>
      <Typography component="div">
        After you close your account,
        <ul className={classes.bulletList}>
          <li>You will not have online access to your consent form or biomarker reports. Please ask your doctor or clinical research coordinator to send you physical copies of these documents.</li>
          <li><strong>You are still participating in the Biobank.</strong> This option will only close your online Cancer Moonshot Biobank account. You will still be participating in the project.</li>
          <li>Your samples will still be used by researchers, and additional samples or medical information may be requested.You have the right to leave the Biobank if you wishand ask that your samples and medical information no longer be used.</li>
          <li>Your login.gov account will remain active. You can use this account to access other government services.</li>
          <li>NCI will keep any data stored in the Biobank website (such as your usage history, notifications, biomarker reports, and consent form). If you wish to permanently delete this data, please contact your clinical research coordinator.</li>
          <li>Once you close your account, you will have to contact your clinical research coordinator to re-open it.</li>
        </ul>
        <Paper className={classes.crc_card}>
          <Typography variant="h3">Your Clinical Research Coordinator</Typography>
          <Typography>Herse Hedman</Typography>
          <Typography>(999) 999 - 9999</Typography>
          <Typography><a href="mailto:Herse.hedman@ncorp.nci.gov">Herse.hedman@ncorp.nci.gov</a></Typography>
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