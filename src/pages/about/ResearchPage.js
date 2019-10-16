import React from 'react';
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  }
}))

const ResearchPage = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">Biobanking drives research</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <Typography variant="h2" component="h2">It's important to understand how cancer changes over time.</Typography>
              <Typography gutterBottom>The main causes of death from cancer are when the disease spreads or becomes resistant to treatment. To understand why these happen, researchers need to look at cancer tissue donated by patients over the course of their treatment.</Typography>
              <Typography gutterBottom>These kinds of samples have been hard to get – but the Cancer Moonshot Biobank wants to change that. By donating your samples to the Biobank over the course of your care, for up to 5 years, researchers can study how cancers change over time, and how to fight later-stage cancers.</Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <img src={`${process.env.PUBLIC_URL}assets/images/researchers1.jpg`} alt="reassuring hands" />
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <Typography variant="h2" component="h2">Types of research</Typography>
              <Typography gutterBottom>Many different kinds of research will be done using samples and medical information from the Biobank.</Typography>
              <Typography gutterBottom>Researchers may use cells grown from your cancer tissue. Researchers can use samples like these to test new cancer drugs and do other types of medical research.</Typography>
              <Typography gutterBottom>They may also study the entire genetic code of a tumor to better understand how cancer develops and changes, how cancer drugs work, and other medical research questions.</Typography>
              <Typography gutterBottom>As more discoveries are made, new methods of research will be able to use the Biobank to better understand cancer.</Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <img src={`${process.env.PUBLIC_URL}assets/images/researchers2.jpg`} alt="reassuring hands" />
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <Typography variant="h2" component="h2">Who uses the Biobank?</Typography>
              <Typography gutterBottom>Researchers from all over the world will use the Biobank. They may work for universities, or for private labs and drug companies.</Typography>
              <Typography gutterBottom>To be approved to access Biobank samples, the researchers will have to meet strict standards for ethical and secure use of samples and data.</Typography>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} sm={6}>
              <img src={`${process.env.PUBLIC_URL}assets/images/researchers3.jpg`} alt="reassuring hands" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default ResearchPage