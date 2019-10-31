import React from 'react'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
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
  divider: {
    width: '100%',
    margin: theme.spacing(7,0)
  },
}))

export default () => {
  const classes = useStyles()
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Get Help" />
      <Container className="mainContainer">
        <div className={classes.titleWithIcon}>
          <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/get-help.svg`} alt='patient icon' aria-hidden="true"></img>
          <Typography variant="h2" component="h2">Get help</Typography>
        </div>
        <Typography>If you have questions about the Biobank or your participation, contact your research coordinator.</Typography>
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h3" component="h3">Close your Biobank Account</Typography>
              <Typography paragraph={true}>Closing your account means that you won’t be able to access your biomarker test directly, or receive communications from the Biobank. You can still get copies of your Biomarker test from your research coordinator. You can close your account and still donate samples to the Biobank.</Typography>
              <Typography paragraph={true} variant="h3" component="h3">Leave the Biobank</Typography>
              <Typography paragraph={true}>Leaving the Biobank means you’ll stop donating blood and tissue samples. When you leave, you also have the option to have the biobank destroy any samples that it is currently storing. If samples have already been distributed to researchers, we may not be able to get them all back.</Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/tablet.jpg`} alt="tablet computer" />
            </Grid>
          </Grid>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h3" component="h3">Changing doctors or hospitals</Typography>
              <Typography paragraph={true}>If you decide to switch to a doctor or a hospital that is not participating in the Biobank, you won’t be able to donate further samples. Samples you’ve already donated will stay in the Biobank and continue to be used for research, unless you leave the Biobank.</Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <img src={`/${process.env.PUBLIC_URL}assets/images/hospital-exterior.jpg`} alt="hospital exterior" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}