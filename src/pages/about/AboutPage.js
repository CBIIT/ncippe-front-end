import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
}))

const AboutPage = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">About the Biobank</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <Typography variant="h2" component="h2">What is the Cancer Moonshot Biobank?</Typography>
              <Typography variant="h3" component="h3">The Biobank starts with you.</Typography>
              <Typography gutterBottom>The Cancer Moonshot Biobank is an unprecedented effort to learn how cancers behave over time.</Typography>
              <Typography gutterBottom>The Biobank is asking people with certain kinds of cancers to donate samples of their blood and tissue, throughout their treatment, for up to 5 years. Those samples will be stored in a biobank&mdash;a secure library of samples and medical information.</Typography>
              <Typography gutterBottom>Researchers will be able to access dontated samples and shared information to study how cancer responds to treatment and why some become treatment-resistant.</Typography>
              <Typography gutterBottom>The Biobank is part of the Cancer Moonshot, an initiative to accelerate cancer research. It is run by the Biorepository and Biospeciment Research Branch at the National Cancer Institute, part of the National Institutes of Health (NIH).</Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <img src={`${process.env.PUBLIC_URL}assets/images/hands2.jpg`} alt="reassuring hands" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage