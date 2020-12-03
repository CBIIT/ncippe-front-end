import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { trackFallback } from '../../utils/utils'
import { LoginConsumer } from '../../components/login/Login.context'
import UploadReport from '../../components/Mocha/UploadReport'

const Page = (props) => {
  const { trackEvent = trackFallback } = props
  const { t } = useTranslation(['a_landingMocha','a_common'])

  useEffect(() => {
    // only want to track the dashboard landing page load event once, saving state to session variable
    const tracked = sessionStorage.getItem('isDashboardTracked')
    if(tracked === 'false' || !tracked) {
      trackEvent("page view", {
        pageTitle: "Mocha Landing Page",
        metaTitle: t('metaData.title')
      })
      sessionStorage.setItem('isDashboardTracked',true)
    }
  },[trackEvent, t])
  return (
    <Box>
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Container className="mainContainer--dashboard">
          <LoginConsumer>
          {([{firstName, lastName}]) => <Box my={6} mx={0}><Typography variant='h1' component='h1' gutterBottom>{t('a_common:welcome')}, {firstName} {lastName}</Typography></Box>}
          </LoginConsumer>
          <UploadReport />
      </Container>
    </Box>
  )
}

export default Page