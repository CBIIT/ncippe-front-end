import React, { useContext } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import Breadcrumbs from '../../components/Breadcrumbs'
// import FileList from '../../components/FileList'
import ConsentForms from '../../components/FileList/FileList.events'

const Page = () => {
  const [loginContext] = useContext(LoginContext)
  const {otherDocuments: files} = loginContext
  const { t } = useTranslation('a_common')
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.consentView.metaData.title')}</title>
        <meta name="title" content={t('components.consentView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Consent Page" />
      <Container className="mainContainer">
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box component='img' sx={{ width: '49px', mr: 3 }}
               src={`${process.env.PUBLIC_URL}/assets/icons/reports.svg`} 
               alt={t('a_common:icons.reports')} aria-hidden="true"></Box>
              <Typography variant="h2" component="h2">{t('components.consentView.pageTitle')}</Typography>
            </Box>
            <Box mb={3}>
              <Typography>{t('components.consentView.description')}</Typography>
            </Box>
            <ConsentForms files={files} noItemsMsg={t('components.consentView.no_results.participant')} type="consentForm" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            {/* Placeholder for future aside content */}
            {/* <Box className={classes.aside}></Box> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Page