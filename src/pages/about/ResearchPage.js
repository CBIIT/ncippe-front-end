import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
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

const ResearchPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('research')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Biobanks are important for research",
    })
  },[trackEvent])

  return (
    <Box>
      <Helmet>
        <title>Biobanking is important to research | Cancer Moonshot Biobank | NCI</title>
        <meta name="title"        content="Biobanking is important to research | Cancer Moonshot Biobank" />
        <meta property="og:title" content="Biobanking is important to research | Cancer Moonshot Biobank" />
        <meta name="description"        content="To understand why cancer spreads or becomes resistant to treatment, researchers will be able to access tissue donated by patients over the course of their treatment." />
        <meta property="og:description" content="To understand why cancer spreads or becomes resistant to treatment, researchers will be able to access tissue donated by patients over the course of their treatment." />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/about/research`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about/research`} />
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
              <Typography component="div">
                <RenderContent source={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="researchers-2.jpg" alt={t('sections.0.alt_text')} />
            </Grid>

            <Divider className={classes.divider} />

            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.1.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent source={t('sections.1.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="researchers-1.jpg" alt={t('sections.0.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
export default ResearchPage