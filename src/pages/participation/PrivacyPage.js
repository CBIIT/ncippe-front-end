import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import IconCard from '../../components/IconCard/IconCard'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(4)
  },
  gridItem: {
    width: '33.333333%',

    // '& $card': {
    //   [theme.breakpoints.up('md')]: {
    //     margin: 0
    //   }
    // }
  }
}))

const PrivacyPage = (props) => {
  const classes = useStyles()

  return (
    <Container className="mainContainer">
      <Box my={6} mx={0}>
        <Typography variant="h1" gutterBottom>Protecting your privacy</Typography>
        <Typography variant="body2">Your privacy is important to us.</Typography>
      </Box>
      <Grid container className={classes.grid} spacing={2} direction="row" justify="center" alignItems="stretch">
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="identification.svg"
            title="We will never give researchers your name."
            desc="Researchers will not know your name, phone number, or where you live."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="stored-medical-info.svg"
            title="Access to your personal information will be protected."
            desc="Only trained staff will see your medical information and know who you are."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="doctor.svg"
            title="We keep your participation private."
            desc="We won't tell anyone, including your health insurance company or your employer, that you're a participant in the Biobank."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="secure-practices.svg"
            title="We test our data systems to keep them secure."
            desc="We test our systems to protect you from data breaches and other security threats."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="security-system.svg"
            title="Researchers must apply to use your samples and medical information."
            desc="They must agree to ethical and secure practices before they can use your samples and medical information."
          />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={6} lg={4}>
          <IconCard
            icon="laws.svg"
            title="There are laws to protect your privacy and prevent discrimination."
            descHTML={`<a href="https://www.cancer.gov/resources-for/researchers/certificates-confidentiality" rel="noopener noreferrer" target="_blank">Certificate of Confidentiality</a> <br/> <a href="https://www.hhs.gov/hipaa/for-professionals/privacy/index.html" rel="noopener noreferrer" target="_blank">HIPPA Privacy Rule</a>`}
          />
        </Grid>
      </Grid>
      <Typography paragraph={true}>Once your information is shared with the Biobank, it may no longer be protected by patient privacy rules (like HIPAA). However, it will still be protected by other privacy rules and agreements. These include the rules and agreements that researchers must follow to access the Biobank scientific database.</Typography>
    </Container>
  )
}

export default PrivacyPage