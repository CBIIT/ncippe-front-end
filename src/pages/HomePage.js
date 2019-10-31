import React, { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { Box, Container, Dialog, DialogContent, Grid, IconButton, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon
} from '@material-ui/icons'

import IconCardMedia from '../components/IconCardMedia/IconCardMedia'

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
            <Typography className={classes.mainTitle} component="h1">The Cancer Moonshot<sup>SM</sup> Biobank</Typography>
            <Typography variant="body1" component="h2">Help change the future of cancer treatment.</Typography>
          </Paper>
          :
          <>
            <Typography className={classes.mainTitle} component="h1">The Cancer Moonshot<sup>SM</sup> Biobank</Typography>
            <Typography variant="h2" component="h2">Help change the future <br /> of cancer treatment.</Typography>
          </>
          }
        </div>
      </Container>
      <Container className={classes.blueGradientContainer}>
        <Box className={classes.infoBoxes}>
          <Paper className={classes.infoOffsetPaper}>
            <Box className={classes.infoBox}>
              <Typography className={classes.infoBoxTitle} variant="h2" component="h2">Our Mission</Typography>
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>The Cancer Moonshot<sup>SM</sup> Biobank is a 5-year project to learn more about cancer with the help of participants who donate samples as they receive treatment.</Typography>
              <Typography variant="button" component="div" className={classes.extraTopSpace}><Link to="/expect">What to expect if you participate ></Link></Typography>
            </Box>
          </Paper>
        </Box>
        <Box className={classes.howItWorks}>
          <Box mt={isMobile ? 2 : 4} pb={isMobile ? 4 : 11}>
            <Typography className={classes.infoBox} variant={isMobile ? "h2" : "h1"} component="h2">How it works</Typography>
            <Grid container className={classes.howItWorksGrid} spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} alt="patient icon" />
                <Typography>People with cancer donate blood and tissue samples during their treatment, for up to 5 years.</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/multiple-samples.svg`} alt="multiple test tubes icon" />
                <Typography>The Biobank receives the samples and sends them to researchers.</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/one-idea.svg`} alt="lightbulb icon" />
                <Typography>Researchers develop ideas to test on many different samples and advance their understanding of cancer.</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/breakthrough.svg`} alt="breakthrough icon" />
                <Typography>Researchers work to find discoveries that improve cancer treatments and increase survival.</Typography>
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
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>Why should I participate?</Typography>
          <Typography paragraph={true} variant={isMobile ? "body1" : "body2"} className={classes.volunteerText}>By joining the Biobank, you will be a part of the discovery of new cancer therapies, helping patients everywhere.</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title="Biomarker tests tell you more about your cancer."
                desc="Participants get a biomarker test, which can help your doctor find new treatments or clinical trials specific to your individual cancer. There is no charge for the test."
                link="/expect"
                linkText="Learn about biomarker tests"
                image="reviewing-test-results.jpg"
                imageTitle="doctor reviewing information with partient"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title="Diverse populations are important for research."
                desc="Cancer treatments don't work the same way for everyone&mdash;samples from many different communities will help researchers understand why this is and how to improve cancer care."
                image="friends-and-family--sm.jpg"
                imageTitle="friends and family"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconCardMedia
                title="Together we can advance our understanding of cancer."
                desc="By collecting samples over time, researchers can observe how cancer changes and how to stop it from growing and spreading."
                link="/about/research"
                linkText="Learn about research"
                image="test-tubes.jpg"
                imageTitle="test tubes"
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
          <Typography variant="h3" component="h3">Your account is closed.</Typography>
          <Typography>Please contact your clinical research coordinator if you have any questions.</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default HomePage