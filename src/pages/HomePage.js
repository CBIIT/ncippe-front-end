import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import IconCardMedia from '../components/IconCardMedia/IconCardMedia'

const useStyles = makeStyles( theme => ({
  hero: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-mobile.png)`,
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
      backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-desktop.png)`,
    }

  },
  heroText: {
    wordBreak: 'break-word',
    marginTop: theme.spacing(2),
    width: '56%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      marginLeft: '6%',
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '12%',
      width: '50%'
    }
  },
  heroPaper: {
    padding: theme.spacing(3)
  },
  mainTitle: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '28px',
    lineHeight: '40px',
    letterSpacing: '-.27px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '62px',
      lineHeight: '74px',
      letterSpacing: '-.6px',
    }
  },
  bold: {
    fontWeight: 'bold'
  },
  missionStatement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px auto',
    [theme.breakpoints.up('sm')]: {
      margin: '75px auto'
    },
    [theme.breakpoints.up('md')]: {
      margin: '100px auto'
    }
  },
  missionStatementText: {
    width: '84%',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '74%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '54%',
    },
  },
  accentImage: {
    display: "block",
  },
  infoBoxes: {
    padding: 0,
    '& $accentImage': {
      height: '40vw',
      maxHeight: '490px',
      minHeight: '175px',
      padding: 0,
      backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/friends-and-family.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 22%",
      backgroundSize: "cover",
      zIndex: -1
    },
    
  },
  infoBoxList: {
    backgroundImage: theme.gradients.blue,
    position: 'relative'
  },
  infoBoxOffset: {
    position: 'relative',
    top: `-${theme.spacing(4)}px`,
    [theme.breakpoints.up('sm')]: {
      top: `-${theme.spacing(6)}px`,
    },
    [theme.breakpoints.up('md')]: {
      top: `-${theme.spacing(9)}px`,
    },
  },
  infoBox: {
    width: '72%',
    margin: `${theme.spacing(3)}px auto`,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      margin: `${theme.spacing(4)}px auto`,
    },
    [theme.breakpoints.up('md')]: {
      width: '42%',
      margin: `${theme.spacing(6)}px auto`,
    },
  },
  infoOffsetPaper: {
    width: '84%',
    margin: '0 auto',
    '& $infoBox': {
      width: '77.777%',
      margin: '0 auto',
      padding: theme.spacing(2,0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4,0),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6,0),
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '54%'
    },
  },
  howItWorks: {

  },
  howItWorksGrid: {
    '& > div': {
      textAlign: 'center'
    }
  },
  howItWorksIcon: {
    width: '100px',
    height: '100px'
  },
  biobank: {
    backgroundImage: theme.gradients.primaryDiagonal
  },
  volunteer: {
    paddingBottom: '112px',
    position: 'relative',
    background: `url(/${process.env.PUBLIC_URL}assets/images/soft-diamond-background-long.svg) no-repeat bottom center, ${theme.gradients.primaryDiagonal}`,
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
    margin: `${theme.spacing(5)}px auto`,
    [theme.breakpoints.up('sm')]: {
      width: '54%'
    },
  },
  bulletList: {
    listStyleType: 'disc',
    marginLeft: '20px'
  },
  boxList: {

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
}))

