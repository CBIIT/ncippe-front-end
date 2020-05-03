import React, { useEffect } from 'react'
import { Link as RouterLink } from "@reach/router"
import { Box, Container, Button } from '@material-ui/core'
import Status from '../components/Status/Status'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'


const ErrorPage = (props) => {
  const { t } = useTranslation('notFoundPage')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Error Page",
      pageType: "errorPage",
      prop10: t("metaData.title")
    })
  },[trackEvent, t])

  const errorDefaults = {
    status: "error",
    name: "Error",
    message: "An undefined error has occured."
  }
  const error = {
    ...errorDefaults,
    ...props.location.state.error
  }
  return (
    <Container>
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/errorPage`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/errorPage`} />
      </Helmet>
      <Box my={6} mx={0} component="section">
        <Status state={error.status} title={error.name} message={error.message} />
        <div>
          <Button variant="contained" color="primary" component={RouterLink} to="/">{t('buttonText')}</Button>
        </div>
      </Box>
    </Container>
  )
}

export default ErrorPage