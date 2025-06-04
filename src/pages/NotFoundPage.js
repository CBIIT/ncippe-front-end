import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PubSub from 'pubsub-js'

const ErrorPage = () => {
  const { t } = useTranslation('notFoundPage')

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Error Page',
      prop10: t('metaData.title'),
      pageType: "errorPage",
    })
  },[t])

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
      <Container component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} >
        <Box
          sx={{
            display: 'inline-flex',
            border: '5px solid',
            borderRadius: '50%',
            mb: 2,
            '& > svg': {
              padding: 2,
              fontSize: '5.8rem',
            },
          }}
        >
          <ClearIcon />
        </Box>
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