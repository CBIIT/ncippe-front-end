import React, { useEffect, useState } from 'react'
import { navigate, Link as RouterLink } from '@reach/router'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, Box, Button, Container, Dialog, DialogContent, Grid, IconButton, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@material-ui/icons'
import PubSub from 'pubsub-js'

import getAPI from '../data'
import { check_webp_feature } from '../utils/utils'
import IconCardMedia from '../components/IconCardMedia'
import RenderContent from '../components/utils/RenderContent'

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

const useStyles = makeStyles( theme => ({
  banner: {
    backgroundColor: '#FCECF1',
    border: '1px solid #F9DEE7',
    padding: theme.spacing(1,0),
    textAlign: 'center',
  },
  bannerText: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif'
  },
  banner_warning: {
    backgroundColor: '#fce2b5',
    border: '1px solid #FEB73C',
  },
  banner_info: {
    backgroundColor: '#E7F0FB',
    border: '1px solid #bdd9fc',
  },
  banner_success: {
    backgroundColor: '#E3FCF2',
    border: '1px solid #01C585',
  },
  hero: {
    // backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/mobile/hero-image-mobile.${extension}), ${theme.gradients.primaryDiagonal}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "auto 100%",
    height: "400px",
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      height: "500px",
      alignItems: 'center',
    },
    // mobile HD background
    '@media (min-resolution: 192dpi)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/mobileHD/hero-image-mobile.${extension}), ${theme.gradients.primaryDiagonal}`
    },
    // desktop background
    [theme.breakpoints.up('md')]: {
      height: "700px",
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/desktop/hero-image-desktop.${extension}), ${theme.gradients.primaryDiagonal}`,
    },
    // desktop HD background
    [`@media (min-width: ${theme.breakpoints.values.md}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero/desktopHD/hero-image-desktop.${extension}), ${theme.gradients.primaryDiagonal}`
    },

  },
  heroText: {
    wordBreak: 'break-word',
    marginTop: theme.spacing(2),
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      marginLeft: '6%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '12%',
      width: '50%'
    }
  },
  heroPaper: {
    padding: theme.spacing(2)
  },
  mainTitle: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '36px',
    letterSpacing: '-.47px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px',
      lineHeight: '62px',
      letterSpacing: '-.4px',
      '& sup': {
        fontSize: '40%',
      }
    },
    [theme.breakpoints.up('smLandscape')]: {
      fontSize: '62px',
      lineHeight: '74px',
      letterSpacing: '-.6px',
    },
  },
  blueGradientContainer: {
    backgroundImage: theme.gradients.blueReverse,
  },
  infoBoxOffset: {

  },
  infoBox: {
    width: '72%',
    margin: `${theme.spacing(3)}px auto`,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      margin: `${theme.spacing(5)}px auto`,
    },
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(6)}px auto`,
    },
  },
  infoBoxTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 22
    }
  },
  infoOffsetPaper: {
    position: 'relative',
    top: `-${theme.spacing(4)}px`,
    margin: `0 auto -${theme.spacing(4)}px`,
    [theme.breakpoints.up('sm')]: {
      width: '76%',
      top: `-${theme.spacing(6)}px`,
      margin: `0 auto -${theme.spacing(6)}px`,
    },
    [theme.breakpoints.up('md')]: {
      top: `-${theme.spacing(8)}px`,
      margin: `0 auto -${theme.spacing(8)}px`,
    },

    '& $infoBox': {
      width: '100%',
      padding: theme.spacing(2,3,4),
      color: theme.palette.navy.dark,
      margin: '0 auto',
      [theme.breakpoints.up('sm')]: {
        width: '80%',
        padding: theme.spacing(4,0),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6,0),
      },
    },
  },
  icon_link: {
    marginTop: theme.spacing(1)
  },
  howItWorksGrid: {
    '& > div': {
      textAlign: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0
      }
    },
    '& p': {
      width: '80%',
      margin: '0 auto',
      [theme.breakpoints.up('md')]: {
        width: '100%'
      }
    }
  },
  howItWorksIcon: {
    width: '100px',
    height: '100px'
  },
  fullWidthAccentImage: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/micro/woman-with-head-scarf.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 22%",
    backgroundSize: "cover",
    height: "40vw",
    maxHeight: 450,
    // mobile
    '@media (min-width: 380px)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/mobile/woman-with-head-scarf.jpg)`,
    },
    // micro HD
    '@media (min-resolution: 192dpi)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/tablet/woman-with-head-scarf.jpg), ${theme.gradients.primaryDiagonal}`
    },
    // mobile HD
    '@media (min-width: 380px) and (min-resolution: 192dpi)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/desktop/woman-with-head-scarf.jpg)`,
    },
    // tablet
    [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/tablet/woman-with-head-scarf.jpg)`,
    },
    // tablet HD
    [`@media (min-width: ${theme.breakpoints.values.sm}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/tabletHD/woman-with-head-scarf.jpg)`,
    },
    // desktop
    [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/desktop/woman-with-head-scarf.jpg)`,
    },
    // desktop HD
    [`@media (min-width: ${theme.breakpoints.values.md}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/desktopHD/woman-with-head-scarf.jpg)`,
    },

  },
  biobank: {
    backgroundImage: theme.gradients.primaryDiagonal
  },
  volunteer: {
    overflow: 'auto',
    paddingBottom: '112px',
    position: 'relative',
    background: `url(${process.env.PUBLIC_URL}/assets/images/soft-diamond-background-long.svg) no-repeat bottom center, ${theme.gradients.primaryDiagonal}`,
    '& h2': {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '208px',
    },    
    [theme.breakpoints.up('md')]: {   
      paddingBottom: '304px',
    },    
  },
  volunteerText: {
    width: '84%',
    textAlign: 'center',
    margin: `${theme.spacing(2)}px auto ${theme.spacing(5)}px`,
    [theme.breakpoints.up('sm')]: {
      width: '54%'
    },
  },
  boxListHeader: {
    backgroundImage: theme.gradients.primaryDiagonal,
    padding: theme.spacing(2,3)
  },
  boxListElement: {
    '& > li': {
      display: 'block',
      fontWeight: 'bold',
      borderTop: `1px solid ${theme.palette.grey[300]}`,
      padding: theme.spacing(1,3)
    }
  },
  boxListFooter: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2,3)
  },
  closeAccountDialog: {
    position: 'relative'
  },
  closeAccountDialogContent: {
    padding: theme.spacing(5),
    '&:first-child': {
      paddingTop: theme.spacing(5),
    }
  },
  closeDialogButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  closeAccountIcon: {
    fontSize: '6em',
    float: 'left',
    marginRight: theme.spacing(3),
    fill: theme.palette.success.main
  }
}),{name: 'HomePage'})
/**
 * Home Page for the app.
 * 
 */
