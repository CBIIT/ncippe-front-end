import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Container, Box, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { trackFallback } from '../../utils/utils'
import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start',
    '& img': {
      display: 'inline-block',
      maxWidth: 600,
      margin: theme.spacing(1,0,3)
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
  }
}),{name: 'AboutPage'})

const AboutPage = (props) => {
  const classes = useStyles()
  const { trackEvent = trackFallback } = props
  const { t } = useTranslation('about')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    trackEvent("page view", {
      pageTitle: "About the Boibank",
      metaTitle: t("metaData.title")
    })
  },[trackEvent, t])

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.0.title')} />
              </Typography>
              { isMobile && <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')} />}
              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent source={t('sections.0.subtitle')} />
              </Typography>
              
              <Typography component="div">
                <RenderContent source={t('sections.0.body')} />
              </Typography>
            </Grid>
            { !isMobile &&
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')} />
            </Grid>
            }
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage