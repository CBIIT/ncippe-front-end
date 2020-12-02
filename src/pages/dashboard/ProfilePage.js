import React, { useContext } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { LoginContext, LoginConsumer } from '../../components/login/Login.context'
import Profile from '../../components/Profile/Profile'
import Status from '../../components/Status/Status'
import DeactivatedQuestions from '../../components/DeactivatedQuestions/DeactivatedQuestions'
import { formatPhoneNumber } from '../../utils/utils'


const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  profileTop: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row"
    }
  },
  profile: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    '& a': {
      textDecoration: 'none'
    },
  },
  profileHeader: {
    marginTop: theme.spacing(1)
  },
  profileIcon: {
    marginRight: theme.spacing(3),
    width: '60px',
  },
  profileText: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  menu: {
    backgroundColor: theme.palette.common.white
  },
  badge: {
    display: 'inline-block',
    borderRadius: 6,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    padding: '4px 16px',
    lineHeight: 'normal',
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  divider: {
    margin: theme.spacing(2, 0, 4)
  },
  innerDivider: {
    margin: theme.spacing(3, 0),
    backgroundColor: '#ccc'
  },
  biobankInfo: {
    padding: theme.spacing(3,2),
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold
  },
}),{name: 'ProfilePage'})


const ProfilePage = (props) => {
  const classes = useStyles()
  const [loginContext] = useContext(LoginContext)
  const {firstName, lastName, dateCreated, isActiveBiobankParticipant, dateDeactivated, questionAnswers, crc, providers} = loginContext
  const { t } = useTranslation(['a_accountSettings','a_common'])
  const { trackEvent } = useTracking()

  const userData = {
    firstName,
    lastName,
    dateDeactivated,
    questionAnswers
  }

  const trackParticipationClick = (e) => {
    trackEvent({
      prop42: `BioBank_ChangeParticipation|Start`,
      eVar42: `BioBank_ChangeParticipation|Start`,
      events: 'event73'
    })
  }

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Profile" link={props.location.state.forceNavigation} />
      <Container className="mainContainer">
        <div className={classes.profileTop}>
          <div className={classes.profile}>
            <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt={t('a_common:icons.user_profile')} aria-hidden="true" />
            <div className={classes.profileText}>
              <Typography className={classes.profileHeader} variant="h2" component="h2">{firstName} {lastName}</Typography>
              <Typography component="p" gutterBottom>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
              {isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>{t('a_common:not_participating.badge')}</Typography></div>}
            </div>
          </div>
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <div><Button className={classes.menu} variant="outlined" color="primary" component={RouterLink} to="participation" onClick={trackParticipationClick}>{t('a_common:buttons.change_participation')}</Button></div>
            )
          }}
          </LoginConsumer>
        </div>
        {isActiveBiobankParticipant === false && <Status state="info" fullWidth title={t('a_common:not_participating.status.title')} message={t('a_common:not_participating.status.message')} />}
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Profile />
            {isActiveBiobankParticipant === false && questionAnswers && (
              <DeactivatedQuestions user={userData} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <Paper className={classes.biobankInfo} elevation={25}>
                <Typography className={classes.header} variant="h3" component="h3" gutterBottom>{t('contacts.title')}</Typography>

                {providers && <Typography className={classes.bold} gutterBottom>{t('contacts.doctor')}</Typography>}
                {providers && providers.map((provider, i) => (
                  <Box mb={2} key={i}>
                    <Typography>Dr. {provider.firstName} {provider.lastName}</Typography>
                    <Typography><a href={`tel:${provider.phoneNumber}`}>{formatPhoneNumber(provider.phoneNumber)}</a></Typography>
                    <Typography><a className="email" href={`mailto:${provider.email}`}>{provider.email}</a></Typography>
                  </Box>
                ))}
                <Divider className={classes.innerDivider} />
                <Typography className={classes.bold} gutterBottom>{t('contacts.crc')}</Typography>
                <Typography>{crc.firstName} {crc.lastName}</Typography>
                <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
                <Typography><a className="email" href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
              </Paper>
            )
          }}
          </LoginConsumer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProfilePage