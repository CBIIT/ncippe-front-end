import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'

// import { newWindow } from '../../../utils/utils'

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2,0,3),
  },
  logoHeading: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: -.4
  },
  logoSubheading: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: -.25
  },
  footerLinks: {
    marginBottom: theme.spacing(4),
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
    },
    '& a': {
      display: 'block',
      fontWeight: 600,
      color: theme.palette.common.white,
      textDecoration: 'none',
      wordWrap: 'break-word',
      lineHeight: '22px',
      marginBottom: 14
    },
    '& a:hover': {
      textDecoration: 'underline'
    },
  },
  breakAll: {
    wordBreak: 'break-all'
  },
  columnTitle: {
    color: theme.palette.pink.main,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 14
  },
  // socialIcon: {
  //   width: 60,
  //   paddingLeft: 5
  // }
}))


const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { trackEvent } = useTracking()

  const trackClick = (e) => {
    if(e.target.matches('a')) {
      trackEvent({
        prop53: `BioBank_FooterNav|${e.target.textContent}`,
        eVar53: `BioBank_FooterNav|${e.target.textContent}`,
        events: 'event16',
        eventName: 'FooterLink'
      })
    }
  }

  // const handleShareOnFacebook = (e) => {
  //   const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
  //   newWindow(url)
  // }

  // const handleShareOnTwitter = (e) => {
  //   const url = `https://twitter.com/share?url=${window.location.href}`
  //   newWindow(url)
  // }


  return (
    <Container className={classes.root} component="footer" id="appFooter">
      <div className={classes.logo}>
        <span className={classes.logoHeading}>{t('footer.logo.heading')}</span>
        <span className={classes.logoSubheading}>{t('footer.logo.subheading')}</span>
      </div>
      <Typography component="div">
        <Grid container className={classes.footerLinks} spacing={3} onClick={trackClick}>
          <Grid item xs={12} sm={4}>
            <a className={classes.breakAll} href={`mailto:${t('footer.links.email')}`}>{t('footer.links.email')}</a>
            <a href={`tel:${t('footer.links.phone')}`}>{t('footer.links.phone')}</a>
            <a href="https://www.cancer.gov/contact">{t('footer.links.CIS')}</a>
            {/* <div className={classes.social}>
              <IconButton className={classes.socialIcon} variant="outlined" onClick={handleShareOnFacebook}><img src={`/${process.env.PUBLIC_URL}assets/icons/facebook.svg`} alt="facebook icon" title="Share this page on Facebook" /></IconButton>
              <IconButton className={classes.socialIcon} variant="outlined" onClick={handleShareOnTwitter}><img src={`/${process.env.PUBLIC_URL}assets/icons/twitter.svg`} alt="twitter icon" title="Share this page on Twitter" /></IconButton>
            </div> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>{t('footer.links.policy_title')}</div>
            <a href="https://www.cancer.gov/policies/disclaimer">{t('footer.links.disclaimer')}</a>
            <a href="https://www.cancer.gov/policies/privacy-security">{t('footer.links.privacy')}</a>
            <a href="https://www.cancer.gov/policies/accessibility">{t('footer.links.accessibility')}</a>
            <a href="https://www.cancer.gov/policies/foia">{t('footer.links.foia')}</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>{t('footer.links.resources_title')}</div>
            <a href="https://biospecimens.cancer.gov">{t('footer.links.bio')}</a>
            <a href="https://www.cancer.gov/">{t('footer.links.nci')}</a>
            <a href="https://www.nih.gov/">{t('footer.links.nih')}</a>
            <a href="https://www.hhs.gov/">{t('footer.links.hhs')}</a>
            <a href="https://usa.gov/">{t('footer.links.usa')}</a>
          </Grid>
        </Grid>
        <div className={classes.tagline}>{t('footer.tagline')}</div>
      </Typography>
    </Container>
  )
}

export default Footer