const HomePage = (props) => {
  const classes = useStyles()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 600)
    })
    //clean up
    return () => {}
  },[isMobile])
  return (
    <Box>
      <Container className={classes.hero}>
        <div className={classes.heroText}>
          {isMobile ? 
          <Paper className={classes.heroPaper}>
            <Typography className={classes.mainTitle} component="h1">The Cancer Moonshot Biobank</Typography>
            <Typography variant="body1" component="h2">Help change the future <br /> of cancer treatment.</Typography>
          </Paper>
          :
          <>
            <Typography className={classes.mainTitle} component="h1">The Cancer Moonshot Biobank</Typography>
            <Typography variant="h2" component="h2">Help change the future <br /> of cancer treatment.</Typography>
          </>
          }
        </div>
      </Container>
      <Container className={classes.missionStatement}>
        <Typography className={classes.missionStatementText} component="div">
          The Cancer Moonshot Biobank is a 5-year initiative that aims to advance our understanding of cancer by engaging cancer patients in blood and tissue donations throughout the course of their treatment.
        </Typography>
      </Container>
      <Container className={classes.infoBoxes}>
        <div className={classes.accentImage}></div>
        <div className={classes.infoBoxList}>
          <div className={classes.infoBoxOffset}>
            <Paper className={classes.infoOffsetPaper}>
              <Box className={classes.infoBox}>
                <Typography variant={isMobile ? "h2" : "h1"}>Patients</Typography>
                <Typography>By participating, patients can help improve treatment options for their communities.</Typography>
              </Box>
            </Paper>
            <Box className={classes.infoBox}>
              <Typography variant={isMobile ? "h2" : "h1"}>Doctors</Typography>
              <Typography>Partner with patient participants to make donated blood and tumor samples available for cancer research.</Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant={isMobile ? "h2" : "h1"}>The Moonshot Biobank</Typography>
              <Typography>Distributes donated blood and tumor samples to researchers.</Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant={isMobile ? "h2" : "h1"}>Researchers</Typography>
              <Typography>Study these samples to find new or improved cancer treatments.</Typography>
            </Box>
          </div>
        </div>
      </Container>
      <Container className={classes.howItWorks}>
        <Box mt={isMobile ? 2 : 4} mb={isMobile ? 4 : 13}>
          <Typography className={classes.infoBox} variant={isMobile ? "h2" : "h1"} component="h2">How it works</Typography>
          <Grid container className={classes.howItWorksGrid} spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} />
              <Typography>A patient donates blood and tissue samples throughout their treatment, for up to 5 years.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/one-idea.svg`} />
              <Typography>Scientists develop new research ideas to advance their understanding of cancer.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/multiple-samples.svg`} />
              <Typography>Researchers test their idea on many different samples from the Biobank.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img className={classes.howItWorksIcon} src={`/${process.env.PUBLIC_URL}assets/icons/breakthrough.svg`} />
              <Typography>They work to find breakthroughs that improve cancer treatments and survival.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container className={classes.biobank}>
        <Box pt={isMobile ? 2 : 4} pb={isMobile ? 4 : 13}>
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>A diverse biobank works for all of us.</Typography>
          <Grid container spacing={8} justify="center">
            <Grid item xs={12} sm={5}>
              <Typography paragraph={true}>Cancer treatments do not work the same way for everyone. A diverse biobank, with samples from many different populations of people, makes it easier for researchers to find treatments that work.</Typography>
              <Typography>We are working hard to ensure the diversity of this study matches the diversity of our country.</Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography className={classes.bold} paragraph={true}>Progress is being made in Biobank diversity.</Typography>
              <Typography>Learn how other projects are using community outreach to increase participation in biobanking and research.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box pt={isMobile ? 2 : 4} pb={isMobile ? 4 : 13}>
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>Will you help?</Typography>
          <Grid container spacing={8} justify="center">
            <Grid item xs={12} sm={5}>
              <Typography className={classes.bold}>Eligible patients:</Typography>
              <Typography component="div">
                <ul className={classes.bulletList}>
                  <li>Have locally advanced or metastatic solid tumors and hematologic malignancies</li>
                  <li>Are receiving standard of care therapy (not experimental treatment)</li>
                  <li>Are at least 13 years old</li>
                  <li>Live near a participating hospital</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.boxList}>
                <Typography className={classes.boxListHeader} variant="h3" component="h3">We are currently seeking participants with these cancers:</Typography>
                <Typography component="div">
                  <ul className={classes.boxListElement}>
                    <li>Colorectal cancer</li>
                    <li>Lung cancer</li>
                    <li>Prostate cancer</li>
                    <li>Melanoma</li>
                    <li>Gastroesophageal cancer</li>
                    <li>Acute myeloid luekemia</li>
                    <li>Multiple Myeloma</li>
                  </ul>
                </Typography>
                <Typography className={classes.boxListFooter}>
                  Other cancer types may be added in future phases of the biobank program.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container className={classes.volunteer}>
        <Box pt={isMobile ? 2 : 4}>
          <Typography variant={isMobile ? "h2" : "h1"} component="h2" className={classes.infoBox}>To volunteer,<br /> talk to your doctor.</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <IconCardMedia
                title="What to expect when you join the Biobank"
                link="learnmore"
                linkText="Learn more"
                image="hands.jpg"
                imageTitle="worried hands"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <IconCardMedia
                title="Find participating hospitals"
                link="hospitals"
                linkText="Search now"
                image="doctor-and-couple.jpg"
                imageTitle="doctor speaking with couple"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <IconCardMedia
                title="We are protecting your privacy"
                link="privacy"
                linkText="Find out how"
                image="security.jpg"
                imageTitle="padlock icon over laptop"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <IconCardMedia
                title="Learn more about cancer research"
                link="information"
                linkText="Find information"
                image="test-tubes.jpg"
                imageTitle="test tubes"
              />
            </Grid>
          </Grid>
          <Typography className={classes.volunteerText} variant="body2">If you can't join the Cancer Moonshot Biobank, consider making a difference by joining other projects at NIH or NCI.</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage