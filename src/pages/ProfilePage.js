import React, { useContext } from 'react'
import { Box, Container, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { LoginContext } from '../components/login/SharedLogin/Login.context'
import Profile from '../components/Profile/Profile'
import { formatPhoneNumber } from '../utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContainer: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/soft-diamond-background-short.svg)`,
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: '110px',
    padding: theme.spacing(5),
    flexGrow: 1,
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    height: '100%',
    width: '100%',
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
  divider: {
    margin: theme.spacing(4, 0)
  },
  biobankInfo: {
    padding: theme.spacing(3,2)
  }
}))

const TestResults = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {firstName, lastName, email, phoneNumber} = loginContext

  return (
    <Box className={classes.root}>
      <Breadcrumbs pageName="Consent Page" />
      <Container className={classes.mainContainer}>
        <div className={classes.profile}>
          <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt='card icon' aria-hidden="true" />
          <div className={classes.profileText}>
            <Typography className={classes.profileHeader} variant="h2" component="h2">{firstName} {lastName}</Typography>
            <Typography component="p"><a href={`mailto:${email}`}>{email}</a></Typography>
            <Typography component="p">{formatPhoneNumber(phoneNumber)}</Typography>
          </div>
        </div>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Profile />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.biobankInfo}>
              <Typography className={classes.header} variant="h3" component="h3" gutterBottom>Your biobank participation</Typography>
              <Typography>Doctor</Typography>
              <Typography>Dr. Alfonso Pinto</Typography>
              <Typography><a href="tel:202-222-2222">(202) 222-2222</a></Typography>
              <Typography><a href="mailto:dr.alfonso.pinto@gmail.com">dr.alfonso.pinto@gmail.com</a></Typography>
              <Divider/>
              <Typography>Clinical research coordinator</Typography>
              <Typography>Herse Hedman</Typography>
              <Typography><a href="tel:909-999-6789">(909) 999-6789</a></Typography>
              <Typography><a href="mailto:herse.heldman@ncorp.nci.gov">herse.heldman@ncorp.nci.gov</a></Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default TestResults