import React, { useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'

import { LoginConsumer } from '../../components/login/Login.context'
import PatientList from '../../components/PatientList/PatientList'
import IconCard from '../../components/IconCard/IconCard'
import Status from '../../components/Status/Status'
import RenderContent from '../../components/utils/RenderContent'


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
  const { t } = useTranslation(['a_landing','a_common'])
  const { trackEvent } = useTracking()

  useEffect(() => {
    // only want to track the dashboard landing page load event once, saving state to session variable
    const tracked = sessionStorage.getItem('isDashboardTracked')
    if(tracked === 'false' || !tracked) {
      trackEvent({
        event:'pageview',
        prop6: "Account Page",
        prop10: t('metaData.title')
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
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Container className="mainContainer--dashboard">
        <LoginConsumer>
        {([{firstName, lastName, isActiveBiobankParticipant}]) => {
          return (
            <Box my={6} mx={0}>
              <Typography variant="h1" gutterBottom>{t('pageTitle')}, {firstName} {lastName}</Typography>
              {isActiveBiobankParticipant === false ? 
                <div>
                  <Typography className={classes.badge}>{t('a_common:not_participating.badge')}</Typography>
                  <Status state="info" fullWidth title={t('a_common:not_participating.status.title')} message={t('a_common:not_participating.status.message')} />
                </div>
                :
                <Typography variant="body2"><RenderContent source={t('subtitle')} /></Typography>
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
              //{`You have ${count} new notification${count !== 1 ? 's' : ''}.`}
              return (
                <IconCard
                  icon="notifications.svg"
                  title={t('cards.notifications.title')}
                  desc={t('cards.notifications.description', {count,s:count !== 1 ? t('a_common:pluralizer') : ''})}
                  link="/dashboard/notifications"
                  linkText={t('cards.notifications.link')}
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
                    title={t('cards.consent.title')}
                    desc={t('cards.notifications.description')}
                    link="/dashboard/consent"
                    linkText={t('cards.notifications.link')}
                    cardClick={trackCardClick}
                  />
                </Grid>
                {/* END: Participant Consent Form */}

                {/* Participant Biomarker Test Results */}
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="biomarker-tests.svg"
                    title={t('cards.biomarker.title')}
                    desc={t('cards.biomarker.description')}
                    link="/dashboard/tests"
                    linkText={t('cards.biomarker.link')}
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
                title={t('cards.settings.title')}
                desc={t('cards.settings.description')}
                link="/dashboard/profile"
                linkText={t('cards.settings.link')}
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
                  title={t('cards.help.title')}
                  desc={t('cards.help.description')}
                  link="/dashboard/help"
                  linkText={t('cards.help.link')}
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
      {([{roleName, patients, patientsUpdated}]) => {
        return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && patients && (
        <Container>
          {/* Provider's Patient List */}
            {/* Secondary row */}
              <Box my={6}>
                <PatientList patients={patients} patientsUpdated={patientsUpdated} />
              </Box>
          {/* End: Provider's Patient List */}
        </Container>
        )
      }}
      </LoginConsumer>
    </Box>
  )
}
