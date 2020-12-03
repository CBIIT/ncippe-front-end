import React, { useEffect } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { trackFallback } from '../utils/utils'

const useStyles = makeStyles( theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  clear: {
    display: 'inline-flex',
    border: '5px solid',
    borderRadius: '50%',
    
    "& > svg": {
      padding: 10,
      fontSize: "5.8rem",
    }
  }
}),{name: 'NotFoundPage'})

const ErrorPage = (props) => {
  const classes = useStyles()
  const { trackEvent = trackFallback } = props
  const { t } = useTranslation('notFoundPage')

  useEffect(() => {
    trackEvent("page view", {
      pageTitle: "Error Page",
      metaTitle: t("metaData.title"),
      pageType: "errorPage",
    })
  },[trackEvent, t])

  return (
    <Box mt={5}>
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/notfound`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/notfound`} />
      </Helmet>
      <Container className={classes.container} component="section">
        <div>
          <div className={classes.clear}>
            <ClearIcon />
          </div>
        </div>
        <Typography variant="h1" component="h1">{t('pageTitle')}</Typography>
        <Typography gutterBottom variant="h2" component="h2">{t('subtitle')}</Typography>
        <div>
          <Button variant="contained" color="primary" component={RouterLink} to="/">{t('buttonText')}</Button>
        </div>
      </Container>
    </Box>
  )
}

export default ErrorPage