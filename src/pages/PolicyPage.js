import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PubSub from 'pubsub-js'
import RenderContent from '../components/utils/RenderContent'

const PolicyPage = () => {
  const { t } = useTranslation('policy')

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Policy Page',
      prop10: t('metaData.title'),
    })
  },[t])

  // navigate to anchor tags on page load
  useEffect(() => {
    if (document.location.hash) {
      document.querySelector(document.location.hash).scrollIntoView({
          // optional params
          behaviour: 'smooth',
          block: 'start',
      });
    }
  },[])

  return (
    <Box>
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/website-privacy-security`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/website-privacy-security`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h1" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5} component="article" sx={{
            typography: 'body1',
            '& h1': (theme) => theme.typography.h1,
            '& h2': (theme) => theme.typography.h2,
            '& h3': (theme) => theme.typography.h3,
            '& h4': (theme) => theme.typography.h4,
            maxWidth: { md: '80%' },
          }}>
          <Typography component="div">
            <RenderContent children={t(`description`)} />
          </Typography>
          <section>
            <Typography variant="h2" component="h2">{t('PII.title')}</Typography>
            <Typography component="div"><RenderContent children={t(`PII.body`)} /></Typography>
          </section>
          <section>
            <Typography variant="h2" component="h2">{t('disclosure.title')}</Typography>
            <Typography component="div"><RenderContent children={t(`disclosure.body`)} /></Typography>
          </section>
          <Box
            component="nav"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 4,
              mb: 3,
              ml: 2,
              '& h2': (theme) => ({
                ...theme.typography.h3,
                mt: 0,
              }),
              '& h3': (theme) => ({
                ...theme.typography.h4,
                mt: 1,
                mb: 1,
                ml: 2,
              }),
              '& > a': {
                display: 'inline-block',
                ml: 4,
                mb: 1,
              },
            }}
          >
            <Typography component="h2">
              <RenderContent children={t(`nav.title`)} />
            </Typography>
            <RenderContent children={t(`nav.body`)} />
          </Box>
          <section>
            <Typography id="public" variant="h2" component="h2">{t('public.title')}</Typography>
            <Typography component="div"><RenderContent children={t(`public.body`)} /></Typography>
            {Object.keys(t('public.sections', { returnObjects: true })).map((section, i) => 
              <Typography component="section" key={i}>
                <RenderContent children={t(`public.sections.${i}.title`)} />
                <RenderContent children={t(`public.sections.${i}.body`)} />
              </Typography>
            )}
          </section>
          <section>
            <Typography id="portal" variant="h2" component="h2">{t('portal.title')}</Typography>
            <Typography component="div"><RenderContent children={t(`portal.body`)} /></Typography>
            {Object.keys(t('portal.sections', { returnObjects: true })).map((section, i) => 
              <Typography component="section" key={i}>
                <RenderContent children={t(`portal.sections.${i}.title`)} />
                <RenderContent children={t(`portal.sections.${i}.body`)} />
              </Typography>
            )}
          </section>
        </Box>
      </Container>
    </Box>
  )
}

export default PolicyPage