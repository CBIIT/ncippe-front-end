import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Container, Divider, Grid, Link, Stepper, Step, StepLabel, StepContent, Typography, useMediaQuery } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles';

import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
// import { AuthContext } from '../../components/login/AuthContext'
import FAQs from '../../components/FAQ_Group'
const CardContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
}));

const StyledCardIcon =  styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 50,
  height: 50,
}));

const StyledCardText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(3),
  height: '100%',
  justifyContent: 'space-between',
}));

const StyledCardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledGridItemImg = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  '& img': {
    maxWidth: 600,
    [theme.breakpoints.up('md')]: {
      maxWidth: 380,
    },
  },
}));

const ActivatePage = () => {
  const { t, i18n } = useTranslation('activate')
  // const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const faqs = i18n.getResourceBundle(i18n.languages[0],'activate').faqs
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
console.log('faqs',faqs)
  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Activate your online Biobank account',
      prop10: t('metaData.title'),
    })
  },[t])

  const handleLogin = () => {
    PubSub.publish('ANALYTICS', {
      eventName: 'sign in',
      events: 'event26',
      prop53: `BioBank_Activate|Sign-In`,
      eVar53: `BioBank_Activate|Sign-In`,
    })
    window.location.assign(process.env.REACT_APP_LOGIN_LINK)
  }

  return (
    <Box component="article">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/participation/activate`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/participation/activate`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <Container>
        <Box mt={5} mb={4} component="section">
          <Grid container sx={{ justifyContent: 'flex-start' }} spacing={2} alignItems="stretch">
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography variant={isMobile ? "body1" : "body2"} component="div">
                <RenderContent children={t('intro_text')} />
              </Typography>
            </Grid>
            <StyledGridItemImg  item size={{ xs:12, md:6 }}  component="aside">
              <ArticleImage src="father-and-daughter-view-tablet.jpg" alt={t('alt_text.0')} />
            </StyledGridItemImg>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box sx={{  bgcolor:theme => theme.palette.primary.lightGrey }} p={7} component="section">
          <Grid container sx={{ justifyContent: 'flex-start' }} spacing={2} alignItems="stretch">
          <Grid
            sx={{ 
              textAlign: 'center',  order: { xs: 1, md: 0 }, mt: { xs: 2, md: 0 },  }}
            size={{
              xs: 12,
              md: 6
            }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/images/login.gov.jpg`}
              alt={t('sections.0.alt_text')}
              width="300"
              srcSet={`
                ${process.env.PUBLIC_URL}/assets/images/misc/standard/login.gov.jpg 1x,
                ${process.env.PUBLIC_URL}/assets/images/misc/HD/login.gov.jpg 2x
              `}
              sx={{ maxWidth: 300 }}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography variant="h2" component="h2">
                <RenderContent children={t('sections.0.title')} />
              </Typography>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Link href={`https://secure.login.gov/${i18n.language === 'es' ? 'es/':''}sign_up/enter_email?request_id${process.env.REACT_APP_REQUEST_ID}/`}>
                  <Button sx={{
                        my: 4, // marginY: theme.spacing(4)
                        mx: 0, // optional, explicit marginX if needed
                        py: 1, // paddingY: theme.spacing(1)
                        px: 4  // paddingX: theme.spacing(4)
                      }} variant="contained" color="primary">{t('sections.0.links.0')}
                  </Button>
                </Link>
                <br />
                {/* <Button className={classes.haveAccountBtn} variant="outlined" color="primary" onClick={handleLogin}>{t('sections.0.links.1')}</Button> */}
                <Button variant="outlined" color="primary" onClick={handleLogin} sx={{
                    px: 4, // theme.spacing(4)
                    py: 1, // theme.spacing(1)
                    backgroundColor: 'common.white' }} >
                  {t('sections.0.links.1')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>

        {/* To create your login.gov account */}
        <Box component="section" mt={5}>
          <Typography variant="h2" component="h2">
            <RenderContent children={t('sections.1.title')} />
          </Typography>
          <Stepper sx={{ }} orientation="vertical" nonLinear>
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
                  <CardContentBox>  
                    <StyledCardIcon>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/phone.svg`} alt={t('sections.1.security_options.0.alt_text')} aria-hidden="true" />
                      </StyledCardIcon>     
                    <StyledCardText >
                      <div>
                        <StyledCardTitle  component="h3">{t('sections.1.security_options.0.label')}</StyledCardTitle>
                        <Typography>{t('sections.1.security_options.0.description')}</Typography>
                      </div>
                    </StyledCardText>
                  </CardContentBox>
                  </li>
                  <li>
                  <CardContentBox>
                    <StyledCardIcon>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/authentification-application.svg`} alt={t('sections.1.security_options.1.alt_text')} aria-hidden="true" />
                    </StyledCardIcon>
                    <StyledCardText >
                      <div>
                        <StyledCardTitle component="h3">{t('sections.1.security_options.1.label')}</StyledCardTitle>
                        <Typography>{t('sections.1.security_options.1.description')}</Typography>
                      </div>
                    </StyledCardText>
                  </CardContentBox>
                  </li>
                  <li>
                  <CardContentBox>
                    <StyledCardIcon>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/security-key.svg`} alt={t('sections.1.security_options.2.alt_text')} aria-hidden="true" />
                    </StyledCardIcon>
                    <StyledCardText >
                      <div>
                        <StyledCardTitle component="h3">{t('sections.1.security_options.2.label')}</StyledCardTitle>
                        <Typography>{t('sections.1.security_options.2.description')}</Typography>
                      </div>
                    </StyledCardText>
                  </CardContentBox>
                  </li>
                  <li>
                  <CardContentBox>
                    <StyledCardIcon>
                    <img src={`${process.env.PUBLIC_URL}/assets/icons/backup-codes.svg`} alt={t('sections.1.security_options.3.alt_text')} aria-hidden="true" />
                    </StyledCardIcon>
                    <StyledCardText >
                      <div>
                        <StyledCardTitle component="h3">{t('sections.1.security_options.3.label')}</StyledCardTitle>
                        <Typography>{t('sections.1.security_options.3.description')}</Typography>
                      </div>
                    </StyledCardText>
                  </CardContentBox>
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
          <Link href={`https://secure.login.gov/${i18n.language === 'es' ? 'es/':''}sign_up/enter_email?request_id=${process.env.REACT_APP_REQUEST_ID}`}>
            <Button sx={{
                my: 4, // marginY: theme.spacing(4)
                mx: 0, // optional, explicit marginX if needed
                py: 1, // paddingY: theme.spacing(1)
                px: 4  // paddingX: theme.spacing(4)
              }} variant="contained" color="primary">{t('sections.1.link')}
            </Button>
          </Link>
        </Box>

        <Divider sx={{ width: '100%', my: 4, [theme.breakpoints.up('md')]: { my: 7 } }} />

        {/* More Information */}
        <Box mb={6} component="section">
          <Grid container sx={{ justifyContent: 'flex-start' }} spacing={2} alignItems="stretch">
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.2.title')} />
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', '& a': { display: 'inline-block', my: 0.5 } }}>
                <Button href="https://login.gov/help/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.0')}</Button>
                <Button href="https://login.gov/contact/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.1')}</Button>
                <Button href="https://login.gov/help/creating-an-account/how-to-create-an-account/" color="primary" rel="noopener noreferrer" target="_blank">{t('sections.2.links.2')}</Button>
              </Box>
            </Grid>
            <StyledGridItemImg  item size={{xs:12, md:6 }}  component="aside">
              <img src={`${process.env.PUBLIC_URL}/assets/images/login.gov-logo.jpg`} alt={t('sections.2.alt_text')} style={{ width: '100%', height: '100%' }}
                srcSet={`
                ${process.env.PUBLIC_URL}/assets/images/misc/standard/login.gov-logo.jpg 1x,
                ${process.env.PUBLIC_URL}/assets/images/misc/HD/login.gov-logo.jpg 2x
              `}
              />
            </StyledGridItemImg>
          </Grid>
        </Box>
      </Container>
      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} />
    </Box>
  );
}

export default ActivatePage