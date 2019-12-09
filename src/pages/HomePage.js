import React, { useEffect, useState } from 'react'
import { navigate, Link as RouterLink } from '@reach/router'
import { useTranslation } from 'react-i18next'
import track, { useTracking } from 'react-tracking'

import { Box, Container, Dialog, DialogContent, Grid, IconButton, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@material-ui/icons'

import IconCardMedia from '../components/IconCardMedia/IconCardMedia'
import RenderContent from '../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  hero: {
    // backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-mobile.png), ${theme.gradients.primaryDiagonal}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "auto 100%",
    height: "400px",
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      height: "500px",
      alignItems: 'center',
    },
    [theme.breakpoints.up('md')]: {
      height: "700px",
      backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-desktop.png), ${theme.gradients.primaryDiagonal}`,
    }

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
  extraTopSpace: {
    marginTop: theme.spacing(4)
  },
  icon_link: {
    display: 'inline-flex'
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
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/woman-with-head-scarf.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 22%",
    backgroundSize: "cover",
    height: "40vw",
    maxHeight: 450
  },
  biobank: {
    backgroundImage: theme.gradients.primaryDiagonal
  },
  volunteer: {
    overflow: 'auto',
    paddingBottom: '112px',
    position: 'relative',
    background: `url(/${process.env.PUBLIC_URL}assets/images/soft-diamond-background-long.svg) no-repeat bottom center, ${theme.gradients.primaryDiagonal}`,
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
}))

const HomePage = (props) => {
  const classes = useStyles()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, i18n } = useTranslation('homePage')
  const { trackEvent } = useTracking()



  useEffect(() => {
    const resizeEvt = () => {
      setIsMobile(window.innerWidth < 600)
    }
    window.addEventListener('resize', resizeEvt, {passive: true})
    //clean up
    return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  },[isMobile])

  useEffect(() => {
    if(props.location && props.location.state) {
      const {accountClosed} = props.location.state
      if(accountClosed) {
        setIsModalOpen(true)
      }
    }
  }, [props.location])

  useEffect(() => {
    trackEvent({event:'pageview'})
    //trackEvent({linkName:'somewhere', eVar8:"Frank Ali", event:'custom'})
  },[trackEvent])

  const handleClose = () => {
    setIsModalOpen(false)
    navigate('/', {state:{}}, { replace: true })
  }

  return (
    <Box>
      <Container className={classes.hero}>
        <div className={classes.heroText}>
          {isMobile ? 
          <Paper className={classes.heroPaper}>
            <Typography className={classes.mainTitle} component="h1">
              <RenderContent source={t('hero.title')} />
            </Typography>
            <Typography variant="body1" component="h2">
              <RenderContent source={t('hero.subtitle_mobile')} />
            </Typography>
          </Paper>
          :
          <>
            <Typography className={classes.mainTitle} component="h1">
              <RenderContent source={t('hero.title')} />
            </Typography>
            <Typography variant="h2" component="h2">
              <RenderContent source={t('hero.subtitle')} />
            </Typography>
          </>
          }
        </div>
      </Container>
      <Container className={classes.blueGradientContainer}>
        <Box className={classes.infoBoxes}>
          <Paper className={classes.infoOffsetPaper}>
            <Box className={classes.infoBox}>
              <Typography className={classes.infoBoxTitle} variant="h2" component="h2">
                <RenderContent source={t('mission.title')} />
              </Typography>
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent source={t('mission.body')} />
              </Typography>
              <Typography variant="button" className={classes.extraTopSpace}>
                <Link to="/expect" className={classes.icon_link} component={RouterLink}>
                  <RenderContent source={t('mission.link')} />
                  <ArrowRightIcon />
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box className={classes.howItWorks}>
          <Box mt={isMobile ? 2 : 4} pb={isMobile ? 4 : 11}>
            <Typography className={classes.infoBox} variant={isMobile ? "h2" : "h1"} component="h2">
              <RenderContent source={t('how_it_works.title')} />
            </Typography>
            <Grid container className={classes.howItWorksGrid} spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} alt={t('how_it_works.cards.0.alt_text')} />
                <Typography><RenderContent source={t('how_it_works.cards.0.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/multiple-samples.svg`} alt={t('how_it_works.cards.1.alt_text')} />
                <Typography><RenderContent source={t('how_it_works.cards.1.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/one-idea.svg`} alt={t('how_it_works.cards.2.alt_text')} />
                <Typography><RenderContent source={t('how_it_works.cards.2.body')} /></Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/breakthrough.svg`} alt={t('how_it_works.cards.3.alt_text')} />
                <Typography><RenderContent source={t('how_it_works.cards.3.body')} /></Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Container className={classes.fullWidthAccentImage}>
        <Box>{/* empty box because Container must have children */}</Box>
      </Container>
      <Container className={classes.volunteer}>
        <Box>
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>
            <RenderContent source={t('participate.title')} />
          </Typography>
          <Typography paragraph={true} variant={isMobile ? "body1" : "body2"} className={classes.volunteerText}>
            <RenderContent source={t('participate.body')} />
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title={t('participate.cards.0.title')}
                desc={t('participate.cards.0.body')}
                link="/expect"
                linkText={t('participate.cards.0.link')}
                image="reviewing-test-results.jpg"
                imageTitle={t('participate.cards.0.alt_text')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title={t('participate.cards.1.title')}
                desc={t('participate.cards.1.body')}
                image="friends-and-family--sm.jpg"
                imageTitle={t('participate.cards.1.alt_text')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title={t('participate.cards.2.title')}
                desc={t('participate.cards.2.body')}
                link="/about/research"
                linkText={t('participate.cards.2.link')}
                image="test-tubes.jpg"
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
            <RenderContent source={t('modal.closed_account.title')} />
          </Typography>
          <Typography component="div">
            <RenderContent source={t('modal.closed_account.body')} />
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default track({
  pageName:'msbiobank.c.gov/',
  prop6: "Home Page",
  route: "/",
})(HomePage)