import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import IconCard from '../components/IconCard/IconCard'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      [theme.breakpoints.up('md')]: {
        margin: 0
      }
    }
  }
}))

const PrivacyPage = (props) => {
  const classes = useStyles()

  return (
    <Container className="mainContainer">
      <Box my={6} mx={0}>
        <Typography variant="h1" gutterBottom>Your privacy is our priority</Typography>
        <Typography variant="body2">We will keep your information private and secure.</Typography>
      </Box>
      <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="identification.svg"
            title="The Biobank will never give researchers your name."
            desc="Researchers will not know your name, phone number, or where you live."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="stored-medical-info.svg"
            title="The Biobank stores your medical information without identifying information."
            desc="Biobank employees cannot access your name or other indentifying information."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="doctor.svg"
            title="We keep your participation private."
            desc="Your participation is not shared with your health insurance, employer, or anyone else."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="secure-practices.svg"
            title="Researchers must apply to use your samples and medical information."
            desc="They must agree to ethical and secure practices before they can access the Biobank."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="security-system.svg"
            title="Our systems meet the highest security standards."
            desc="We test our systems to protect you from data breeches and other security threats."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="laws.svg"
            title="There are laws to protect your privacy and prevent discrimination"
            desc="Certificate of Confidentiality <br/> HIPPA Privacy Rule"
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default PrivacyPage