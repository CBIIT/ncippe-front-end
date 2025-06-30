import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Divider, Grid, Link, Typography, useTheme } from '@mui/material'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

const ResearchPage = () => {
  const { t } = useTranslation('research')
  const theme = useTheme()

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Biobanks are important for research',
      prop10: t('metaData.title'),
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
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h1" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container sx={{ justifyContent: 'flex-start' }} spacing={2} alignItems="stretch">
            <Grid
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.0.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid
              sx={{ textAlign: 'center',
                '& img': { maxWidth: { xs: 600,md: 380,}, width: '100%', },
                }}
              component="aside"
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="researchers-2.jpg" alt={t('sections.0.alt_text')} />
            </Grid>

            <Divider sx={{ width: '100%', my: 2,
              [theme.breakpoints.up('md')]: { my: 3,}, }} />

            <Grid
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.1.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.1.body')} />
              </Typography>

              <Box component="section" sx={{ mt: 5 }}>
                <Typography paragraph={true} variant="h3" component="h3">
                  <RenderContent children={t('sections.2.title')} />
                </Typography>
                <div>
                  {Object.keys(t('sections.2.links', { returnObjects: true })).map((link, i) => 
                    <Typography component="div" paragraph={true} key={i}>
                      <Link component={RouterLink} to={t(`sections.2.links.${i}.route`)}>{t(`sections.2.links.${i}.text`)}</Link>
                      <Typography><RenderContent children={t(`sections.2.links.${i}.author`)} /></Typography>
                      <Divider sx={{ width: '100%', my: 2,
                        [theme.breakpoints.up('md')]: { my: 3,}, }} />

                    </Typography>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid
              sx={{ textAlign: 'center',
                '& img': { maxWidth: { xs: 600,md: 380,}, width: '100%', },
                }}
              component="aside"
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="researchers-1.jpg" alt={t('sections.1.alt_text')} />
            </Grid>

            <Grid
              component="section"
              size={{
                xs: 12,
                md: 6
              }}>
              
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
export default ResearchPage