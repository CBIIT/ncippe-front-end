import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Container, Box, Grid, Typography } from '@mui/material'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import IconCard from '../../components/IconCard'

const PrivacyPage = () => {
  const { t } = useTranslation('privacy')
  const iconMap = [
    'identification.svg',
    'stored-medical-info.svg',
    'doctor.svg',
    'secure-practices.svg',
    'security-system.svg',
    'laws.svg',
  ];

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Protecting your privacy',
      prop10: t('metaData.title'),
    })
  },[t])

  return (
    <Container className="mainContainer" component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/participation/privacy`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/participation/privacy`} />
      </Helmet>
      <Box py={4} mx={0} component="section">
        <Typography variant="h2" component="h1" gutterBottom>
          <RenderContent children={t('pageTitle')} />
        </Typography>
        <Typography variant="body2" component="div">
          <RenderContent children={t('subtitle')} />
        </Typography>
      </Box>
      <Grid container sx={{  justifyContent: 'flex-start', mb: 3 }} spacing={2} direction="row" justifyContent="center" alignItems="stretch" component="section">
      {[0, 1, 2, 4, 3, 5].map((i) => (
      <Grid
        key={i}
        size={{
          xs: 12,
          sm: 6,
          lg: 4
        }}>
        <IconCard
          icon={iconMap[i]} // fallback optional
          title={t(`cards.${i}.title`)}
          desc={t(`cards.${i}.description`)}
          altText={t(`cards.${i}.alt_text`)}
        />
      </Grid>
    ))}      
    </Grid>
      <Typography sx={{  width: '100%', maxWidth: {sm: '74%', md: '64%'} }} paragraph  component="div">
        <RenderContent children={t('disclaimer')} />
      </Typography>
    </Container>
  );
}

export default PrivacyPage