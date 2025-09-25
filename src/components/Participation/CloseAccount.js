import React, { useContext, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Box, Button, Paper, Typography } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { LoginContext } from '../login/Login.context'
// import { AuthContext } from '../login/AuthContext'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { formatPhoneNumber } from '../../utils/utils'
import RenderContent from '../utils/RenderContent'
import Status from '../Status'

const CloseAccount = () => {
  const { cancel, isMobile } = useOutletContext();
  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const [loginContext] = useContext(LoginContext)
  // const { signoutRedirectCallback } = useContext(AuthContext)
  const [ closeError, setCloseError ] = useState(false)
  const { crcsSet, uuid, token  } = loginContext

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
      <Typography sx={{ mb: 2 }} variant={isMobile ? "h2" : "h1"} 
      component="h1">{t('close.pageTitle')}</Typography>
      <Typography paragraph={true} component="div">
        <RenderContent children={t('close.body')} /></Typography>
      <Paper sx={{ maxWidth: 450, p: 2, mb: 5,
          '& a': {
            textDecoration: 'none',
            color: 'text.primary',
          },
        }} elevation={25}>
        <Typography variant="h3">{t('close.crc_card_title')}</Typography>
        {crcsSet && crcsSet.map((crc, i) => (
          <Box mb={2} key={i}>
            <Typography>{crc.firstName} {crc.lastName}</Typography>
            <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
            <Typography><a className="breakAll" href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
          </Box>
        ))}
      </Paper>
      {closeError && <Status state="error" title={t('close.error.title')} message={t('close.error.message')} />}
      <Box sx={{ mt: 2 }} >
        <Button sx={{
            backgroundColor: 'error.main',
            color: 'common.white',
            mr: 1,
            mb: 1,
            '&:hover': {
              backgroundColor: 'error.dark',
            },
          }} variant="contained" onClick={handleSubmit}>{t('close.submit')}</Button>
        <Button sx={{ mb: 1 }} variant="text" color="primary" onClick={cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </Box>
    </Box>
  )
}

export default CloseAccount