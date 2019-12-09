import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import track, { useTracking } from 'react-tracking'
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
    trackEvent({event:'pageview'})
  },[trackEvent])

  return (
    <Container className="mainContainer">
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

export default track({
  prop6: "Protecting your privacy",
})(PrivacyPage)