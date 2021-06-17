import React from 'react'
import { Link as RouterLink } from "@reach/router"
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Link, Typography } from '@material-ui/core'

import GitBadge from '../../utils/GitBadge'

// import { newWindow } from '../../../utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
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
}),{name: 'Footer'})


const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const trackClick = (e) => {
    if(e.target.matches('a')) {
      PubSub.publish('ANALYTICS', {
        events: 'event16',
        eventName: 'FooterLink',
        prop53: `BioBank_FooterNav|${e.target.textContent}`,
        eVar53: `BioBank_FooterNav|${e.target.textContent}`,
      })
    }
  }

/*
  Social media integrations on hold until we get Server Side Rendering (SSR) or https://prerender.io/ working, which will respond to search engines and crawlers with correct metadata
*/

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
            <a className="breakAll" href={`mailto:${t('footer.links.email')}`}>{t('footer.links.email')}</a>
            <a href={`tel:${t('footer.links.phone')}`}>{t('footer.links.phone')}</a>
            <a href={t('footer.links.cis.link')}>{t('footer.links.cis.text')}</a>
            {/* <div className={classes.social}>
              <IconButton className={classes.socialIcon} variant="outlined" onClick={handleShareOnFacebook}><img src={`${process.env.PUBLIC_URL}/assets/icons/facebook.svg`} alt="facebook icon" title="Share this page on Facebook" /></IconButton>
              <IconButton className={classes.socialIcon} variant="outlined" onClick={handleShareOnTwitter}><img src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`} alt="twitter icon" title="Share this page on Twitter" /></IconButton>
            </div> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>{t('footer.links.policy_title')}</div>
            <Link component={RouterLink} to={t('footer.links.privacy.link')}>{t('footer.links.privacy.text')}</Link>
            <a href={t('footer.links.disclaimer.link')}>{t('footer.links.disclaimer.text')}</a>
            <a href={t('footer.links.accessibility.link')}>{t('footer.links.accessibility.text')}</a>
            <a href={t('footer.links.foia.link')}>{t('footer.links.foia.text')}</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.columnTitle}>{t('footer.links.resources_title')}</div>
            <a href={t('footer.links.bio.link')}>{t('footer.links.bio.text')}</a>
            <a href={t('footer.links.nci.link')}>{t('footer.links.nci.text')}</a>
            <a href={t('footer.links.nih.link')}>{t('footer.links.nih.text')}</a>
            <a href={t('footer.links.hhs.link')}>{t('footer.links.hhs.text')}</a>
            <a href={t('footer.links.usa.link')}>{t('footer.links.usa.text')}</a>
          </Grid>
        </Grid>
        <div className={classes.tagline}>{t('footer.tagline')}</div>
      </Typography>
      <div id="external" className="visually-hidden">{t('aria.external')}</div>
      {process.env.REACT_APP_GIT_BRANCH_TAG === "true" && <GitBadge />}
    </Container>
  )
}

export default Footer