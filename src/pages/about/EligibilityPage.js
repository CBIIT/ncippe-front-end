import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Container, Box, Grid, Typography, Divider, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import HospitalMap from '../../components/HospitalMap/HospitalMap'
import TabAboutBar from './AboutBar'

const EligibilityPage = () => {
  const { t } = useTranslation('eligibility')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: "Eligibility and locations",
      prop10: t("metaData.title")
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
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/about/eligibility`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about/eligibility`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1"><RenderContent children={t('pageTitle')} /></Typography>
      </Container>
      <TabAboutBar value={1} />
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container sx={{  justifyContent: 'flex-start' }} spacing={2} alignItems="stretch">
            <Grid
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent children={t('introText')} />
              </Typography>
            </Grid>
            <Grid
              sx={{ textAlign: 'left',
                '& img': {
                  maxWidth: {
                    xs: 600,
                    md: 380,
                  },
                }, }}
              component="aside"
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="patient-1.jpg" alt={t('sections.0.alt_text')} />
            </Grid>
            <Grid component="section">
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.0.title')} />
              </Typography>
              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent children={t('sections.0.subtitle')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.0.body.list')} />
              </Typography>
            </Grid>

            <Divider sx={{ width: '100%', margin: theme.spacing(3, 0),
                            [theme.breakpoints.up('md')]: {
                            margin: theme.spacing(7, 0),},  }} />
            
            <Grid
              sx={{ textAlign: 'left',
                '& img': {
                  maxWidth: {
                    xs: 600,
                    md: 380,
                  },
                },}}
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.1.title')} />
              </Typography>
              <Typography paragraph={true} variant="body2">
                <RenderContent children={t('sections.1.subtitle')} />
              </Typography>
              <Typography component="div">
              <RenderContent children={t('sections.1.body')} />
              </Typography>
            </Grid>
            <HospitalMap />

            <Divider sx={{ width: '100%', margin: theme.spacing(3, 0),
                            [theme.breakpoints.up('md')]: {
                            margin: theme.spacing(7, 0),},  }} />

            <Grid
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.2.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.2.body.text')} />
                <RenderContent children={t('sections.2.body.list')} />
              </Typography>
            </Grid>
            <Grid
              sx={{ textAlign: 'center',
                '& img': {
                  maxWidth: {
                    xs: 600,
                    md: 380,
                  },
                },}}
              component="aside"
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="patient-and-nurse-1.jpg" alt={t('sections.2.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default EligibilityPage