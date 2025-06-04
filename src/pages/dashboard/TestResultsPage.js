import React, { useContext } from 'react'
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { LoginContext } from '../../components/login/Login.context'
import Breadcrumbs from '../../components/Breadcrumbs'
import TestResults from '../../components/FileList/FileList.events'

const Page = () => {
  const [loginContext] = useContext(LoginContext)
  const { reports } = loginContext
  const { t } = useTranslation(['a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.biomarkerView.metaData.title')}</title>
        <meta name="title" content={t('components.biomarkerView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Reports" />
      <Container className="mainContainer">
        <Grid container mt={2} spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:3, }} >
              <Box component="img" sx={{ mr:3, width:'49px'}} src={`${process.env.PUBLIC_URL}/assets/icons/biomarker-tests.svg`} alt={t('a_common:icons.biomarker_test')} aria-hidden="true"></Box>
              <Typography variant="h2" component="h2">{t('components.biomarkerView.pageTitle')}</Typography>
            </Box>
            <Box mb={3}>
              <Typography gutterBottom>{t('components.biomarkerView.description')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <TestResults files={reports} noItemsMsg={t('components.biomarkerView.no_results.participant')} type="report" />
          </Grid>
          <Grid
            mt={2}
            sx={{ '& .MuiGrid-item': { marginBottom: 2 } }}
            size={{
              xs: 12,
              md: 6
            }}>
            <Grid>
              <Paper elevation={25}>
                <Box p={2}>
                  <Typography variant="h3" component="h3" sx={{
                        pb: 1,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        mb: 1,
                      }}>{t('components.biomarkerView.guide.0.title')}</Typography>
                </Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboard/test-guide--solid-tumor--short.jpg`} alt={t('components.biomarkerView.guide.0.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboard/test-guide--solid-tumor--short.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboardHD/test-guide--solid-tumor--short.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--Solid-Tumor.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('components.biomarkerView.guide.0.title_aria')}>{t('components.biomarkerView.guide.0.link')}</Button>
                </Box>
              </Paper>
            </Grid>
            <Grid>
              <Paper elevation={25}>
                <Box p={2}>
                  <Typography variant="h3" component="h3" sx={{
                        pb: 1,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        mb: 1,
                      }}>{t('components.biomarkerView.guide.1.title')}</Typography>
                </Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboard/test-guide--aml--short.jpg`} alt={t('components.biomarkerView.guide.1.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboard/test-guide--aml--short.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/dashboardHD/test-guide--aml--short.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--AML.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('components.biomarkerView.guide.1.title_aria')}>{t('components.biomarkerView.guide.1.link')}</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Page