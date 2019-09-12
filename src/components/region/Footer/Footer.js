import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0D1C3C',
    padding: theme.spacing(3),
    color: theme.palette.common.white
  },
  logo: {
    float: 'left',
    border: `1px solid ${theme.palette.common.white}`,
    padding: theme.spacing(2)
  },
  links: {
    float: 'right',
    border: `1px solid ${theme.palette.common.white}`,
    padding: theme.spacing(2)
  }
}))


const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <div className={classes.logo}><img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} /></div>
      <Typography>
        <Grid container>
          <Grid item>
            <a href="mailto:moonshotbiobank@nih.gov">moonshotbiobank@nih.gov</a>
            <a href="tel:202-222-2222">(202) 222 - 2222</a>
            <a href="#">Cancer Information Services</a>
          </Grid>
          <Grid item>
            <span className={classes.columnTitle}>Policy Information</span>
            <a href="#">Disclaimer Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility</a>
            <a href="#">FOIA</a>
          </Grid>
          <Grid item>
            <div className={classes.columnTitle}>Policy Information</div>
            <a href="#">Biorepositories &amp; Biospecimen Research Branch</a>
            <a href="#">National Cancer Institute</a>
            <a href="#">National Institutes of Health</a>
            <a href="#">U.S. Department of Health and Human Services</a>
            <a href="#">USA.gov</a>
          </Grid>
        </Grid>
        <div className={classes.tagline}>NIH &hellip; Turning Discovery Into Health &reg;</div>
      </Typography>
    </footer>
  )
}
  
export default Footer