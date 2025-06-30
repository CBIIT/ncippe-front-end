import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Card, CardMedia, Container, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
// import { OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import TabAppBar from './AppBar'

const Consent = () => {
  const { t, i18n } = useTranslation('consent')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const videoURL = i18n.languages[0] === 'en' ? "https://www.youtube.com/embed/KCMvPPRUcZU" : "https://www.youtube.com/embed/iq83dR49WMg"
	const lang = i18n.languages[0] === 'en' ? "" : "-es"


  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Give your consent',
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
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/expect/consent`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/expect/consent`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
      </Container>
      <TabAppBar value={0} />
      <Container>
        <Grid container component="section">
          <Grid sx={{ pr: { md: 3 } }}
            size={{
              xs: 12,
              md: 6,
              lg: 8
            }}>
            <Typography variant={isMobile ? "body1" : "body2"} component="div">
              <RenderContent children={t('intro_text')} />
            </Typography>
          </Grid>
          <Grid sx={{ mb: 2, textAlign: 'center' }}
            component="aside"
            size={{
              xs: 12,
              md: 6,
              lg: 4
            }}>
            <ArticleImage src="reviewing-test-results.jpg" alt={t('alt_text.0')} sx={{
      maxWidth: { xs: 600, md: 380 },
      width: '100%'
    }} />
          </Grid>
          <Grid sx={{ pr: { md: 3 } }}
            size={{
              xs: 12,
              md: 6,
              lg: 8
            }}>
            <Box mb={5} sx={{display: 'flex',flexDirection: 'column',alignItems: 'flex-start',
    '& a': { my: 0.5 } }} >
              <Typography variant="h3" component="h3">{t('sample_title')}</Typography>
              <Button href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Adult-Consent-Form${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_adult')} />
              </Button>
              <Button  href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Parental-Permission-Form${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_parental')} />
              </Button>
              <Button  href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Assent-Form-For-Minors${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_minors')} />
              </Button>
            </Box>
            <Box mb={4}>
              <figure>
                <Card sx={{ position: 'relative', paddingBottom: '56.25%', height: 0,
                      '& iframe': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }
                    }} elevation={25}>
                  <CardMedia
                    component='iframe'
                    src={videoURL}
                    title={t('video_title')}
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </Card>
                <figcaption><RenderContent children={t('video_caption')} /></figcaption>
              </figure>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Consent