import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
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
  const { t } = useTranslation('common')
  const { trackEvent } = useTracking()

  const trackClick = (e) => {
    if(e.target.matches('a')) {
      trackEvent({
        prop53: `BioBank_FooterNav|${e.target.textContent}`,
        eVar53: `BioBank_FooterNav|${e.target.textContent}`,
        events: 'event16'
      })
    }
  }

  return (
    <Container className={classes.root} component="footer">
      <div className={classes.logo}><img src={`/${process.env.PUBLIC_URL}assets/images/nci-logo-text-white.svg`} alt={t('footer.logo.alt_text')} title={t('footer.logo.title')}  /></div>
      <Typography component="div">
        <Grid container className={classes.footerLinks} spacing={3} onClick={trackClick}>
          <Grid item xs={12} sm={4}>
            <a href={`mailto:${t('footer.links.email')}`}>{t('footer.links.email')}</a>
            <a href={`tel:${t('footer.links.phone')}`}>{t('footer.links.phone')}</a>
            <a href="https://www.cancer.gov/contact">{t('footer.links.CIS')}</a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <span className={classes.columnTitle}>{t('footer.links.policy_title')}</span>
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