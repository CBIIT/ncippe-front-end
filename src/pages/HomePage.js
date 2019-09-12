import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  hero: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/hero-image-desktop.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "auto 100%",
    height: "700px"
  },
  bold: {
    fontWeight: 'bold'
  }
}))

const HomePage = (props) => {
  const classes = useStyles()
  return (
    <Box>
      <Container className={classes.hero}>
        <Typography variant="h1" component="h1">The Cancer Moonshot Biobank</Typography>
        <Typography variant="h2" component="h2">Help change the future of cancer treatment.</Typography>
      </Container>
      <Box>
        <Typography>
          The Cancer Moonshot Biobank is a 5-year initiative that aims to advance our understanding of cancer by engaging cancer patients in blood and tissue donations throughout the course of their treatment.
        </Typography>
      </Box>
      <Container>
        <Paper>
          <Typography variant="h2" component="h2">Patients</Typography>
          <Typography>By participating, patients can help improve treatment options for their communities.</Typography>
        </Paper>
      </Container>
      <Box>
        <Typography variant="h2" component="h2">Doctors</Typography>
        <Typography>Partner with patient participants to make donated blood and tumor samples available for cancer research.</Typography>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">The Moonshot Biobank</Typography>
        <Typography>Distributes donated blood and tumor samples to researchers.</Typography>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">Researchers</Typography>
        <Typography>Study these samples to find new or improved cancer treatments.</Typography>
      </Box>
      <Box>
        <Container>
          <Typography variant="h2" component="h2">How it works</Typography>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <img src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} />
              <Typography>A patient donates blood and tissue samples throughout their treatment, for up to 5 years.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src={`/${process.env.PUBLIC_URL}assets/icons/one-idea.svg`} />
              <Typography>Scientists develop new research ideas to advance their understanding of cancer.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src={`/${process.env.PUBLIC_URL}assets/icons/multiple-samples.svg`} />
              <Typography>Researchers test their idea on many different samples from the Biobank.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src={`/${process.env.PUBLIC_URL}assets/icons/breakthrough.svg`} />
              <Typography>They work to find breakthroughs that improve cancer treatments and survival.</Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" component="h2">A diverse biobank works for all of us.</Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography>Cancer treatments do not work the same way for everyone. A diverse biobank, with samples from many different populations of people, makes it easier for researchers to find treatments that work.</Typography>
              <Typography>We are working hard to ensure the diversity of this study matches the diversity of our country.</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.bold}>Progress is being made in Biobank diversity.</Typography>
              <Typography>Learn how other projects are using community outreach to increase participation in biobanking and research.</Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" component="h2">Will you help?</Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.bold}>Eligible patients:</Typography>
              <Typography>
                <ul>
                  <li>Have locally advanced or metastatic solid tumors and hematologic malignancies</li>
                  <li>Are receiving standard of care therapy (not experimental treatment)</li>
                  <li>Are at least 13 years old</li>
                  <li>Live near a participating hospital</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
              <Typography className={classes.bold}>We are currently seeking participants with these cancers:</Typography>
              <Typography>
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
        </Container>
        <Container>
          <Typography variant="h2" component="h2">To volunteer,<br /> talk to your doctor.</Typography>
          <Typography>If you can't join the Cancer Moonshot Biobank, consider making a difference by joining other projects at NIH or NCI.</Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage