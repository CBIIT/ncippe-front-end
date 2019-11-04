import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  grid: {
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
  }
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
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">What is the Cancer Moonshot<sup>SM</sup> Biobank?</Typography>
              <Typography paragraph={true} variant="h3" component="h3">The Biobank starts with you.</Typography>
              <Typography paragraph={true}>The Cancer Moonshot Biobank is an unprecedented effort to learn how cancers behave over time.</Typography>
              <Typography paragraph={true}>The Biobank is asking people with certain kinds of cancers to donate samples of their blood and tissue, throughout their treatment, for up to 5 years. Those samples will be stored in a biobank&mdash;a secure library of samples and medical information.  </Typography>
              <Typography paragraph={true}>Researchers will be able to access donated samples and shared information to study how cancer responds to treatment and why some become treatment-resistant.</Typography>
              <Typography paragraph={true}>The Biobank is a part of the <a href="https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative" rel="noopener noreferrer" target="_blank">Cancer Moonshot</a>, an initiative to accelerate cancer research. It is run by the <a href="https://biospecimens.cancer.gov/default.asp" rel="noopener noreferrer" target="_blank">Biorepository and Biospecimen Research Branch</a> at the <a href="https://www.cancer.gov/" rel="noopener noreferrer" target="_blank">National Cancer Institute</a>, part of the <a href="https://www.nih.gov/"  rel="noopener noreferrer" target="_blank">National Institutes of Health (NIH)</a>. </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/hands2.jpg`} alt="reassuring hands" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage