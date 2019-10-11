import React, { useContext } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Badge, Box, Button, Container, Divider, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { LoginContext, LoginConsumer } from '../components/login/Login.context'
import Profile from '../components/Profile/Profile'
import Status from '../components/Status/Status'
import DeactivatedQuestions from '../components/DeactivatedQuestions/DeactivatedQuestions'


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


const TestResults = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {firstName, lastName, dateCreated, isActiveBiobankParticipant, dateDeactivated, questionsAnswers} = loginContext

  const userData = {
    firstName,
    lastName,
    dateDeactivated,
    questionsAnswers
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
            {isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>Withdrawn</Typography></div>}
          </div>
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <Button className={classes.menu} variant="outlined" color="primary" component={RouterLink} to="participation">Change Participation</Button>
            )
          }}
          </LoginConsumer>
        </div>
        {isActiveBiobankParticipant === false && <Status state="info" fullWidth title="Your participation has been withdrawn." message="You or a research coordinator has withdrawn your participation in the program. Speak to your doctor if you would like to continue to participate." />}
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Profile />
            {isActiveBiobankParticipant === false && questionsAnswers && (
              <DeactivatedQuestions user={userData} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <Paper className={classes.biobankInfo}>
                <Typography className={classes.header} variant="h3" component="h3" gutterBottom>Biobank contacts</Typography>
                <Typography className={classes.bold} gutterBottom>Doctor</Typography>
                <Typography>Dr. Alfonso Pinto</Typography>
                <Typography><a href="tel:202-222-2222">(202) 222-2222</a></Typography>
                <Typography><a href="mailto:dr.alfonso.pinto@gmail.com">dr.alfonso.pinto@gmail.com</a></Typography>
                <Divider className={classes.innerDivider} />
                <Typography className={classes.bold} gutterBottom>Clinical research coordinator</Typography>
                <Typography>Herse Hedman</Typography>
                <Typography><a href="tel:909-999-6789">(909) 999-6789</a></Typography>
                <Typography><a href="mailto:herse.heldman@ncorp.nci.gov">herse.heldman@ncorp.nci.gov</a></Typography>
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

export default TestResults