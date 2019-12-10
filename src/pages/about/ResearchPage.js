import React, { useEffect } from 'react';
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import RenderContent from '../../components/utils/RenderContent'
import { useTracking } from 'react-tracking'

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

const ResearchPage = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('research')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Biobanks are important for research",
    })
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
              <Typography component="div">
                <RenderContent source={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/researchers1.jpg`} alt={t('sections.0.alt_text')} />
            </Grid>

            <Divider className={classes.divider} />

            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.1.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent source={t('sections.1.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/researchers3.jpg`} alt={t('sections.0.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
export default ResearchPage