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
    marginBottom: theme.spacing(3)
  },
  gridItem: {
    width: '33.333333%',

    // '& $card': {
    //   [theme.breakpoints.up('md')]: {
    //     margin: 0
    //   }
    // }
  },
  disclaimer: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  }
}))

const PrivacyPage = () => {
  const classes = useStyles()
  const { t } = useTranslation('privacy')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Protecting your privacy",
      prop10: t("metaData.title")
    })
  },[trackEvent, t])

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
          <RenderContent source={t('pageTitle')} />
        </Typography>
        <Typography variant="body2" component="div">
          <RenderContent source={t('subtitle')} />
        </Typography>
      </Box>
      <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch" component="section">
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="identification.svg"
            title={t('cards.0.title')}
            desc={t('cards.0.description')}
            altText={t('cards.0.alt_text')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="stored-medical-info.svg"
            title={t('cards.1.title')}
            desc={t('cards.1.description')}
            altText={t('cards.1.alt_text')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="doctor.svg"
            title={t('cards.2.title')}
            desc={t('cards.2.description')}
            altText={t('cards.2.alt_text')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="security-system.svg"
            title={t('cards.4.title')}
            desc={t('cards.4.description')}
            altText={t('cards.4.alt_text')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="secure-practices.svg"
            title={t('cards.3.title')}
            desc={t('cards.3.description')}
            altText={t('cards.3.alt_text')}
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="laws.svg"
            title={t('cards.5.title')}
            desc={t('cards.5.description')}
            altText={t('cards.5.alt_text')}
          />
        </Grid>
      </Grid>
      <Typography className={classes.disclaimer} paragraph={true} component="div">
        <RenderContent source={t('disclaimer')} />
      </Typography>
    </Container>
  )
}

export default PrivacyPage