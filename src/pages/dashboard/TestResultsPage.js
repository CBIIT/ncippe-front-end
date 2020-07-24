import React from 'react'
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import TestResults from '../../components/TestResults/TestResults'

const useStyles = makeStyles(theme => ({
  // aside: {
  //   marginTop: theme.spacing(3),
  //   backgroundColor: '#E5E8EB',
  //   padding: theme.spacing(3),
  //   minHeight: '455px',
  //   [theme.breakpoints.up('md')]: {
  //     marginLeft: theme.spacing(4),
  //     marginTop: 0
  //   }
  // },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  sampleTitle: {
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: theme.spacing(1),
  },
}))

export default ({userName}) => {
  const classes = useStyles()
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
          <Grid item xs={12} md={6}>
            <div className={classes.titleWithIcon}>
              <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/biomarker-tests.svg`} alt={t('a_common:icons.biomarker_test')} aria-hidden="true"></img>
              <Typography variant="h2" component="h2">{t('components.biomarkerView.pageTitle')}</Typography>
            </div>
            <Box mb={3}>
              <Typography gutterBottom>{t('components.biomarkerView.description')}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={2} className={classes.samples}>
          <Grid item xs={12} md={6}>
            <TestResults userName={userName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={25}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/sampleReport/standard/test-guide--solid-tumor.jpg.jpg`} alt={t('components.biomarkerView.guide.alt_text')}
                srcSet={`
                  /${process.env.PUBLIC_URL}assets/images/sampleReport/standard/test-guide--solid-tumor.jpg.jpg 1x,
                  /${process.env.PUBLIC_URL}assets/images/sampleReport/HD/test-guide--solid-tumor.jpg.jpg 2x
                `}
              />
              <Divider />
              <Box p={2}>
                <Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('components.biomarkerView.guide.title')}</Typography>
                <Button href={`/${process.env.PUBLIC_URL}assets/documents/Biomarker-Test-Guide.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('components.biomarkerView.guide.aria_label')}>{t('components.biomarkerView.guide.link')}</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}