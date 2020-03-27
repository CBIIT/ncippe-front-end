import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useTracking } from 'react-tracking'

import { LoginConsumer } from '../../components/login/Login.context'
import UploadReport from '../../components/Mocha/UploadReport'

export default () => {
  const { t } = useTranslation(['a_landingMocha','a_common'])
  const { trackEvent } = useTracking()
  useEffect(() => {
    // only want to track the dashboard landing page load event once, saving state to session variable
    const tracked = sessionStorage.getItem('isDashboardTracked')
    if(tracked === 'false' || !tracked) {
      trackEvent({
        event:'pageview',
        prop6: "Mocha Landing Page",
        prop10: t('metaData.title')
      })
      sessionStorage.setItem('isDashboardTracked',true)
    }
  },[])
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