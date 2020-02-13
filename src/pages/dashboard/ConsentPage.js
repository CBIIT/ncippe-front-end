import React, { useContext } from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import TestResultsItem from '../../components/TestResults/TestResultsItem'
import NoItems from '../../components/NoItems/NoItems'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  aside: {
    marginTop: theme.spacing(3),
    backgroundColor: '#E5E8EB',
    padding: theme.spacing(3),
    minHeight: '455px',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(4),
      marginTop: 0
    }
  }
}))

export default () => {
  const classes = useStyles()
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
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <div className={classes.titleWithIcon}>
              <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/reports.svg`} alt={t('a_common:icons.reports')} aria-hidden="true"></img>
              <Typography variant="h2" component="h2">{t('components.consentView.pageTitle')}</Typography>
            </div>
            <Box mb={3}>
              <Typography>{t('components.consentView.description')}</Typography>
            </Box>
            {files && files.length > 0 ? 
              files.map((file,i) => <TestResultsItem key={i} report={file} noBadge />)
              : 
              <NoItems message={t('components.consentView.no_results.participant')} />
            }
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Placeholder for future aside content */}
            {/* <Box className={classes.aside}></Box> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}