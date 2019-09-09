import React, { useContext, useEffect } from 'react'
import { Link } from '@reach/router'
import { Badge, Box, Container, Divider, Typography, Grid, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import PatientList from '../components/PatientList/PatientList'
import { api } from '../data/api'
import ConditionalWrapper from '../components/utils/ConditionalWrapper'
import { getBool, formatPhoneNumber } from '../utils/utils'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    display: "flex",
    alignItems: "flex-end",
    minHeight: 250,
    minWidth: 100,
    maxWidth: 300,
    width: "100%"
  },
  grid: {
    justifyContent: 'flex-start'
  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      height: '100%',
      margin: '0 auto',

      [theme.breakpoints.up('md')]: {
        margin: 0
      }
    }
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  Link: {
    display: 'flex',
    textDecoration: 'none',
    maxWidth: '300px'
  },
  badge: {
    width: '100%',

    '& .MuiBadge-badge': {
      top: '11px',
      right: '30px',
      borderRadius: '0 0 6px 6px',
      padding: '3px 10px',
      height: 'auto',
      textTransform: 'uppercase',
      backgroundColor: '#F6C674',
      color: '#000'
    }
  }
}));


export default () => {
  const classes = useStyles();
  const [loginContext, dispatch] = useContext(LoginContext)

  // fetch profile data for the logged in user
  useEffect(() => {
    const {userName, token, env, userGUID} = loginContext
    // fetch call
    api[env].fetchUser({userGUID, userName, token})
      .then(data => {
        const newReportCount = (data) => {
          //TODO: only for Participants
          if(data.reports){
            return data.reports.some(report => {
              if (!report.viewedBy) {
                return true
              } else {
                return !report.viewedBy.includes(userGUID)
              }
            })          
          } else {
            return null
          }
        }
        const userData = {
          ...data,
          allowEmailNotification: getBool(data.allowEmailNotification), //convert "allowEmailNotification" to boolean
          phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
          newNotificationCount: data.notificationList ? data.notificationList.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0,
          newReport: newReportCount(data)
        }
        
        //TODO: set context
        dispatch({
          type: 'update',
          userData
        })

      })
  }, []) // This effect never not re-runs


  return (
    <Box my={6} mx={0}>
      <Container>
        <LoginConsumer>
        {([{firstName, lastName, roleName}]) => {
          return (
            <Box my={6} mx={0}>
              <Typography variant='h3' component='h1' gutterBottom>Welcome, {firstName} {lastName}</Typography>
              <Typography>Thank you for joining the Cancer Moonshot Biobank Program!</Typography>
            </Box>
          )
        }}
        </LoginConsumer>
        

        {/* Primary row */}
        <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">

          {/* User Notifications */}
          <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
            <Link className={classes.Link} to="/dashboard/notifications">
              <LoginConsumer>
              {([{newNotificationCount: count}]) => {
                return (
                  <ConditionalWrapper
                    condition={count > 0}
                    wrapper={children => <Badge className={classes.badge} badgeContent="new" component="div">{children}</Badge>}
                  >
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h4" component="h2">Notifications</Typography>
                        <Typography>You have {count} new notification{count !== 1 && 's'}</Typography>
                      </CardContent>
                    </Card>
                  </ConditionalWrapper>
                )
              }}
              </LoginConsumer>
            </Link>
          </Grid>
          {/* END: User Notifications */}

          <LoginConsumer>
          {([{roleName}]) => {
            {/* Participant Consent Form */}
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <>
            <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
              <Link className={classes.Link} to="/dashboard/consent">
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h4" component="h2">Consent form</Typography>
                    <Typography>Review the form you signed when you agreed to participate in the Biobank program.</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            {/* END: Participant Consent Form */}

            {/* Participant Biomarker Test Results */}
            <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
              <Link className={classes.Link} to="/dashboard/test-results">
                <LoginConsumer>
                {([{newReport}]) => {
                  return (
                    <ConditionalWrapper
                      condition={newReport}
                      wrapper={children => <Badge className={classes.badge} badgeContent="new" component="div">{children}</Badge>}
                    >
                      <Card className={classes.card}>
                        <CardContent>
                          <Typography variant="h4" component="h2">Biomarker tests</Typography>
                          <Typography>Your genomic information may help your oncologist treat your cancer.</Typography>
                        </CardContent>
                      </Card>
                    </ConditionalWrapper>
                  )
                }}
                </LoginConsumer>
                
              </Link>
            </Grid>
            {/* END: Participant Biomarker Test Results */}
            </>
            )
          }}
          </LoginConsumer>

          {/* User Profile */}
          <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
            <Link className={classes.Link} to="/dashboard/profile">
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h4" component="h2">Your Profile</Typography>
                  <Typography>Keep your contact information up to date to receive program notifications.</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          {/* END: User Profile */}

          
          {/* Get Help */}
          <Grid className={classes.gridItem} item xs={12} sm={6} md={4}>
            <Link className={classes.Link} to="/dashboard/help">
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h4" component="h2">Get Help</Typography>
                  <Typography>We are here to answer all your questions about the PPE Portal and Biobank program.</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          {/* END: Get Help */}

        </Grid>

        {/* Provider's Patient List */}
        <LoginConsumer>
        {([{roleName, patients}]) => {
          {/* Secondary row */}
          return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && patients && (
            <>
              <Divider variant="middle" className={classes.divider} />
              <Box>
                <Typography variant="h4" component="h2">Your Patients</Typography>
                <PatientList patients={patients} />
              </Box>
            </>
            )
        }}
        </LoginConsumer>
        {/* End: Provider's Patient List */}

      </Container>
    </Box>
  )
}
