import React, { useContext } from 'react'
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom'
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs'
import { LoginContext } from '../../components/login/Login.context'
import Profile from '../../components/Profile/Profile'
import Status from '../../components/Status'
import DeactivatedQuestions from '../../components/DeactivatedQuestions'
import { formatPhoneNumber } from '../../utils/utils'


const ProfilePage = () => {
  const {patientId} = useParams()
  const location = useLocation()
  const [loginContext] = useContext(LoginContext)
  const { t } = useTranslation(['a_accountSettings','a_common'])
  
  let profileData = loginContext
  if(patientId) {
    profileData = loginContext.patients.find(patient => patient.patientId === patientId)
  }
  const {
    firstName, 
    lastName, 
    dateCreated, 
    isActiveBiobankParticipant = 1, 
    dateDeactivated = null, 
    questionAnswers, 
    crcsSet, 
    providers,
    roleName,
  } = profileData

  const userData = {
    firstName,
    lastName,
    dateDeactivated,
    questionAnswers
  }

  const trackParticipationClick = (e) => {
    PubSub.publish('ANALYTICS', {
      events: 'event73',
      prop42: `BioBank_ChangeParticipation|Start`,
      eVar42: `BioBank_ChangeParticipation|Start`,
    })
  }

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Profile" link={location.state?.forceNavigation} />
      <Container className="mainContainer">
          <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' },mb: 2, }} >
          <Box
            sx={{ display: 'flex',alignItems: 'flex-start',flexGrow: 1,
              mb: 2,'& a': { textDecoration: 'none' },}}>
            <Box
              component="img"  sx={{ mr: 3, width: '60px' }} 
              src={`${process.env.PUBLIC_URL}/assets/icons/user-profile.svg`} 
              alt={t('a_common:icons.user_profile')} aria-hidden="true" />
            <Box sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}  >
              <Typography sx={{ mt: 1 }} variant="h2" component="h2">{firstName} {lastName}</Typography>
              <Typography component="p" gutterBottom>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
              {!isActiveBiobankParticipant && <Box>
                <Typography sx={{
                      display: 'inline-block',
                      borderRadius: 1.5,
                      backgroundColor: theme => theme.palette.error.main,
                      color: theme => theme.palette.common.white,
                      px: 2,
                      py: 0.5,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontFamily: theme => theme.typography.button.fontFamily,
                      lineHeight: 'normal',
                    }}>{t('a_common:not_participating.badge')}</Typography></Box>}
            </Box>
          </Box>
          {roleName === "ROLE_PPE_PARTICIPANT" && (
            <div><Button sx={{ backgroundColor: theme => theme.palette.common.white }} variant="outlined" color="primary" 
            component={RouterLink} to="participation" onClick={trackParticipationClick}>
              {t('a_common:buttons.change_participation')}</Button></div>
          )}
        </Box>
        {!isActiveBiobankParticipant && 
        <Status state="info" fullWidth 
        title={t('a_common:not_participating.status.title')} 
        message={t('a_common:not_participating.status.message')} />}
        <Divider sx={{ my:3}} />
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Profile patientId={patientId} />
            { !isActiveBiobankParticipant  && questionAnswers && (
              <DeactivatedQuestions user={userData} />
            )}
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            {roleName === "ROLE_PPE_PARTICIPANT" && (
              <Paper  sx={{
                  p: 3,
                  '& a': {
                    textDecoration: 'none',
                    color: theme => theme.palette.text.primary,
                  },
                }} elevation={25}>
                <Typography sx={{ mb: 2}} variant="h3" component="h3" gutterBottom>
                  {t('contacts.title')}</Typography>

                {providers?.length > 0  && ( <>
                <Typography fontWeight="bold" gutterBottom>{t('contacts.doctor')}
                </Typography>
               
                {providers && providers.map((provider, i) => (
                  <Box mb={2} key={i}>
                    <Typography>Dr. {provider.firstName} {provider.lastName}</Typography>
                    <Typography><a href={`tel:${provider.phoneNumber}`}>{formatPhoneNumber(provider.phoneNumber)}</a></Typography>
                    <Typography><a className="email" href={`mailto:${provider.email}`}>{provider.email}</a></Typography>
                  </Box>
                ))}
                <Divider sx={{ my:3, backgroundColor: '#ccc'}} />
                </>)}
                <Typography fontWeight="bold" gutterBottom>{t('contacts.crc')}</Typography>
                {crcsSet && crcsSet.map((crc, i) => (
                  <Box mb={2} key={i}>
                    <Typography>{crc.firstName} {crc.lastName}</Typography>
                    <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
                    <Typography><a className="email" href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
                  </Box>
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProfilePage