import React, { useContext } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useTracking } from 'react-tracking'

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
  profile: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
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
    position: 'absolute',
    top: 0,
    right: 0,
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
    margin: theme.spacing(4, 0)
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
  }
}))


const ProfilePage = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {firstName, lastName, dateCreated, isActiveBiobankParticipant, dateDeactivated, questionAnswers, crc, providers} = loginContext
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
      <Breadcrumbs pageName="Profile" link={props.location.state.forceNavigation} />
      <Container className="mainContainer">
        <div className={classes.profile}>
          <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt='card icon' aria-hidden="true" />
          <div className={classes.profileText}>
            <Typography className={classes.profileHeader} variant="h2" component="h2">{firstName} {lastName}</Typography>
            <Typography component="p" gutterBottom>Participant since {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
            {isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>Not Participating</Typography></div>}
          </div>
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
            <Button className={classes.menu} variant="outlined" color="primary" component={RouterLink} to="participation" onClick={trackParticipationClick}>Change Participation</Button>
            )
          }}
          </LoginConsumer>
        </div>
        {isActiveBiobankParticipant === false && <Status state="info" fullWidth title="You are no longer participating in the Biobank." message="If you'd like to rejoin the Biobank, talk to your research coordinator." />}
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
              <Paper className={classes.biobankInfo}>
                <Typography className={classes.header} variant="h3" component="h3" gutterBottom>Your Biobank contacts</Typography>

                {providers && <Typography className={classes.bold} gutterBottom>Doctor</Typography>}
                {providers && providers.map((provider, i) => (
                  <Box mb={2} key={i}>
                    <Typography>Dr. {provider.firstName} {provider.lastName}</Typography>
                    <Typography><a href={`tel:${provider.phoneNumber}`}>{formatPhoneNumber(provider.phoneNumber)}</a></Typography>
                    <Typography><a href={`mailto:${provider.email}`}>{provider.email}</a></Typography>
                  </Box>
                ))}
                <Divider className={classes.innerDivider} />
                <Typography className={classes.bold} gutterBottom>Research coordinator</Typography>
                <Typography>{crc.firstName} {crc.lastName}</Typography>
                <Typography><a href={`tel:${crc.phoneNumber}`}>{formatPhoneNumber(crc.phoneNumber)}</a></Typography>
                <Typography><a href={`mailto:${crc.email}`}>{crc.email}</a></Typography>
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