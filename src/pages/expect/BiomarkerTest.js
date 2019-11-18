import React from 'react'
import { Box, Grid, Link, Typography, Stepper, Step, StepLabel, StepContent, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import RenderContent from '../../components/utils/RenderContent'

import TabPanel from '../../components/Tabs/TabPanel'

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
  },
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  imgColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  bottomSpacer: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },
  extraSpacing: {
    '& h3': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(5)
      }
    }
  },
  img: {
    display: 'block',
    maxWidth: 410,
    '&:first-of-type': {
      marginBottom: theme.spacing(5)
    }
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  },
  stepper: {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      margin: theme.spacing(1,0)
    }
  }
}))

const BiomarkerTest = (props) => {
  const {index, isMobile} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('testing')

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {/* Intro */}
      <Grid container>
        <Grid item xs={12} sm={6} lg={8} className={classes.textColumn}>
          <Typography variant={isMobile ? "body1" : "body2"}>
            <RenderContent source={t('intro_text')} />
          </Typography>

          <Typography className={classes.extraSpacing}>
            <RenderContent source={t('sections.0.body')} />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.imgColumn}>
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/researchers4.jpg`} alt={t('sections.0.alt_text')} height="360" />
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      {/* How is the test performed? */}
      <Typography variant="h2" component="h2">
        <RenderContent source={t('sections.1.title')} />
      </Typography>
      <Typography>
        <RenderContent source={t('sections.1.body')} />
      </Typography>
      <Stepper className={classes.stepper} orientation="vertical" nonLinear>
        <Step active={true}>
          <StepLabel>{t('sections.1.stepper.0.label')}</StepLabel>
          <StepContent>{t('sections.1.stepper.0.description')}</StepContent>
        </Step>
        <Step active={true}>
          <StepLabel>{t('sections.1.stepper.1.label')}</StepLabel>
          <StepContent>{t('sections.1.stepper.1.description')}</StepContent>
        </Step>
        <Step active={true}>
          <StepLabel>{t('sections.1.stepper.2.label')}</StepLabel>
          <StepContent>{t('sections.1.stepper.2.description')}</StepContent>
        </Step>
      </Stepper>
      <Divider className={classes.divider} />

      {/* Sample Report */}
      <Typography variant="h2" component="h2">
        <RenderContent source={t('sections.2.title')} />
      </Typography>

      <Divider className={classes.divider} />

      {/* Learn More */}
      <Box mb={5}>
        <Grid container className={classes.grid} spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Typography paragraph={true} variant="h2" component="h2">
              <RenderContent source={t('sections.3.title')} />
            </Typography>
            <div className={classes.linkList}>
              <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.0')}</Link>
              <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.1')}</Link>
              <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.2')}</Link>
            </div>
          </Grid>
          <Grid className={classes.gridItemImg} item xs={12} md={6}>
            <img src={`/${process.env.PUBLIC_URL}assets/images/working-on-laptop.jpg`} alt={t('sections.4.alt_text')} />
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  )
}

export default BiomarkerTest