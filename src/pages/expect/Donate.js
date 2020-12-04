import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import FAQs from '../../components/FAQ_Group'
import TabAppBar from './AppBar'

const useStyles = makeStyles( theme => ({
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
    }
  },
  bottomSpacer: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },
  extraSpacing: {
    '& h3': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(5)
      }
    }
  },
}),{name: 'DonatePage'})

const BodyContent = () => {
  const classes = useStyles()
  const { t } = useTranslation('donate')
  return (
    <Typography component="div" className={classes.extraSpacing}>
      <RenderContent source={t('body')} />
    </Typography>
  )
}

const Donate = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('donate')
  const faqs = i18n.getResourceBundle(i18n.languages[0],'donate').faqs
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const singleColumn = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Donate samples',
      prop10: t('metaData.title')
    })
  },[t])

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/expect/donate`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/expect/donate`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">{t('pageTitle')}</Typography>
      </Container>
      <TabAppBar value={1} />

      <Container>
        <Grid container component="section">
          <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
            <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>
              <RenderContent source={t('intro_text')} />
            </Typography>
            {!singleColumn && <BodyContent />}
          </Grid>
          <Grid item xs={12} md={6} lg={4} className={classes.gridItemImg} component="aside">
            <ArticleImage src="doctor-and-patient-1.jpg" alt={t('alt_text.0')} />
          </Grid>
          {singleColumn && <Grid item xs={12} md={6} lg={8} className={classes.textColumn}><BodyContent /></Grid>}
        </Grid>
      </Container>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} className={classes.faqs} />

    </Box>
  )
}

export default Donate