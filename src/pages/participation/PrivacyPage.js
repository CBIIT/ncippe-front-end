import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import RenderContent from '../../components/utils/RenderContent'
import IconCard from '../../components/IconCard/IconCard'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(4)
  },
  gridItem: {
    width: '33.333333%',

    // '& $card': {
    //   [theme.breakpoints.up('md')]: {
    //     margin: 0
    //   }
    // }
  }
}))

const PrivacyPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('privacy')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Protecting your privacy",
    })
  },[trackEvent])

  return (
    <Container className="mainContainer">
      <Helmet>
        <title>Protecting your privacy | Cancer Moonshot Biobank | NCI</title>
        <meta name="title"        content="Protecting your privacy | Cancer Moonshot Biobank" />
        <meta property="og:title" content="Protecting your privacy | Cancer Moonshot Biobank" />
        <meta name="description"        content="We protect your data and your privacy by controlling who can access your information, not sharing your participation, and testing our systems regularly." />
        <meta property="og:description" content="We protect your data and your privacy by controlling who can access your information, not sharing your participation, and testing our systems regularly." />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/participation/privacy`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/participation/privacy`} />
      </Helmet>
      <Box my={6} mx={0}>
        <Typography variant="h1" gutterBottom>
          <RenderContent source={t('pageTitle')} />
        </Typography>
        <Typography variant="body2" component="div">
          <RenderContent source={t('subtitle')} />
        </Typography>
      </Box>
      <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="identification.svg"
            title={t('cards.0.title')}
            desc={t('cards.0.description')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="stored-medical-info.svg"
            title={t('cards.1.title')}
            desc={t('cards.1.description')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="doctor.svg"
            title={t('cards.2.title')}
            desc={t('cards.2.description')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="secure-practices.svg"
            title={t('cards.3.title')}
            desc={t('cards.3.description')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="security-system.svg"
            title={t('cards.4.title')}
            desc={t('cards.4.description')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="laws.svg"
            title={t('cards.5.title')}
            desc={t('cards.5.description')}
          />
        </Grid>
      </Grid>
      <Typography paragraph={true} component="div">
        <RenderContent source={t('disclaimer')} />
      </Typography>
    </Container>
  )
}

export default PrivacyPage