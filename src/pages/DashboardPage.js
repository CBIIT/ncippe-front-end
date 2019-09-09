import React, { useContext, useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import PatientList from '../components/PatientList/PatientList'
import { api } from '../data/api'
import { getBool, formatPhoneNumber } from '../utils/utils'
import IconCard from '../components/IconCard/IconCard'


const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/soft-diamond-background-short.svg)`,
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: '110px',

  },
  card: {
    position: 'relative',
    width: '100%',
    minWidth: 100,
    height: '100%',
    minHeight: 250,
    // maxWidth: 300,
  },
  cardContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(4,3,3,3)
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardIcon: {
    paddingRight: theme.spacing(3),
    maxWidth: '100px',
    width: '100%'
  },
  cardText: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  grid: {
    justifyContent: 'flex-start'
  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      [theme.breakpoints.up('md')]: {
        margin: 0
      }
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 600,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.primary.main
  },
  badge: {
    width: '100%',
    height: "100%",
    verticalAlign: 'top',
    position: 'static',

    '& .MuiBadge-badge': {
      right: theme.spacing(3),
      transform: 'none',
      borderRadius: '0 0 6px 6px',
      padding: theme.spacing(1,2),
      textTransform: 'uppercase',
      backgroundColor: theme.palette.gold.main,
      color: theme.palette.common.black,
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '12px',
      height: 'auto',
    }
  },
  patientList: {
    margin: theme.spacing(6,0)
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
    <Box>
      <Container className={classes.mainContainer}>
        <LoginConsumer>
        {([{firstName, lastName}]) => {
          return (
            <Box my={6} mx={0}>
              <Typography variant="h1" gutterBottom>Welcome, {firstName} {lastName}</Typography>
              <Typography variant="body2">Thank you for joining the Cancer Moonshot Biobank Program!</Typography>
            </Box>
          )
        }}
        </LoginConsumer>
        
        {/* Primary row */}
        <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
          {/* User Notifications */}
          <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <LoginConsumer>
            {([{newNotificationCount: count}]) => {
              return (
                <IconCard
                  icon="notifications.svg"
                  title="Notifications"
                  desc={`You have ${count} new notification${count !== 1 && 's'}`}
                  link="/dashboard/notifications"
                  linkText="Review"
                  count={count}
                />
              )
            }}
          </LoginConsumer>
          </Grid>
          {/* END: User Notifications */}

          <LoginConsumer>
          {([{roleName,newReport: count}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <>
                {/* Participant Consent Form */}
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="reports.svg"
                    title="Consent form"
                    desc="Review the form you signed when you agreed to participate in the Biobank program."
                    link="/dashboard/consent"
                    linkText="View forms"
                  />
                </Grid>
                {/* END: Participant Consent Form */}

                {/* Participant Biomarker Test Results */}
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="biomarker-tests.svg"
                    title="Biomarker tests"
                    desc="Your genomic information may help your oncologist treat your cancer."
                    link="/dashboard/tests"
                    linkText="View documents"
                    count={count}
                  />
                </Grid>
                {/* END: Participant Biomarker Test Results */}
              </>
            )
          }}
          </LoginConsumer>

          {/* User Profile */}
          <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
            <IconCard
              icon="user-profile.svg"
              title="Your Profile"
              desc="Keep your contact information up to date to receive program notifications."
              link="/dashboard/profile"
              linkText="Update profile"
            />
          </Grid>
          {/* END: User Profile */}
          
          {/* Get Help */}
          <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
            <IconCard
              icon="get-help.svg"
              title="Get help"
              desc="We are here to answer all your questions about the PPE Portal and Biobank program."
              link="/dashboard/help"
              linkText="Learn more"
            />
          </Grid>
          {/* END: Get Help */}
        </Grid>

      </Container>

      <Container>
        {/* Provider's Patient List */}
        <LoginConsumer>
        {([{roleName, patients}]) => {
          {/* Secondary row */}
          return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && patients && (
            <Box className={classes.patientList}>
              <PatientList patients={patients} />
            </Box>
            )
        }}
        </LoginConsumer>
        {/* End: Provider's Patient List */}
      </Container>
    </Box>
  )
}
