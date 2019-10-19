import React from 'react';
import { Container, Box, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import HospitalMap from '../../components/HospitalMap/HospitalMap'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 380
    }
  }
}))

const EligibilityPage = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">Eligibility and locations</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true}>The Cancer Moonshot Biobank will start out by collecting samples from patients with specific types of cancer, who are being treated at participating hospitals. Other cancer types and more hospitals may be added in future phases of the Biobank program.</Typography>
              <Typography paragraph={true} variant="h2" component="h2">Eligibility</Typography>
              <Typography paragraph={true} variant="h3" component="h3">You may be eligible if you:</Typography>
              <Typography component="div">
                <ul className="bulletList bulletList--spreadOut">
                  <li>Have been diagnosed locally advanced or metastatic:
                    <ul className={classes.nestedList}>
                      <li>Colon cancer</li>
                      <li>Lung cancer</li>
                      <li>Prostate cancer</li>
                      <li>Melanoma</li>
                    </ul>
                    <ul className={classes.nestedList}>
                      <li>Gastroesophageal cancer</li>
                      <li>Acute Myeloid luekemia</li>
                      <li>Multiple Myeloma</li>
                    </ul>
                  </li>
                  <li>Are being treated at a hospital that is taking part in the Biobank</li>
                  <li>Are receiving standard treatment (not experimental treatment)</li>
                  <li>Are at least 13 years old</li>
                </ul>
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/patient-crop.jpg`} alt="reassuring hands" />
            </Grid>

            <Divider className={classes.divider} />
            
            <Grid className={classes.gridItem} item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">Participating hospitals</Typography>
              <Typography paragraph={true} variant="body2">To participate in the Biobank, you must be in the care of a doctor at one of these hospitals.</Typography>
              <Typography>The Cancer Moonshot Biobank is working with the NCI Communicty Oncology Research Program (NCORP), a national network that brings cancer clinical trials and care delivery studies to people in their own communities.</Typography>
            </Grid>
            <HospitalMap />

            <Divider className={classes.divider} />

            <Grid item xs={12} md={8}>
              <Typography paragraph={true} variant="h2" component="h2">Not eligible? Join another study</Typography>
              <Typography paragraph={true} component="div">If you can't join the Cancer Moonshot Biobank, consider making a difference by participating in projects at NIH or NCI.</Typography>
              <Typography component="div">
                <ul className="bulletList bulletList--spreadOut">
                  <li>All of Us &mdash; a large-scale project to gather data from one million or more people living in the United States to accelerate research and improve health.</li>
                  <li>My Pediatric and Adult Rare Tumor (MyPART) &mdash; for people with certain rare tumors</li>
                  <li>Comprehensive Oncology Network Evaluating Rare CNS Tumors (NCI-CONNECT) &mdash; for people with rare brain and spine tumors</li>
                  <li>National Cancer Institute Clinical Trials &mdash; search for NCI-sponsored clinical trials</li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default EligibilityPage