import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Container, Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
    }
  }
}))

const AboutPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('about')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "About the Boibank",
    })
  },[trackEvent])

  return (
    <Box>
      <Helmet>
        <title>About the Biobank | Cancer Moonshot Biobank | NCI</title>
        <meta name="title"        content="About the Biobank | Cancer Moonshot Biobank" />
        <meta property="og:title" content="About the Biobank | Cancer Moonshot Biobank" />
        <meta name="description"        content="The Cancer Moonshot Biobank is an unprecedented effort to learn how cancers behave over time." />
        <meta property="og:description" content="The Cancer Moonshot Biobank is an unprecedented effort to learn how cancers behave over time." />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.0.title')} />
              </Typography>

              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent source={t('sections.0.subtitle')} />
              </Typography>
              
              <Typography component="div">
                <RenderContent source={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage