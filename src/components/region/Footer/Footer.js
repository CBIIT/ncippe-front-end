import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'

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
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
    },
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
      <div className={classes.logo}><img src={`/${process.env.PUBLIC_URL}assets/images/nci-logo-white.svg`} alt="NCI logo" /></div>
      <Typography component="div">
        <Grid container className={classes.footerLinks} spacing={3}>
          <Grid item xs={12} sm={4}>
            <a href="mailto:moonshotbiobank@nih.gov">moonshotbiobank@nih.gov</a>
            <a href="tel:202-222-2222">(202) 222 - 2222</a>
            <a href="https://www.cancer.gov/contact">Cancer Information Services</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <span className={classes.columnTitle}>Policy Information</span>
            <a href="https://www.cancer.gov/policies/disclaimer">Disclaimer Policy</a>
            <a href="https://www.cancer.gov/policies/privacy-security">Privacy Policy</a>
            <a href="https://www.cancer.gov/policies/accessibility">Accessibility</a>
            <a href="https://www.cancer.gov/policies/foia">FOIA</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>More Resources</div>
            <a href="https://biospecimens.cancer.gov">Biorepositories &amp; Biospecimen Research Branch</a>
            <a href="https://www.cancer.gov/">National Cancer Institute</a>
            <a href="https://www.nih.gov/">National Institutes of Health</a>
            <a href="https://www.hhs.gov/">U.S. Department of Health and Human Services</a>
            <a href="https://usa.gov/">USA.gov</a>
          </Grid>
        </Grid>
        <div className={classes.tagline}>NIH &hellip; Turning Discovery Into Health &reg;</div>
      </Typography>
    </Container>
  )
}
  
export default Footer