import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PubSub from 'pubsub-js'

import RenderContent from '../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  // root: {
    
  //   // "& h3": {...theme.typography.h3},
  //   // "& h4": {...theme.typography.h4}
  // },
  typography: () => {
    let styles = {}
    Object.entries(theme.typography).forEach(entry => {
      const [key, value] = entry;
      if(typeof value === "object"){
        styles[`& ${key}`] = {...value}
      }
    })
    return styles
  },
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: "80%"
    }
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4,0,3,2),
    "& h2:defined": { //:defined is for specificity
      ...theme.typography.h3
    },
    "& h3:defined": { //:defined is for specificity
      ...theme.typography.h4,
      margin: theme.spacing(1,0,1,2)
    },
    "& > a": {
      display: "inline-block",
      margin: theme.spacing(0,0,1,4),
    }
  },
}),{name: 'PolicyPage'})

const PolicyPage = () => {
  const classes = useStyles()
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
  })

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
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5} component="article" className={`${classes.typography} ${classes.container}`}>
          <Typography component="div">
            <RenderContent source={t(`description`)} />
          </Typography>
          <section>
            <Typography variant="h2" component="h2">{t('PII.title')}</Typography>
            <Typography component="div"><RenderContent source={t(`PII.body`)} /></Typography>
          </section>
          <section>
            <Typography variant="h2" component="h2">{t('disclosure.title')}</Typography>
            <Typography component="div"><RenderContent source={t(`disclosure.body`)} /></Typography>
          </section>
          <Typography className={classes.nav} component="nav">
            <Typography component="h2">
              <RenderContent source={t(`nav.title`)} />
            </Typography>
            <RenderContent source={t(`nav.body`)} />
          </Typography>
          <section>
            <Typography id="public" variant="h2" component="h2">{t('public.title')}</Typography>
            <Typography component="div"><RenderContent source={t(`public.body`)} /></Typography>
            {Object.keys(t('public.sections', { returnObjects: true })).map((section, i) => 
              <Typography component="section" key={i}>
                <RenderContent source={t(`public.sections.${i}.title`)} />
                <RenderContent source={t(`public.sections.${i}.body`)} />
              </Typography>
            )}
          </section>
          <section>
            <Typography id="portal" variant="h2" component="h2">{t('portal.title')}</Typography>
            <Typography component="div"><RenderContent source={t(`portal.body`)} /></Typography>
            {Object.keys(t('portal.sections', { returnObjects: true })).map((section, i) => 
              <Typography component="section" key={i}>
                <RenderContent source={t(`portal.sections.${i}.title`)} />
                <RenderContent source={t(`portal.sections.${i}.body`)} />
              </Typography>
            )}
          </section>
        </Box>
      </Container>
    </Box>
  )
}

export default PolicyPage