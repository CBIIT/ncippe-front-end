import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0D1C3C',
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    }
  },
  logo: {

    '& img': {
      width: '430px',
      maxWidth: '100%',
      height: 'auto'
    }
  },
  footerLinks: {
    '& a': {
      display: 'block',
      fontWeight: 'bold',
      color: theme.palette.common.white,
      textDecoration: 'none',
      wordBreak: 'break-word',
    },
    '& a:hover': {
      textDecoration: 'underline'
    },
  },
  columnTitle: {
    color: theme.palette.pink.main,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
}))


const Footer = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} component="footer">
      <div className={classes.logo}><img src={`/${process.env.PUBLIC_URL}assets/images/nci-logo-white.svg`} /></div>
      <Typography component="div">
        <Grid container className={classes.footerLinks} spacing={3}>
          <Grid item xs={12} sm={4}>
            <a href="mailto:moonshotbiobank@nih.gov">moonshotbiobank@nih.gov</a>
            <a href="tel:202-222-2222">(202) 222 - 2222</a>
            <a href="#">Cancer Information Services</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <span className={classes.columnTitle}>Policy Information</span>
            <a href="#">Disclaimer Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility</a>
            <a href="#">FOIA</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>More Resources</div>
            <a href="#">Biorepositories &amp; Biospecimen Research Branch</a>
            <a href="#">National Cancer Institute</a>
            <a href="#">National Institutes of Health</a>
            <a href="#">U.S. Department of Health and Human Services</a>
            <a href="#">USA.gov</a>
          </Grid>
        </Grid>
        <div className={classes.tagline}>NIH &hellip; Turning Discovery Into Health &reg;</div>
      </Typography>
    </Container>
  )
}
  
export default Footer