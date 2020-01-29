import React, { useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'

import { LoginConsumer } from '../../components/login/Login.context'
import PatientList from '../../components/PatientList/PatientList'
import IconCard from '../../components/IconCard/IconCard'
import Status from '../../components/Status/Status'


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
}));

export default () => {
  const classes = useStyles()
  const { trackEvent } = useTracking()

  useEffect(() => {
    // only want to track the dashboard landing page load event once, saving state to session variable
    const tracked = sessionStorage.getItem('isDashboardTracked')
    if(tracked === 'false' || !tracked) {
      trackEvent({
        event:'pageview',
        prop6: "Dashboard Page",
        prop10: "Dashboard | Cancer Moonshot Biobank"
      })
      sessionStorage.setItem('isDashboardTracked',true)
    }
  },[])

  const trackCardClick = (e) => {
    trackEvent({
      prop53: `BioBank_AccountCard|${e.currentTarget.querySelector("h2").textContent}`,
      eVar53: `BioBank_AccountCard|${e.currentTarget.querySelector("h2").textContent}`,
      events: 'event27'
    })
  }
  return (
    <Box>
      <Helmet>
        <title>Dashboard | NCI</title>
        <meta name="title" content="Dashboard" />
      </Helmet>
      <Container className="mainContainer--dashboard">
        <LoginConsumer>
        {([{firstName, lastName, isActiveBiobankParticipant}]) => {
          return (
            <Box my={6} mx={0}>
              <Typography variant="h1" gutterBottom>Welcome, {firstName} {lastName}</Typography>
              {isActiveBiobankParticipant === false ? 
                <div>
                  <Typography className={classes.badge}>Not Participating</Typography>
                  <Status state="info" fullWidth title="You are no longer participating in the Biobank." message="If you'd like to rejoin the Biobank, talk to your research coordinator." />
                </div>
                :
                <Typography variant="body2">Thank you for joining the Cancer Moonshot<sup>SM</sup> Biobank</Typography>
              }
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
                  cardClick={trackCardClick}
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
                    desc="Review the form you signed when you agreed to participate in the Biobank."
                    link="/dashboard/consent"
                    linkText="View forms"
                    cardClick={trackCardClick}
                  />
                </Grid>
                {/* END: Participant Consent Form */}

                {/* Participant Biomarker Test Results */}
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="biomarker-tests.svg"
                    title="Biomarker reports"
                    desc="View the reports from your Biomarker tests."
                    link="/dashboard/tests"
                    linkText="View reports"
                    count={count}
                    cardClick={trackCardClick}
                  />
                </Grid>
                {/* END: Participant Biomarker Test Results */}
              </>
            )
          }}
          </LoginConsumer>

          {/* User Profile */}
          <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <LoginConsumer>
          {([{roleName}]) => {
            const icon = roleName === "ROLE_PPE_PARTICIPANT" ? "user-profile.svg" : "doctor.svg"
            return <IconCard
                icon={icon}
                title="Account settings"
                desc="Update your contact information or change how you participate in the Biobank."
                link="/dashboard/profile"
                linkText="Update account"
                cardClick={trackCardClick}
              />
            }}
            </LoginConsumer>
          </Grid>
          {/* END: User Profile */}
          {/* Get Help */}
          <LoginConsumer>
          {([{roleName,newReport: count}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                <IconCard
                  icon="get-help.svg"
                  title="Get help"
                  desc="Learn about changing your participation in the Biobank."
                  link="/dashboard/help"
                  linkText="Learn more"
                  cardClick={trackCardClick}
                />
              </Grid>
            )
          }}
          </LoginConsumer>
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
