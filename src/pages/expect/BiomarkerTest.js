import React, { useEffect } from 'react'
import { Box, Grid, Link, Typography, Stepper, Step, StepLabel, StepContent, Divider, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

import FAQs from '../../components/FAQ/FAQ_Wrapper'
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
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3)
    }
  },
  extraSpacing: {
    '& h3': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(5)
      }
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
  samples: {
    display: 'flex',
    '& > div': {
      maxWidth: 336,
    },

    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
      '& > div': {
        marginRight: theme.spacing(2),
        '&:last-child': {
          marginRight: 0
        }
      },
    },
    [theme.breakpoints.up('md')]: {
      '& > div': {
        marginRight: theme.spacing(6)
      }
    }
  },
  sampleTitle: {
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: theme.spacing(1),
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      margin: theme.spacing(1,0)
    }
  },
  faqs: {
    marginLeft: theme.spacing(-7),
    width: `calc(100% + ${theme.spacing(14)}px)`
  }
}))

const BiomarkerTest = (props) => {
  const {index, isMobile} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('testing')
  const { trackEvent } = useTracking()
  const faqs = i18n.getResourceBundle(i18n.languages[0],'testing').faqs

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Get your biomarker test",
    })
  },[trackEvent])
  
  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      stupidPaddingException
    >
      {/* Intro */}
      <Grid container>
        <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
          <Typography variant={isMobile ? "body1" : "body2"} component="div">
            <RenderContent source={t('intro_text')} />
          </Typography>

          <Typography className={classes.extraSpacing} component="div">
            <RenderContent source={t('sections.0.body')} />
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.gridItemImg}>
          <ArticleImage src="researchers-3.jpg" alt={t('sections.0.alt_text')} />
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      {/* How is the test performed? */}
      <Typography variant="h2" component="h2">
        <RenderContent source={t('sections.1.title')} />
      </Typography>
      <Typography component="div">
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
      <Grid container mt={2} spacing={2} className={classes.samples}>
        <Grid item xs={12} md={6}>
          <Paper>
            <img src={`/${process.env.PUBLIC_URL}assets/images/sampleReport/standard/solid-tumor-sample-test-report.jpg`} alt={t('sections.2.samples.0.alt_text')}
              srcSet={`
                /${process.env.PUBLIC_URL}assets/images/sampleReport/standard/solid-tumor-sample-test-report.jpg 1x,
                /${process.env.PUBLIC_URL}assets/images/sampleReport/HD/solid-tumor-sample-test-report.jpg 2x
              `}
            />
            <Divider />
            <Box p={2}>
              <Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.0.title')}</Typography>
              <Link href={`/${process.env.PUBLIC_URL}assets/documents/Biobank-Combined-Melanoma-Sample.pdf`} variant="button" rel="noopener noreferrer" target="_blank">{t('sections.2.samples.0.link')}</Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <img src={`/${process.env.PUBLIC_URL}assets/images/sampleReport/standard/blood-cancer-sample-test-report.jpg`} alt={t('sections.2.samples.1.alt_text')}
              srcSet={`
                /${process.env.PUBLIC_URL}assets/images/sampleReport/standard/blood-cancer-sample-test-report.jpg 1x,
                /${process.env.PUBLIC_URL}assets/images/sampleReport/HD/blood-cancer-sample-test-report.jpg 2x
              `}
            />
            <Divider />
            <Box p={2}>
              <Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.1.title')}</Typography>
              <Link href={`/${process.env.PUBLIC_URL}assets/documents/Acute-Myeloid-Leukemia-Sample.pdf`} variant="button" rel="noopener noreferrer" target="_blank">{t('sections.2.samples.1.link')}</Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      {/* Learn More */}
      <Box mb={5}>
        <Grid container className={classes.grid} spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Typography paragraph={true} variant="h2" component="h2">
              <RenderContent source={t('sections.3.title')} />
            </Typography>
            <div className={classes.linkList}>
              <Link href="https://www.cancer.gov/about-cancer/treatment/types/precision-medicine/tumor-dna-sequencing" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.0')}</Link>
              <Link href="https://www.genome.gov/dna-day/15-for-15/cancer-genomics" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.1')}</Link>
              <Link href="https://www.cancer.gov/contact" variant="button" rel="noopener noreferrer" target="_blank">{t('sections.3.links.2')}</Link>
            </div>
          </Grid>
          <Grid className={classes.gridItemImg} item xs={12} md={6}>
            <ArticleImage src="working-on-laptop.jpg" alt={t('sections.3.alt_text')} />
          </Grid>
        </Grid>
      </Box>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} className={classes.faqs} />

    </TabPanel>
  )
}
export default  BiomarkerTest