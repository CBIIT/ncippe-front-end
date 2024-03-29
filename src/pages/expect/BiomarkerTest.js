import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Container, Divider, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import FAQs from '../../components/FAQ_Group'
import TabAppBar from './AppBar'

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
    margin: theme.spacing(3,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7,0)
    }
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
    '& a': {
      margin: theme.spacing(.5,0),
    }
  },
  h3: {
    margin: theme.spacing(4,0,2)
  }
}),{name: 'BiomarkerTestPage'})

const BodyContent = () => {
  const classes = useStyles()
  const { t } = useTranslation('testing')
  return (
    <Typography className={classes.extraSpacing} component="div">
      <RenderContent children={t('sections.0.body')} />
    </Typography>
  )
}

const BiomarkerTest = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('testing')
  const faqs = i18n.getResourceBundle(i18n.languages[0],'testing').faqs
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const singleColumn = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: "Get your biomarker test",
      prop10: t("metaData.title")
    })
  },[t])
  
  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/expect/testing`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/expect/testing`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">{t('pageTitle')}</Typography>
      </Container>
      <TabAppBar value={2} />

      <Container>
        {/* Intro */}
        <Grid container component="section">
          <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
            <Typography variant={isMobile ? "body1" : "body2"} component="div">
              <RenderContent children={t('intro_text')} />
            </Typography>
            {!singleColumn && <BodyContent />}
          </Grid>
          <Grid item xs={12} md={6} lg={4} className={classes.gridItemImg} component="aside">
            <ArticleImage src="researchers-3.jpg" alt={t('sections.0.alt_text')} />
          </Grid>
          {singleColumn && <Grid item xs={12} md={6} lg={8} className={classes.textColumn}><BodyContent /></Grid>}
        </Grid>

        <Divider className={classes.divider} />

        {/* How is the test performed? */}
        <Box component="section">
          <Typography variant="h2" component="h2">
            <RenderContent children={t('sections.1.title')} />
          </Typography>
          <Typography component="div">
            <RenderContent children={t('sections.1.body')} />
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
        </Box>

        <Divider className={classes.divider} />

        {/* Sample Report */}
        <Box component="section">
          <Typography variant="h2" component="h2" paragraph={true}>
            <RenderContent children={t('sections.2.title')} />
          </Typography>

          {/* Solid tumor sample report and guide  */}
          <Typography variant="h3" component="h3" className={classes.h3}>
            <RenderContent children={t('sections.2.subtitle.0')} />
          </Typography>
          <Grid container mt={2} spacing={2} className={classes.samples}>
            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
								<Box p={2}>
									<Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.0.title')}</Typography>
								</Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--solid-tumor.jpg`} alt={t('sections.2.samples.0.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--solid-tumor.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/sample-test-report--solid-tumor.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biobank-Combined-Melanoma-Sample.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.0.title_aria')}>{t('sections.2.samples.0.link')}</Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
								<Box p={2}>
									<Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.1.title')}</Typography>
								</Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--solid-tumor.jpg`} alt={t('sections.2.samples.1.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--solid-tumor.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/test-guide--solid-tumor.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--Solid-Tumor.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.1.title_aria')}>{t('sections.2.samples.1.link')}</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* AML sample report and guide  */}
          <Typography variant="h3" component="h3" className={classes.h3}>
            <RenderContent children={t('sections.2.subtitle.2')} />
          </Typography>
          <Grid container mt={2} spacing={2} className={classes.samples}>
            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
								<Box p={2}>
									<Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.4.title')}</Typography>
								</Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--aml.jpg`} alt={t('sections.2.samples.4.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--aml.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/sample-test-report--aml.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Sample-Report--AML.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.4.title_aria')}>{t('sections.2.samples.4.link')}</Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
								<Box p={2}>
									<Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.5.title')}</Typography>
								</Box>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--aml.jpg`} alt={t('sections.2.samples.5.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--aml.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/test-guide--aml.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--AML.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.5.title_aria')}>{t('sections.2.samples.5.link')}</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Blood cancer sample report and guide - pending from NCI */}
          {/* <Typography variant="h3" component="h3" className={classes.h3}>
            <RenderContent children={t('sections.2.subtitle.1')} />
          </Typography>
          <Grid container mt={2} spacing={2} className={classes.samples}>
            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--blood-cancer.jpg`} alt={t('sections.2.samples.2.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/sample-test-report--blood-cancer.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/sample-test-report--blood-cancer.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.2.title')}</Typography>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Ashion-GEM-ExTra-AML-Sample.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.2.aria_label')}>{t('sections.2.samples.2.link')}</Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={25}>
                <img src={`${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--blood-cancer.jpg`} alt={t('sections.2.samples.3.alt_text')}
                  srcSet={`
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/standard/test-guide--blood-cancer.jpg 1x,
                    ${process.env.PUBLIC_URL}/assets/images/sampleReport/HD/test-guide--blood-cancer.jpg 2x
                  `}
                />
                <Divider />
                <Box p={2}>
                  <Typography variant="h3" component="h3" className={classes.sampleTitle}>{t('sections.2.samples.3.title')}</Typography>
                  <Button href={`${process.env.PUBLIC_URL}/assets/documents/Biomarker-Test-Guide--Blood-Cancer.pdf`} color="primary" rel="noopener noreferrer" target="_blank" aria-label={t('sections.2.samples.3.aria_label')}>{t('sections.2.samples.3.link')}</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid> */}
        </Box>

        <Divider className={classes.divider} />

        {/* Learn More */}
        <Box mb={5} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.3.title')} />
              </Typography>
              <ul className={classes.linkList}>
                <li><Button href="https://www.cancer.gov/about-cancer/treatment/types/precision-medicine/tumor-dna-sequencing" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.3.links.0')}</Button></li>
                <li><Button href="https://www.genome.gov/dna-day/15-for-15/cancer-genomics" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.3.links.1')}</Button></li>
                <li><Button href="https://www.cancer.gov/contact" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.3.links.2')}</Button></li>
              </ul>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="working-on-laptop.jpg" alt={t('sections.3.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} className={classes.faqs} />

    </Box>
  )
}
export default  BiomarkerTest
