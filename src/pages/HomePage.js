import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { flexbox } from '@material-ui/system';

import IconCardMedia from '../components/IconCardMedia/IconCardMedia'

const useStyles = makeStyles( theme => ({
  hero: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-desktop.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "auto 100%",
    height: "700px",
    display: 'flex',
    alignItems: 'center'

  },
  heroText: {
    marginLeft: '12%',
    width: '42%'
  },
  mainTitle: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '62px',
    lineHeight: '74px',
    paragraphHeight: '30px',
    letterSpacing: '-.6px',
  },
  bold: {
    fontWeight: 'bold'
  },
  missionStatement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '100px auto'
  },
  missionStatementText: {
    width: '84%',
    textAlign: 'center'
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
    top: `-${theme.spacing(9)}px`
  },
  infoBox: {
    width: '72%',
    margin: `${theme.spacing(6)}px auto`,
    textAlign: 'center',
  },
  infoOffsetPaper: {
    width: '84%',
    margin: '0 auto',
    '& $infoBox': {
      width: '77.777%',
      margin: '0 auto',
      padding: theme.spacing(6,0),
    }
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
    backgroundImage: theme.gradients.primaryDiagonal
  },
  volunteerText: {
    width: '84%',
    textAlign: 'center',
    margin: `${theme.spacing(3)}px auto`
  },
  [theme.breakpoints.up('sm')]: {
    missionStatementText: {
      width: '54%'
    },
    infoOffsetPaper: {
      width: '54%'
    },
    volunteerText: {
      width: '54%'
    },
    infoBox: {
      width: '42%'
    }
  }
}))

const HomePage = (props) => {
  const classes = useStyles()
  return (
    <Box>
      <Container className={classes.hero}>
        <div className={classes.heroText}>
          <Typography className={classes.mainTitle} component="h1">The Cancer Moonshot Biobank</Typography>
          <Typography variant="h2" component="h2">Help change the future <br /> of cancer treatment.</Typography>
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
                <Typography variant="h1">Patients</Typography>
                <Typography>By participating, patients can help improve treatment options for their communities.</Typography>
              </Box>
            </Paper>
            <Box className={classes.infoBox}>
              <Typography variant="h1">Doctors</Typography>
              <Typography>Partner with patient participants to make donated blood and tumor samples available for cancer research.</Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant="h1">The Moonshot Biobank</Typography>
              <Typography>Distributes donated blood and tumor samples to researchers.</Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant="h1">Researchers</Typography>
              <Typography>Study these samples to find new or improved cancer treatments.</Typography>
            </Box>
          </div>
        </div>
      </Container>
      <Container className={classes.howItWorks}>
        <Box mt={4} mb={13}>
          <Typography className={classes.infoBox} variant="h1" component="h2">How it works</Typography>
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
        <Box pt={4} pb={13}>
          <Typography variant="h1" component="h2" className={classes.infoBox}>A diverse biobank works for all of us.</Typography>
          <Grid container spacing={8} justify="center">
            <Grid item xs={10} sm={5}>
              <Typography>Cancer treatments do not work the same way for everyone. A diverse biobank, with samples from many different populations of people, makes it easier for researchers to find treatments that work.</Typography>
              <Typography>We are working hard to ensure the diversity of this study matches the diversity of our country.</Typography>
            </Grid>
            <Grid item xs={10} sm={5}>
              <Typography className={classes.bold}>Progress is being made in Biobank diversity.</Typography>
              <Typography>Learn how other projects are using community outreach to increase participation in biobanking and research.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box pt={4} pb={13}>
          <Typography variant="h1" component="h2" className={classes.infoBox}>Will you help?</Typography>
          <Grid container spacing={8} justify="center">
            <Grid item xs={10} sm={5}>
              <Typography className={classes.bold}>Eligible patients:</Typography>
              <Typography component="div">
                <ul>
                  <li>Have locally advanced or metastatic solid tumors and hematologic malignancies</li>
                  <li>Are receiving standard of care therapy (not experimental treatment)</li>
                  <li>Are at least 13 years old</li>
                  <li>Live near a participating hospital</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={10} sm={5}>
              <Box>
              <Typography className={classes.bold}>We are currently seeking participants with these cancers:</Typography>
              <Typography component="div">
                <ul className={classes.boxList}>
                  <li>Colorectal cancer</li>
                  <li>Lung cancer</li>
                  <li>Prostate cancer</li>
                  <li>Melanoma</li>
                  <li>Gastroesophageal cancer</li>
                  <li>Acute myeloid luekemia</li>
                  <li>Multiple Myeloma</li>
                </ul>
              </Typography>
              <Typography>
                Other cancer types may be added in future phases of the biobank program.
              </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container className={classes.volunteer}>
        <Box pt={4} pb={13}>
          <Typography variant="h1" component="h2" className={classes.infoBox}>To volunteer,<br /> talk to your doctor.</Typography>
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
          <Typography className={classes.volunteerText}>If you can't join the Cancer Moonshot Biobank, consider making a difference by joining other projects at NIH or NCI.</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage