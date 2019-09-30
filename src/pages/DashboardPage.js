import React from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer } from '../components/login/Login.context'
import PatientList from '../components/PatientList/PatientList'
import IconCard from '../components/IconCard/IconCard'


const useStyles = makeStyles(theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItem: {
    width: '33.333333%',

    // '& $card': {
    //   [theme.breakpoints.up('md')]: {
    //     margin: 0
    //   }
    // }
  }
}));

export default () => {
  const classes = useStyles();

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

      <LoginConsumer>
      {([{roleName, patients}]) => {
        return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && patients && (
        <Container>
          {/* Provider's Patient List */}
            {/* Secondary row */}
              <Box my={6}>
                <PatientList patients={patients} />
              </Box>
          {/* End: Provider's Patient List */}
        </Container>
        )
      }}
      </LoginConsumer>
    </Box>
  )
}
