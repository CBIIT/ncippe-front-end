import React, { useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PubSub from 'pubsub-js'

import { LoginConsumer } from '../../components/login/Login.context'
import PatientList from '../../components/PatientList/PatientList'
import IconCard from '../../components/IconCard'
import Status from '../../components/Status'
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
  patientList: {
    padding: theme.spacing(6,2),
    backgroundColor: theme.palette.grey.xlight,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6,3)
    }
  }
}),{name: 'DashboardPage'})

const Page = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_landing','a_common'])

  useEffect(() => {
    // only want to track the dashboard landing page load event once, saving state to session variable
    const tracked = sessionStorage.getItem('isDashboardTracked')
    if(tracked === 'false' || !tracked) {
      PubSub.publish('ANALYTICS', {
        event:'pageview',
        prop6: 'Account Page',
        prop10: t('metaData.title'),
      })
      sessionStorage.setItem('isDashboardTracked',true)
    }
  },[t])

  const trackCardClick = (e) => {
    const card = e.currentTarget.closest(".IconCardContent")
    PubSub.publish('ANALYTICS', {
      eventName: 'CardLink',
      events: 'event27',
      prop57: `BioBank_AccountCard|${card.querySelector("h2").textContent}`,
      eVar37: `BioBank_AccountCard|${card.querySelector("h2").textContent}`,
    })
    window.$defaultLinkTrack = false
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
          {/* Send Message */}
          <LoginConsumer>
            {([{roleName}]) => {
              //{`You have ${count} new notification${count !== 1 ? 's' : ''}.`}
              /* count will be a number */
              return roleName === "ROLE_PPE_MESSENGER" && (
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="notifications.svg"
                    title={t('cards.sendMessage.title')}
                    desc={t('cards.sendMessage.description')}
                    link="/account/sendMessage"
                    linkText={t('cards.sendMessage.link')}
                    cardClick={trackCardClick}
                  />
                </Grid>
              )
            }}
          </LoginConsumer>
          {/* END: Send Message */}
          {/* Message History */}
          <LoginConsumer>
            {([{roleName}]) => {
              //{`You have ${count} new notification${count !== 1 ? 's' : ''}.`}
              /* count will be a number */
              return roleName === "ROLE_PPE_MESSENGER" && (
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="stored-medical-info.svg"
                    title={t('cards.messageHistory.title')}
                    desc={t('cards.messageHistory.description')}
                    link="/account/messageHistory"
                    linkText={t('cards.messageHistory.link')}
                    cardClick={trackCardClick}
                  />
                </Grid>
              )
            }}
          </LoginConsumer>
          {/* END: Message History */}
          {/* User Notifications */}
          <LoginConsumer>
            {([{roleName, newNotificationCount: count}]) => {
              //{`You have ${count} new notification${count !== 1 ? 's' : ''}.`}
              /* count will be a number */
              return roleName !== "ROLE_PPE_MESSENGER" && (
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="notifications.svg"
                    title={t('cards.notifications.title')}
                    desc={t('cards.notifications.description', {count})}
                    link="/account/notifications"
                    linkText={t('cards.notifications.link')}
                    count={count}
                    cardClick={trackCardClick}
                  />
                </Grid>
              )
            }}
          </LoginConsumer>
          {/* END: User Notifications */}

          <LoginConsumer>
          {([{roleName,newReportCount,newDocumentCount}]) => {
            /* count will be true or false */
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <>
                {/* Participant Consent Form */}
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon="reports.svg"
                    title={t('cards.consent.title')}
                    desc={t('cards.consent.description')}
                    link="/account/consent"
                    linkText={t('cards.consent.link')}
                    count={newDocumentCount}
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
                    link="/account/tests"
                    linkText={t('cards.biomarker.link')}
                    count={newReportCount}
                    cardClick={trackCardClick}
                  />
                </Grid>
                {/* END: Participant Biomarker Test Results */}
              </>
            )
          }}
          </LoginConsumer>

          {/* User Profile */}
          <LoginConsumer>
          
          {([{roleName}]) => {
            const icon = roleName === "ROLE_PPE_PARTICIPANT" ? "user-profile.svg" : "doctor.svg"
            const description = roleName === "ROLE_PPE_PARTICIPANT" ? t('cards.settings.description.participant') : t('cards.settings.description.admin')
            return (
                <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                  <IconCard
                    icon={icon}
                    title={t('cards.settings.title')}
                    desc={description}
                    link="/account/profile"
                    linkText={t('cards.settings.link')}
                    cardClick={trackCardClick}
                  />
                </Grid>
              )
            }}
          </LoginConsumer>
          {/* END: User Profile */}
          {/* Get Help */}
          <LoginConsumer>
          {([{roleName}]) => {
            return roleName === "ROLE_PPE_PARTICIPANT" && (
              <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                <IconCard
                  icon="get-help.svg"
                  title={t('cards.help.title')}
                  desc={t('cards.help.description')}
                  link="/account/help"
                  linkText={t('cards.help.link')}
                  cardClick={trackCardClick}
                />
              </Grid>
            )
          }}
          </LoginConsumer>
          {/* END: Get Help */}
          {/* Report Guide */}
          <LoginConsumer>
          {([{roleName}]) => {
            return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC") && (
              <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                <IconCard
                  icon="biomarker-tests.svg"
                  title={t('cards.guide.title')}
                  desc={t('cards.guide.description')}
                  link={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--Solid-Tumor.pdf`}
                  download={true}
                  linkText={t('cards.guide.link')}
                  cardClick={trackCardClick}
                />
              </Grid>
            )
          }}
          </LoginConsumer>
          {/* END: Report Guide */}
          {/* Report Guide */}
          <LoginConsumer>
          {([{roleName}]) => {
            return (roleName === "ROLE_PPE_PARTICIPANT" || roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC") && (
              <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
                <IconCard
                  icon="one-idea-v2.svg"
                  title={t('cards.resources.title')}
                  desc={t('cards.resources.description')}
                  link="/account/resources"
                  linkText={t('cards.resources.link')}
                  cardClick={trackCardClick}
                />
              </Grid>
            )
          }}
          </LoginConsumer>
          {/* END: Report Guide */}
        </Grid>
      </Container>

      <LoginConsumer>
      {([{roleName, patients, patientsUpdated}]) => {
        return (roleName === "ROLE_PPE_PROVIDER" || roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && patients && (
        <Container className={classes.patientList}>
          {/* Provider's Patient List */}
          <PatientList patients={patients} patientsUpdated={patientsUpdated} />
          {/* End: Provider's Patient List */}
        </Container>
        )
      }}
      </LoginConsumer>
    </Box>
  )
}

export default Page