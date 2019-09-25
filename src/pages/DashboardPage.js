import React, { useContext, useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/Login.context'
import PatientList from '../components/PatientList/PatientList'
import { api } from '../data/api'
import { getBool, formatPhoneNumber } from '../utils/utils'
import IconCard from '../components/IconCard/IconCard'


const useStyles = makeStyles(theme => ({
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

        // sort patient list alphabetically by last name
        if(userData.patients && userData.patients.length > 1){
          const sortedPatients = userData.patients.sort((a, b) => a.lastName.localeCompare(b.lastName))
          userData.patients = sortedPatients
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
      <Container className="mainContainer--dashboard">
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
                  desc={`You have ${count} new notification${count !== 1 ? 's' : ''}.`}
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
            <Box my={6}>
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
