import React, { useEffect, useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Box, Button, Container, Dialog, DialogContent, Grid, IconButton, Paper, Typography, useTheme } from '@mui/material'
import { 
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material'
import PubSub from 'pubsub-js'
import getAPI from '../data'
import { check_webp_feature } from '../utils/utils'
import IconCardMedia from '../components/IconCardMedia'
import RenderContent from '../components/utils/RenderContent'
import { bannerBaseSx,bannerTextSx, bannerVariantsSx,biobankSx, blueGradientContainerSx, cardTitleSx,cardTextSx,
  createAccountBtnSx, closeAccountDialogSx, featureLinksSx,
  haveAccountBtnSx,heroTextSx,howItWorksGridSx, howItWorksIconSx, infoBoxSx,infoBoxTitleSx, 
  infoOffsetPaperSx, mainTitleSx, stepperSx, 
  volunteerSx, volunteerTextSx,
  closeAccountDialogContentSx,
  closeAccountIconSx,
  closeDialogButtonSx,
  fullWidthAccentImageSx} from '../theme/homePageStyles'


// Internet Explorer 6-11
// const isIE = /*@cc_on!@*/false || !!document.documentMode;

let extension = 'png'

// only using webp for the homepage hero since it's extra large and requires alpha transparency. webp is 80% smaller than png
check_webp_feature('alpha', (feature, isSupported) => {
  if (isSupported) {
    // webp is supported, 
    extension = 'webp'
  }
})

/**
 * Home Page for the app.
 * 
 */
const HomePage = () => {
  const theme = useTheme()
  // isMobile is used to toggle multiple responsive styles and component attributes. Easier than using mediaqueries for everything
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isHighResolution = useMediaQuery('@media (min-resolution: 192dpi)');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mediaCardPath, setMediaCardPath] = useState(`${process.env.PUBLIC_URL}/assets/images/mediaCard/standard/`)
  const { t, i18n } = useTranslation('homePage')
  const [accountClosed, setAccountClosed] = useState(localStorage.getItem('accountClosed'))
  const [alerts, setAlerts] = useState([])
  const [refreshAlerts, setRefreshAlerts] = useState(false)
  const navigate = useNavigate()
  const heroSx = theme => ({
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/mobile/hero-image-mobile.${extension}), ${theme.gradients.primaryDiagonal}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundSize: 'auto 100%',
    display: 'flex',
    height: { xs: '400px', sm: '500px', md: '700px' },
    alignItems: { sm: 'center', },
    '@media (min-resolution: 192dpi)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/mobileHD/hero-image-mobile.${extension}), ${theme.gradients.primaryDiagonal}`,
    },
    [theme.breakpoints.up('md')]: {
      height: '700px',
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/desktop/hero-image-desktop.${extension}), ${theme.gradients.primaryDiagonal}`,
    },
    [`@media (min-width: ${theme.breakpoints.values.md}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/desktopHD/hero-image-desktop.${extension}), ${theme.gradients.primaryDiagonal}`,
    },
  });

  // useEffect(() => {
  //   const resizeEvt = () => {
  //     setIsMobile(window.innerWidth < 600)
  //   }
  //   window.addEventListener('resize', resizeEvt, {passive: true})
  //   //clean up
  //   return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  // },[isMobile])

  useEffect(() => {
    // upgrade image to HD, no need to downgrade if not highResolution
    if(isHighResolution) {
      setMediaCardPath(`${process.env.PUBLIC_URL}/assets/images/mediaCard/HD/`)
    }
  }, [isHighResolution])

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Home Page',
      prop10: t('metaData.title'),
      pageName:'msbiobank.c.gov/',
    })
  },[t])

  /* 
    If a user has just closed their account then a modal will be triggered to confirm their account was closed. 
    This occurs after a forced logout and redirection to HomePage
  */
  useEffect(() => {
    if(localStorage.getItem('accountClosed')){
      localStorage.removeItem('accountClosed')
      setAccountClosed(false)
      setIsModalOpen(true)
    }
  }, [accountClosed])

  /* check if there are any system alerts to be retrieved */
  /* TODO:
    - check for local variable that will cache system alerts - is this overkill?
    - set system alert timestamp - configurable - 1 hour
    - short circuit api calls else
    - use api to check for alerts
    - store local flag that alerts were retrieved within config window
    - filter out alerts that have expired
  */
  useEffect(() => {
    // get the datestamp alerts were last fetched
    const alertsLastFetched = localStorage.getItem('alertsLastFetched')
    // get new alerts if time interval has passed
    if(alertsLastFetched){
      const refreshTime = 1 // time in hours
      const time = Date.now()
      const gap = (time - alertsLastFetched)/(1000 * 60 * 60) // time in hours
      if(gap > refreshTime) {
        // getAlerts by triggering a state variable
        return setRefreshAlerts(true)
      }
      // if alerts are still fresh then pull them from localStorage
      const alerts = JSON.parse(localStorage.getItem('alerts'))
      setAlerts(alerts)
    } else {
      // if alerts have never been fetched then now's the time
      setRefreshAlerts(true)
    }
  }, [])
  useEffect(() => {
    if(refreshAlerts){
      getAPI.then(api => {
        api.getAlerts().then(resp => {
          if(resp instanceof Error) {
            throw resp
          }
          // filter out any expired alerts, keeping those that have no expirationDate
          const filteredAlerts = resp.filter(alert => alert.expirationDate == null || Date.now() < alert.expirationDate)
          localStorage.setItem('alertsLastFetched', Date.now())
          localStorage.setItem('alerts', JSON.stringify(filteredAlerts))
          setAlerts(filteredAlerts)
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [refreshAlerts])

  const handleClose = () => {
    setIsModalOpen(false)
    navigate('/', {state:{}}, { replace: true })
  }

  return (
    <Box>
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}`} />
      </Helmet>
      {
      alerts.map((alert,i) => 
        <Container key={i}   sx={{
          textAlign: 'center',
          fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
          py: 1,
          ...(alert.contentType === 'warning' && {
            backgroundColor: '#fce2b5',
            border: '1px solid #FEB73C',
          }),
          ...(alert.contentType === 'info' && {
            backgroundColor: '#E7F0FB',
            border: '1px solid #bdd9fc',
          }),
          ...(alert.contentType === 'success' && {
            backgroundColor: '#E3FCF2',
            border: '1px solid #01C585',
          }),
          ...(alert.contentType !== 'warning' &&
            alert.contentType !== 'info' &&
            alert.contentType !== 'success' && {
              backgroundColor: '#FCECF1',
              border: '1px solid #F9DEE7',
            }),
        }}>
          <Typography sx={bannerTextSx} component="div">
            <strong><RenderContent children={alert.message[i18n.languages[0]]} /></strong>
          </Typography>
      
        </Container>
      )
      }
       {/* Hero  Section */}
      <Container sx={ heroSx(theme) } >      
        <Box sx={{   wordBreak: 'break-word',
            mt: 2,
            width: { xs: '60%', sm: '60%', md: '50%' },
            ml: { sm: '6%', md: '12%' }, }} >
          {isMobile ? 
          <Paper sx={{ p:2 }} elevation={25}>
            <Typography sx={mainTitleSx} component="h1">
              <RenderContent children={t('hero.title')} />
            </Typography>
            <Typography variant="body1" component="h2">
              <RenderContent children={t('hero.subtitle_mobile')} />
            </Typography>
          </Paper>
          :
          <>
            <Typography sx={mainTitleSx} component="h1">
              <RenderContent children={t('hero.title')} />
            </Typography>
            <Typography variant="h2" component="h2">
              <RenderContent children={t('hero.subtitle')} />
            </Typography>
          </>
          }
        </Box>
      </Container>

       {/* Mission Section */}
       
      <Container sx={blueGradientContainerSx(theme)}>
        <Box component="section">
          <Paper sx={infoOffsetPaperSx(theme)} elevation={25}>
            <Box sx={(infoBoxSx(theme))}>
              <Typography sx={infoBoxTitleSx} variant="h2" component="h2">
                <RenderContent children={t('mission.title')} />
              </Typography>
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent children={t('mission.body')} />
              </Typography>
              <Button to="/expect/consent" color="primary" sx={{ mt: 1 }} component={RouterLink}>
                <RenderContent children={t('mission.link')} />
                <ArrowRightIcon />
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box sx={howItWorksGridSx} component="section">
          <Box mt={isMobile ? 2 : 4} pb={isMobile ? 4 : 11}>
            <Typography sx={infoBoxSx} variant={isMobile ? "h2" : "h1"} component="h2">
              <RenderContent children={t('how_it_works.title')} />
            </Typography>
            <Grid container sx={howItWorksGridSx} spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3
                }}>
              <Box component="img" sx={ howItWorksIconSx} src={`${process.env.PUBLIC_URL}/assets/icons/patients.svg`} alt={t('how_it_works.cards.0.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.0.body')} /></Typography>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3
                }}>
              <Box component="img" sx={ howItWorksIconSx} src={`${process.env.PUBLIC_URL}/assets/icons/multiple-samples.svg`} alt={t('how_it_works.cards.1.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.1.body')} /></Typography>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3
                }}>
              <Box component="img" sx={ howItWorksIconSx} src={`${process.env.PUBLIC_URL}/assets/icons/one-idea.svg`} alt={t('how_it_works.cards.2.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.2.body')} /></Typography>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3
                }}>
              <Box component="img" sx={ howItWorksIconSx} src={`${process.env.PUBLIC_URL}/assets/icons/breakthrough.svg`} alt={t('how_it_works.cards.3.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.3.body')} /></Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Container sx={fullWidthAccentImageSx}>
        <Box>{/* empty box because Container must have children */}</Box>
      </Container>
      <Container sx={volunteerSx(theme)} className='accentImage'>
        {/* IE11 doesn't like svg background images, so drop it in as an accent image here */}
        {/* {isIE && <img className="accentImage--img" src={`${process.env.PUBLIC_URL}/assets/images/soft-diamond-background-long.svg`} alt="accent image" aria-hidden="true" />} */}
        <Box component="section">
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" sx={infoBoxSx}>
            <RenderContent children={t('participate.title')} />
          </Typography>
          <Typography paragraph={true} variant={isMobile ? "body1" : "body2"} sx={volunteerTextSx(theme)}>
            <RenderContent children={t('participate.body')} />
          </Typography>
          <Grid container size={{ xs: 12, sm: 12, md: 12 }} spacing={3}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}>
              <IconCardMedia
                title={t('participate.cards.0.title')}
                desc={t('participate.cards.0.body')}
                link="/expect/testing"
                linkText={t('participate.cards.0.link')}
                image={`${mediaCardPath}reviewing-test-results.jpg`}
                imageTitle={t('participate.cards.0.alt_text')}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}>
              <IconCardMedia
                title={t('participate.cards.1.title')}
                desc={t('participate.cards.1.body')}
                image={`${mediaCardPath}friends-and-family.jpg`}
                imageTitle={t('participate.cards.1.alt_text')}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}>
              <IconCardMedia
                title={t('participate.cards.2.title')}
                desc={t('participate.cards.2.body')}
                link="/research"
                linkText={t('participate.cards.2.link')}
                image={`${mediaCardPath}researcher-examines-slide.jpg`}
                imageTitle={t('participate.cards.2.alt_text')}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={closeAccountDialogSx}
      >
        <DialogContent sx={closeAccountDialogContentSx}>
          <IconButton
            sx={closeDialogButtonSx}
            aria-label="close"
            onClick={handleClose}
            size="large">
            <ClearIcon />
          </IconButton>
          <CheckCircleIcon className={closeAccountIconSx} />
          <Typography variant="h3" component="h3">
            <RenderContent children={t('modal.closed_account.title')} />
          </Typography>
          <Typography component="div">
            <RenderContent children={t('modal.closed_account.body')} />
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage
