import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Container, Divider, Grid, Link, Stepper, Step, StepLabel, StepContent, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  OpenInNew as OpenInNewIcon
} from '@material-ui/icons'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
// import { AuthContext } from '../../components/login/AuthContext'
import FAQs from '../../components/FAQ/FAQ_Wrapper'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  featureGridImage: {
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
  divider: {
    width: '100%',
    margin: theme.spacing(0,0,4),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3,0,7)
    }
  },
  tintedBox: {
    backgroundColor: theme.palette.primary.lightGrey
  },
  featureImage: {
    order: 1,
    marginTop: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      order: 0,
    }
  },
  featureLinks: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  screenshot: {
    maxWidth: 300
  },
  createAccountBtn: {
    margin: theme.spacing(4,0),
    padding: theme.spacing(1,4)
  },
  haveAccountBtn: {
    padding: theme.spacing(1,4),
    backgroundColor: theme.palette.common.white
  },
  stepper: {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'rgba(0, 0, 0, 0.38)'
    },
    '& .MuiStepContent-root': {
      width: '100%',
      maxWidth: 580,
      [theme.breakpoints.up('sm')]: {
        width: '74%'
      },
      [theme.breakpoints.up('md')]: {
        width: '64%'
      }
    }
  },
  cardContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(3,3,2,3),
    '@media (-ms-high-contrast:none)': {
      '& div': {
        width: 'calc(100% - 50px)'
      }
    }
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardIcon: {
    width: '100%',
    maxWidth: 50,
    height: 50,
  },
  cardText: {
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
    marginLeft: theme.spacing(3),
    height: '100%',
    justifyContent: 'space-between'
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& a': {
      display: 'inline-block',
      margin: theme.spacing(.5,0),
      '& svg': {
        marginBottom: -6
      }
    }
  }
}))

const ActivatePage = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('activate')
  const { trackEvent } = useTracking()
  // const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const faqs = i18n.getResourceBundle(i18n.languages[0],'activate').faqs
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Activate your online Biobank account",
      prop10: t("metaData.title")
    })
  },[trackEvent, t])

  const handleLogin = () => {
    trackEvent({
      prop53: `BioBank_Activate|Sign-In`,
      eVar53: `BioBank_Activate|Sign-In`,
      events: 'event26',
      eventName: 'Sign in'
    })
    window.location.assign(process.env.REACT_APP_LOGIN_LINK)
  }

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/participation/activate`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/participation/activate`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container>
        <Box mt={5} mb={4} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography variant={isMobile ? "body1" : "body2"} component="div">
                <RenderContent source={t('intro_text')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="father-and-daughter-view-tablet.jpg" alt={t('alt_text.0')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box className={classes.tintedBox} p={7} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid className={classes.featureImage} item xs={12} md={6}>
              <img className={classes.screenshot} src={`/${process.env.PUBLIC_URL}assets/images/login.gov.jpg`} alt={t('sections.0.alt_text')} width="300"
                srcSet={`
                  /${process.env.PUBLIC_URL}assets/images/misc/standard/login.gov.jpg 1x,
                  /${process.env.PUBLIC_URL}assets/images/misc/HD/login.gov.jpg 2x
                `}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2">
                <RenderContent source={t('sections.0.title')} />
              </Typography>
              <Box className={classes.featureLinks}>
                <Link href={`https://secure.login.gov/${i18n.language === 'es' ? 'es/':''}sign_up/enter_email?request_id=${process.env.REACT_APP_REQUEST_ID}`}><Button className={classes.createAccountBtn} variant="contained" color="primary">{t('sections.0.links.0')}</Button></Link>
                <br />
                {/* <Button className={classes.haveAccountBtn} variant="outlined" color="primary" onClick={handleLogin}>{t('sections.0.links.1')}</Button> */}
                <Button className={classes.haveAccountBtn} variant="outlined" color="primary" onClick={handleLogin}>{t('sections.0.links.1')}</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>

        {/* To create your login.gov account */}
        <Box component="section" mt={5}>
          <Typography variant="h2" component="h2">
            <RenderContent source={t('sections.1.title')} />
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
              <StepContent>{t('sections.1.stepper.2.description')}
                <ul>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/phone.svg`} alt={t('sections.1.security_options.0.alt_text')} aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">{t('sections.1.security_options.0.label')}</Typography>
                        <Typography>{t('sections.1.security_options.0.description')}</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/authentification-application.svg`} alt={t('sections.1.security_options.1.alt_text')} aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">{t('sections.1.security_options.1.label')}</Typography>
                        <Typography>{t('sections.1.security_options.1.description')}</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/security-key.svg`} alt={t('sections.1.security_options.2.alt_text')} aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">{t('sections.1.security_options.2.label')}</Typography>
                        <Typography>{t('sections.1.security_options.2.description')}</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                  <li>
                  <div className={classes.cardContent}>
                    <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/backup-codes.svg`} alt={t('sections.1.security_options.3.alt_text')} aria-hidden="true" />
                    <div className={classes.cardText}>
                      <div>
                        <Typography className={classes.cardTitle} component="h3">{t('sections.1.security_options.3.label')}</Typography>
                        <Typography>{t('sections.1.security_options.3.description')}</Typography>
                      </div>
                    </div>
                  </div>
                  </li>
                </ul>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>{t('sections.1.stepper.3.label')}</StepLabel>
              <StepContent>{t('sections.1.stepper.3.description')}</StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>{t('sections.1.stepper.4.label')}</StepLabel>
              <StepContent>{t('sections.1.stepper.4.description')}</StepContent>
            </Step>
          </Stepper>
          <Link href={`https://${process.env.REACT_APP_LOGIN_LINK}/sign_up/enter_email?request_id=${process.env.REACT_APP_REQUEST_ID}`}><Button className={classes.createAccountBtn} variant="contained" color="primary">{t('sections.1.link')}</Button></Link>
        </Box>

        <Divider className={classes.divider} />

        {/* More Information */}
        <Box mb={6} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent source={t('sections.2.title')} />
              </Typography>
              <div className={classes.linkList}>
                <Button href="https://login.gov/help/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.0')} <OpenInNewIcon /></Button>
                <Button href="https://login.gov/contact/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.1')} <OpenInNewIcon /></Button>
                <Button href="https://login.gov/help/creating-an-account/how-to-create-an-account/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.2')} <OpenInNewIcon /></Button>
              </div>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <img src={`/${process.env.PUBLIC_URL}assets/images/login.gov-logo.jpg`} alt={t('sections.2.alt_text')}
                srcSet={`
                /${process.env.PUBLIC_URL}assets/images/misc/standard/login.gov-logo.jpg 1x,
                /${process.env.PUBLIC_URL}assets/images/misc/HD/login.gov-logo.jpg 2x
              `}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} />

    </Box>
  )
}

export default ActivatePage