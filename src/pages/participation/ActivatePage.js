import React, { useContext } from 'react';
import { Box, Button, Container, Divider, Grid, Link, Stepper, Step, StepLabel, StepContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'

import { AuthContext } from '../../components/login/AuthContext'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
    }
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  },
  tintedBox: {
    backgroundColor: theme.palette.primary.lightGrey
  },
  centerText: {
    textAlign: 'center'
  },
  screenshot: {
    maxWidth: 300
  },
  createAccountBtn: {
    margin: theme.spacing(4,0),
    padding: theme.spacing(1,4)
  },
  haveAccountBtn: {
    padding: theme.spacing(1,4)
  },
  stepper: {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  cardContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(3,3,2,3)
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardIcon: {
    width: '50px',
    height: '50px',
  },
  cardText: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    paddingLeft: theme.spacing(3),
    height: '100%',
    justifyContent: 'space-between'
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      margin: theme.spacing(1,0)
    }
  }
}))

const ActivatePage = (props) => {
  const classes = useStyles()
  const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)

  const handleLogin = () => {
    // Using openID to redirect to login.gov
    signinRedirect()
  }

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">Activate your account</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="body2">After you enroll in the Biobank through your doctor or research coordinator, you’ll receive an email invitation to activate your account. </Typography>
              <Typography paragraph={true} variant="body2">Your online Biobank account will let you download biomarker test reports and signed consent forms, manage your Biobank participation, and hear directly from the Biobank.</Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/mother-and-son-view-tablet.jpg`} alt="Mother and son looking at tablet computer" />
            </Grid>
          </Grid>
          <Box className={classes.tintedBox} p={7}>
            <Grid container className={classes.grid} spacing={2} alignItems="stretch">
              <Grid className={classes.centerText} item xs={12} md={6}>
                <img className={classes.screenshot} src={`/${process.env.PUBLIC_URL}assets/images/login.gov.jpg`} alt="login.gov screenshot" width="300" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h2">To keep your information secure, the Biobank uses login.gov.</Typography>
                <Link href={`https://${process.env.REACT_APP_LOGIN_LINK}/sign_up/enter_email?request_id=${process.env.REACT_APP_REQUEST_ID}`}><Button className={classes.createAccountBtn} variant="contained" color="primary">I need to create a login.gov account</Button></Link>
                <Button className={classes.haveAccountBtn} variant="outlined" color="primary" onClick={handleLogin}>I already have a login.gov account</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box>
          <Typography variant="h2" component="h2">To create your login.gov account:</Typography>
          <Stepper className={classes.stepper} orientation="vertical" nonLinear>
            <Step active={true}>
              <StepLabel>Enter and confirm your email</StepLabel>
              <StepContent>This must be the same email address where you received the invitation to the Biobank.</StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>Create a strong password</StepLabel>
              <StepContent>This password must be 12 characters long and not be a commonly used password.</StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>Select a second method for security</StepLabel>
              <StepContent>Each method works differently. Choose from:
                <ul>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/phone.svg`} alt='card icon' aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">Phone</Typography>
                        <Typography>Receive a code via text message (SMS) or phone call.</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/authentification-application.svg`} alt='card icon' aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">Authentication application</Typography>
                        <Typography>Receive a secure code through an authentication application (such as Google Authenticator or Microsoft Authenticator).</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/security-key.svg`} alt='card icon' aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">Security key</Typography>
                        <Typography>Plug in a USB key to access your account.</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/backup-codes.svg`} alt='card icon' aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">Backup codes</Typography>
                        <Typography>We give you a set of 10 codes that you can use when you sign in. If you select this option, make sure to keep your codes in a safe place.</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                </ul>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>Select a backup method for security</StepLabel>
              <StepContent>You won’t use this to sign in each time, but it is important to set up in case you lose access to your second method.</StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>You will be signed into your Biobank portal!</StepLabel>
              <StepContent>The next time you sign in, you will enter your email and password and use the second method you chose for security.</StepContent>
            </Step>
          </Stepper>
          <Link href={`https://${process.env.REACT_APP_LOGIN_LINK}/sign_up/enter_email?request_id=${process.env.REACT_APP_REQUEST_ID}`}><Button className={classes.createAccountBtn} variant="contained" color="primary">Create a login.gov account</Button></Link>
        </Box>
        <Divider className={classes.divider} />
        <Box mb={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">More information about login.gov</Typography>
              <div className={classes.linkList}>
                <Link href="https://login.gov/help/" variant="button" rel="noopener noreferrer" target="_blank">login.gov help center <OpenInNewIcon /></Link>
                <Link href="https://login.gov/contact/" variant="button" rel="noopener noreferrer" target="_blank">Contact the login.gov team <OpenInNewIcon /></Link>
                <Link href="https://login.gov/help/creating-an-account/how-to-create-an-account/" variant="button" rel="noopener noreferrer" target="_blank">Review step-by-step instructions with screen shots <OpenInNewIcon /></Link>
              </div>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/login.gov-logo.jpg`} alt="login.gov logo" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default ActivatePage