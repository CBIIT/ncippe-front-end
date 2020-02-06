import React, { useContext } from 'react'
import { Box, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

import { LoginContext } from '../login/Login.context'
import { AuthContext } from '../login/AuthContext'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { formatPhoneNumber } from '../../utils/utils'
import RenderContent from '../utils/RenderContent'

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
  const { t } = useTranslation(['a_changeParticipation','a_common'])
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
      <Typography className={classes.header} variant="h1" component="h1">{t('close.pageTitle')}</Typography>
      <Typography paragraph={true}><RenderContent source={t('close.body')} /></Typography>
      <Paper className={classes.crc_card}>
        <Typography variant="h3">{t('close.crc_card_title')}</Typography>
        <Typography>{crc.firstName} {crc.lastName}</Typography>
        <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
        <Typography><a href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
      </Paper>
      <div className={classes.formButtons}>
        <Button className={classes.confirm} variant="contained" onClick={handleSubmit}>{t('close.submit')}</Button>
        <Button className={classes.btnCancel} variant="text" onClick={props.cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </div>
    </Box>
  )
}

export default CloseAccount