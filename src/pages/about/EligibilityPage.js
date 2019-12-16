import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'


import HospitalMap from '../../components/HospitalMap/HospitalMap'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
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

const EligibilityPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('eligibility')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Eligibility and locations",
    })
  },[trackEvent])

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1"><RenderContent source={t('pageTitle')} /></Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true}>
                <RenderContent source={t('introText')} />
              </Typography>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.0.title')} />
              </Typography>
              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent source={t('sections.0.subtitle')} />
              </Typography>
              <Typography component="div">
                <RenderContent source={t('sections.0.body.list')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="patient-1.jpg" alt={t('sections.0.alt_text')} />
            </Grid>

            <Divider className={classes.divider} />
            
            <Grid className={classes.gridItem} item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.1.title')} />
              </Typography>
              <Typography paragraph={true} variant="body2">
                <RenderContent source={t('sections.1.subtitle')} />
              </Typography>
              <Typography component="div">
              <RenderContent source={t('sections.1.body')} />
              </Typography>
            </Grid>
            <HospitalMap />

            <Divider className={classes.divider} />

            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.2.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent source={t('sections.2.body.text')} />
                <RenderContent source={t('sections.2.body.list')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="patient-and-nurse-1.jpg" alt={t('sections.2.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default EligibilityPage