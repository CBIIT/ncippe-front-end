import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import FAQs from '../../components/FAQ_Group'
import TabAppBar from './AppBar'

const Donate = () => {
  const { t, i18n } = useTranslation('donate')
  const faqs = i18n.getResourceBundle(i18n.languages[0],'donate').faqs
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const singleColumn = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Donate samples',
      prop10: t('metaData.title')
    })
  },[t])

  const h3Spacing = {
    '& h3': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(5),
      }
    }
  }

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
          <Grid
            sx={{ pr: { sm: 3 } }}
            size={{
              xs: 12,
              md: 6,
              lg: 8
            }}>
            <Typography  sx={{ mb: { xs: 4, sm: 5 } }} variant={isMobile ? "body1" : "body2"}>
              <RenderContent children={t('intro_text')} />
            </Typography>
            {!singleColumn && 
            <Typography component="div"  sx={h3Spacing}>
              <RenderContent children={t('body')} />
             </Typography>}
          </Grid>
          <Grid
            sx={{
              textAlign: 'center',
              '& img': {
                maxWidth: { xs: 600, md: 380 },
              },
            }}
            component="aside"
            size={{
              xs: 12,
              md: 6,
              lg: 4
            }}>
            <ArticleImage src="doctor-and-patient-1.jpg" alt={t('alt_text.0')} />
          </Grid>
          {singleColumn && 
          <Grid
      
            size={{
              xs: 12,
              md: 6,
              lg: 8
            }}>
             <Typography component="div"  sx={h3Spacing}>
                <RenderContent children={t('body')} />
              </Typography>
              
              </Grid>}
        </Grid>
      </Container>
      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs}  />
    </Box>
  );
}

export default Donate