const HomePage = () => {
  const classes = useStyles()
  // isMobile is used to toggle multiple responsive styles and component attributes. Easier than using mediaqueries for everything
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mediaCardPath, setMediaCardPath] = useState(`${process.env.PUBLIC_URL}/assets/images/mediaCard/standard/`)
  const { t, i18n } = useTranslation('homePage')
  const isHighResolution = useMediaQuery('@media (min-resolution: 192dpi)')
  const [accountClosed, setAccountClosed] = useState(localStorage.getItem('accountClosed'))
  const [alerts, setAlerts] = useState([])
  const [refreshAlerts, setRefreshAlerts] = useState(false)

  useEffect(() => {
    const resizeEvt = () => {
      setIsMobile(window.innerWidth < 600)
    }
    window.addEventListener('resize', resizeEvt, {passive: true})
    //clean up
    return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  },[isMobile])

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
      localStorage.clear('accountClosed')
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
        <Container key={i} className={`${classes.banner} ${classes['banner_' + alert.contentType]}`}>
          <Typography className={classes.bannerText} component="div">
            <strong><RenderContent children={alert.message[i18n.languages[0]]} /></strong>
          </Typography>
        </Container>
      )
      }

      <Container className={classes.hero}>
        <Box className={classes.heroText} component="section">
          {isMobile ? 
          <Paper className={classes.heroPaper} elevation={25}>
            <Typography className={classes.mainTitle} component="h1">
              <RenderContent children={t('hero.title')} />
            </Typography>
            <Typography variant="body1" component="h2">
              <RenderContent children={t('hero.subtitle_mobile')} />
            </Typography>
          </Paper>
          :
          <>
            <Typography className={classes.mainTitle} component="h1">
              <RenderContent children={t('hero.title')} />
            </Typography>
            <Typography variant="h2" component="h2">
              <RenderContent children={t('hero.subtitle')} />
            </Typography>
          </>
          }
        </Box>
      </Container>
      <Container className={classes.blueGradientContainer}>
        <Box className={classes.infoBoxes} component="section">
          <Paper className={classes.infoOffsetPaper} elevation={25}>
            <Box className={classes.infoBox}>
              <Typography className={classes.infoBoxTitle} variant="h2" component="h2">
                <RenderContent children={t('mission.title')} />
              </Typography>
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent children={t('mission.body')} />
              </Typography>
              <Button to="/expect/consent" color="primary" className={classes.icon_link} component={RouterLink}>
                <RenderContent children={t('mission.link')} />
                <ArrowRightIcon />
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box className={classes.howItWorks} component="section">
          <Box mt={isMobile ? 2 : 4} pb={isMobile ? 4 : 11}>
            <Typography className={classes.infoBox} variant={isMobile ? "h2" : "h1"} component="h2">
              <RenderContent children={t('how_it_works.title')} />
            </Typography>
            <Grid container className={classes.howItWorksGrid} spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`${process.env.PUBLIC_URL}/assets/icons/patients.svg`} alt={t('how_it_works.cards.0.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.0.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`${process.env.PUBLIC_URL}/assets/icons/multiple-samples.svg`} alt={t('how_it_works.cards.1.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.1.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`${process.env.PUBLIC_URL}/assets/icons/one-idea.svg`} alt={t('how_it_works.cards.2.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.2.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`${process.env.PUBLIC_URL}/assets/icons/breakthrough.svg`} alt={t('how_it_works.cards.3.alt_text')} />
                <Typography><RenderContent children={t('how_it_works.cards.3.body')} /></Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Container className={classes.fullWidthAccentImage}>
        <Box>{/* empty box because Container must have children */}</Box>
      </Container>
      <Container className={`${classes.volunteer} accentImage`}>
        {/* IE11 doesn't like svg background images, so drop it in as an accent image here */}
        {/* {isIE && <img className="accentImage--img" src={`${process.env.PUBLIC_URL}/assets/images/soft-diamond-background-long.svg`} alt="accent image" aria-hidden="true" />} */}
        <Box component="section">
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>
            <RenderContent children={t('participate.title')} />
          </Typography>
          <Typography paragraph={true} variant={isMobile ? "body1" : "body2"} className={classes.volunteerText}>
            <RenderContent children={t('participate.body')} />
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title={t('participate.cards.0.title')}
                desc={t('participate.cards.0.body')}
                link="/expect/testing"
                linkText={t('participate.cards.0.link')}
                image={`${mediaCardPath}reviewing-test-results.jpg`}
                imageTitle={t('participate.cards.0.alt_text')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title={t('participate.cards.1.title')}
                desc={t('participate.cards.1.body')}
                image={`${mediaCardPath}friends-and-family.jpg`}
                imageTitle={t('participate.cards.1.alt_text')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
        className={classes.closeAccountDialog}
      >
        <DialogContent className={classes.closeAccountDialogContent}>
          <IconButton className={classes.closeDialogButton} aria-label="close" onClick={handleClose}>
            <ClearIcon />
          </IconButton>
          <CheckCircleIcon className={classes.closeAccountIcon} />
          <Typography variant="h3" component="h3">
            <RenderContent children={t('modal.closed_account.title')} />
          </Typography>
          <Typography component="div">
            <RenderContent children={t('modal.closed_account.body')} />
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default HomePage
