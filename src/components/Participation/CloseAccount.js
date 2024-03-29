import React, { useContext, useState } from 'react'
import { Box, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { LoginContext } from '../login/Login.context'
// import { AuthContext } from '../login/AuthContext'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { formatPhoneNumber } from '../../utils/utils'
import RenderContent from '../utils/RenderContent'
import Status from '../Status'

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
    marginBottom: theme.spacing(1)
  },
  btnSubmit: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    margin: theme.spacing(0, 1, 1, 0),
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}),{name: 'CloseAccount'})

const CloseAccount = (props) => {
  const {isMobile} = props
  const classes = useStyles()
  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const [loginContext] = useContext(LoginContext)
  // const { signoutRedirectCallback } = useContext(AuthContext)
  const [ closeError, setCloseError ] = useState(false)
  const { crc } = loginContext

  const handleSubmit = () => {
    const {uuid, token} = loginContext
    PubSub.publish('ANALYTICS', {
      events: 'event76',
      eventName: 'ChangeParticipationClose',
      prop42: `BioBank_ChangeParticipation|Close:CloseAccount`,
      eVar42: `BioBank_ChangeParticipation|Close:CloseAccount`,
    })
    getAPI.then(api => {
      api.closeAccount({uuid, token}).then(resp => {
        if(resp instanceof Error) {
          throw resp
        } else {
          // Save successful, also update the user context data
          // signoutRedirectCallback({
          //   accountClosed: true
          // })
          // clear user data
          // dispatch({
          //   type: 'reset'
          // })
          // redirect to signout, set localstorage variable for accountClosed
          // on HomePage, check for accountClosed flag
          localStorage.setItem("accountClosed", true)
          // log user out - redirect will reload the app and clear user data
          window.location.assign(process.env.REACT_APP_LOGOUT_LINK)
        }
      })
      .catch(error => {
        console.error(error)
        setCloseError(true)
      })
    })
  }

  return (
    <Box>
      <Typography className={classes.header} variant={isMobile ? "h2" : "h1"} component="h1">{t('close.pageTitle')}</Typography>
      <Typography paragraph={true} component="div"><RenderContent children={t('close.body')} /></Typography>
      <Paper className={classes.crc_card} elevation={25}>
        <Typography variant="h3">{t('close.crc_card_title')}</Typography>
        <Typography>{crc.firstName} {crc.lastName}</Typography>
        <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
        <Typography><a className="breakAll" href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
      </Paper>
      {closeError && <Status state="error" title={t('close.error.title')} message={t('close.error.message')} />}
      <div className={classes.formButtons}>
        <Button className={classes.btnSubmit} variant="contained" onClick={handleSubmit}>{t('close.submit')}</Button>
        <Button className={classes.btnCancel} variant="text" color="primary" onClick={props.cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </div>
    </Box>
  )
}

export default CloseAccount