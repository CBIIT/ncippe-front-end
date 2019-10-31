import React from 'react'
import { Box, Grid, Link, Typography, Stepper, Step, StepLabel, StepContent, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TabPanel from '../../components/Tabs/TabPanel'

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
  },
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  imgColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  bottomSpacer: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },
  img: {
    display: 'block',
    maxWidth: 410,
    '&:first-of-type': {
      marginBottom: theme.spacing(5)
    }
  },
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  },
  stepper: {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      margin: theme.spacing(1,0)
    }
  }
}))

const BiomarkerTest = (props) => {
  const {index, isMobile} = props
  const classes = useStyles()

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Grid container>
        <Grid item xs={12} sm={6} lg={8} className={classes.textColumn}>
          <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>Your cancer is unique to you.</Typography>
          <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>After you donate blood and tissue samples to the Biobank, we will run a biomarker test on your samples. Your doctor may be able to use the report to create a more personalized treatment plan for you.</Typography>

          <Typography variant="h3" component="h3">Biomarker testing</Typography>
          <Typography>This type of testing may also be called tumor profiling, genomic profiling, molecular testing, tumor DNA sequencing, or genomic cancer testing. It looks specifically at the genetic errors and other changes of your cancer. It doesn’t look at any genes you have inherited.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.imgColumn}>
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/researchers4.jpg`} alt="doctor and microscope" height="360" />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography variant="h2" component="h2">How is the test performed?</Typography>
      <Typography>The biomarker test involves three steps:</Typography>
      <Stepper className={classes.stepper} orientation="vertical" nonLinear>
        <Step active={true}>
          <StepLabel>Submit</StepLabel>
          <StepContent>The Biobank will send your sample to a lab.</StepContent>
        </Step>
        <Step active={true}>
          <StepLabel>Analyze</StepLabel>
          <StepContent>The lab will analyze the tumor or blood sample for certain genetic changes, or biomarkers. These biomarkers can help suggest the targeted therapies, immunotherapies, or clinical trials that might be right for you.</StepContent>
        </Step>
        <Step active={true}>
          <StepLabel>Report</StepLabel>
          <StepContent>Your report will be available for you to download through your Biobank account. It will also be sent to your doctor so you can discuss the results together.</StepContent>
        </Step>
      </Stepper>
      <Divider className={classes.divider} />
      <Typography variant="h2" component="h2">Sample reports</Typography>
      <Divider className={classes.divider} />
        <Box mb={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">Where can I learn more?</Typography>
              <div className={classes.linkList}>
                <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">Tumor DNA sequencing</Link>
                <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">Resources for health care providers and educators</Link>
                <Link href="https://cancer.gov" variant="button" rel="noopener noreferrer" target="_blank">NCI Cancer Information Service</Link>
              </div>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/working-on-laptop.jpg`} alt="working on laptop" />
            </Grid>
          </Grid>
        </Box>
    </TabPanel>
  )
}

export default BiomarkerTest