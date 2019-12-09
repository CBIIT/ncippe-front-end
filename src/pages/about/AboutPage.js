import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import track, { useTracking } from 'react-tracking'
import RenderContent from '../../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
    }
  }
}))

const AboutPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('about')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({event:'pageview'})
  },[trackEvent])

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.0.title')} />
              </Typography>

              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent source={t('sections.0.subtitle')} />
              </Typography>
              
              <Typography component="div">
                <RenderContent source={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/hands2.jpg`} alt={t('sections.0.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default track({
  prop6: "About the Boibank",
})(AboutPage)