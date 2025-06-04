import React from 'react'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs'
import ArticleImage from '../../components/utils/ArticleImage'

const Page = () => {
  const { t } = useTranslation(['a_help','a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Get Help" />
      <Container className="mainContainer">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }} >
          <Box component='img' sx={{mr: 3, width:'49px' }} 
          src={`${process.env.PUBLIC_URL}/assets/icons/get-help.svg`} 
          alt={t('a_common:icons.help')} aria-hidden="true"></Box>
          <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        </Box>
        <Typography>{t('description')} </Typography>
        <Box mt={5}>
          <Grid container justifyContent="flex-start" spacing={2} alignItems="stretch">
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h3" component="h3">{t('sections.0.title')}</Typography>
              <Typography paragraph={true}>{t('sections.0.body')}</Typography>

              <Typography paragraph={true} variant="h3" component="h3">{t('sections.1.title')}</Typography>
              <Typography paragraph={true}>{t('sections.1.body')}</Typography>
            </Grid>
            <Grid sx={{ textAlign: 'center', '& img': { maxWidth: {xs: '100%', md: 380 } } }}
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="tablet.jpg" alt={t('sections.1.alt_text')} />
            </Grid>
          </Grid>
          <Divider sx={{ width: '100%', my: { xs: 3, md: 7 } }} />
          <Grid container justifyContent="flex-start" spacing={2} alignItems="stretch">
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h3" component="h3">{t('sections.2.title')}</Typography>
              <Typography paragraph={true}>{t('sections.2.body')}</Typography>
            </Grid>
            <Grid
              sx={{ textAlign: 'center', '& img': { maxWidth: {xs: '100%', md: 380 } } }}
              size={{
                xs: 12,
                md: 6
              }}>
              <ArticleImage src="hospital-building.jpg" alt={t('sections.2.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Page