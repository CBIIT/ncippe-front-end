import React from 'react'
import { Link } from '@reach/router'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TabPanel from '../../components/Tabs/TabPanel'

const useStyles = makeStyles( theme => ({
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
  }
}))

const Donate = (props) => {
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
          <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>During the course of your treatment, you’ll donate samples of blood and tissue. Those samples will be securely stored in the Biobank until they are shared with researchers.</Typography>

          <Typography variant="h3" component="h3">Blood samples</Typography>
          <Typography className={classes.bottomSpacer}>The hospital staff will draw a few extra tubes of blood for the Biobank during your routine care.</Typography>

          <Typography variant="h3" component="h3">Tissue samples</Typography>
          <Typography className={classes.bottomSpacer}>Your doctor will collect extra samples for the Biobank during a routine biopsy whenever possible. It's also possible your doctor may schedule a biopsy just to get tissue for the Biobank.</Typography>

          <Typography variant="h3" component="h3">Medical information</Typography>
          <Typography paragraph={true}>We’ll collect information from your medical record, such as your diagnosis and past treatments. Your information will remain secure. Learn more about <Link to="/participation/privacy">privacy and the Biobank</Link>.</Typography>
          <Typography className={classes.bottomSpacer}>Many factors can influence whether someone gets cancer and how they respond to treatment. Researchers will use your medical information along with your samples to do research that can help them better understand how to treat cancer.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.imgColumn}>
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/doctor-and-patient-wide.jpg`} alt="doctor and patient" height="360" />
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/test-tubes.jpg`} alt="test tubes" height="360" />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default Donate