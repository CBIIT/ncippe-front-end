import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { styled } from  '@mui/material/styles'
import { Box, Container, Grid, IconButton, Link, Typography } from '@mui/material'

import GitBadge from '../../utils/GitBadge'

import { newWindow } from '../../../utils/utils'

// Root container
export const StyledFooterRoot = styled(Container)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#0D1C3C',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}));

// Logo section
export const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 0, 3),
}));

export const LogoHeading = styled('span')({
  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  fontSize: 25,
  fontWeight: 'bold',
  letterSpacing: -0.4,
});

export const LogoSubheading = styled('span')({
  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: -0.25,
});

// Footer links
export const FooterLinks = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
  },
  '& a': {
    display: 'block',
    fontWeight: 600,
    color: theme.palette.common.white,
    textDecoration: 'none',
    wordWrap: 'break-word',
    lineHeight: '22px',
    marginBottom: 14,
  },
  '& a:hover': {
    textDecoration: 'underline',
  },
}));

export const ColumnTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.pink.main,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: 14,
}));

export const SocialIcon = styled('img')({
  width: 60,
  paddingLeft: 5,
});

export const Social = styled(Box)({
  display: 'flex',
  gap: 8,
});

// Button wrapper
export const SocialIconButton = styled(IconButton)(({ theme }) => ({
  width: 60,
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 4,
  paddingBottom: 4,
  // Optional: spacing or hover effects
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Image inside
export const SocialIconImage = styled('img')({
  width: '100%',        // fills the IconButton
  height: 'auto',
  display: 'block',
});

export const Tagline = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontSize: '0.875rem',
}));

const Footer = () => {
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

  const shareUrl = `https://moonshotbiobank.cancer.gov${window.location.pathname}`

  const handleSocialShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/share?url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    }
    newWindow(urls[platform])
  }

  const handleShareOnFacebook = (e) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://moonshotbiobank.cancer.gov${window.location.pathname}`
    newWindow(url)
  }

  const handleShareOnTwitter = (e) => {
    const url = `https://twitter.com/share?url=https://moonshotbiobank.cancer.gov${window.location.pathname}`
    newWindow(url)
  }

  const handleShareOnLinkedin = (e) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://moonshotbiobank.cancer.gov${window.location.pathname}`
    newWindow(url)
  }

  const handleLiveHelp = (e) => {
    e.preventDefault()
    newWindow(t('footer.links.liveHelp.link'))
  }

  return (
    <StyledFooterRoot component="footer" id="appFooter">
      <LogoWrapper >
        <LogoHeading >{t('footer.logo.heading')}</LogoHeading>
        <LogoSubheading >{t('footer.logo.subheading')}</LogoSubheading>
      </LogoWrapper>
        <FooterLinks container spacing={3} onClick={trackClick}>
          <Grid
            size={{ xs: 12,sm: 4 }}>
            <a className="breakAll" href={`mailto:${t('footer.links.email')}`}>{t('footer.links.email')}</a>
            <a href={`tel:${t('footer.links.phone')}`}>{t('footer.links.phone')}</a>
            <a href={t('footer.links.cis.link')}>{t('footer.links.cis.text')}</a>
            <a href="#" onClick={handleLiveHelp}>{t('footer.links.liveHelp.text')}</a>
						<ColumnTitle >{t('footer.links.share_title')}</ColumnTitle>
            <Social >
              <SocialIconButton variant="outlined"
                onClick={handleShareOnFacebook} size="small">
                  <SocialIconImage src={`${process.env.PUBLIC_URL}/assets/icons/facebook.svg`} 
                  alt={t('footer.links.facebook.alt_text')} 
                  title={t('footer.links.facebook.text')} />
                  </SocialIconButton>
              <SocialIconButton variant="outlined"
                onClick={handleShareOnTwitter} size="small">
                  <SocialIconImage src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`} 
                  alt={t('footer.links.twitter.alt_text')} 
                  title={t('footer.links.twitter.text')} />
                  </SocialIconButton>
              <SocialIconButton variant="outlined"
                onClick={handleShareOnLinkedin} size="small">
                  <SocialIconImage src={`${process.env.PUBLIC_URL}/assets/icons/linkedin.svg`} 
                  alt={t('footer.links.linkedin.alt_text')} 
                  title={t('footer.links.linkedin.text')} />
                  </SocialIconButton>
            </Social>
          </Grid>
          <Grid
            size={{xs: 12,sm: 4 }}>
            <ColumnTitle >{t('footer.links.policy_title')}</ColumnTitle>
            <a href={t('footer.links.privacy.link')}>{t('footer.links.privacy.text')}</a>
            <a href={t('footer.links.disclaimer.link')}>{t('footer.links.disclaimer.text')}</a>
            <a href={t('footer.links.accessibility.link')}>{t('footer.links.accessibility.text')}</a>
            <a href={t('footer.links.foia.link')}>{t('footer.links.foia.text')}</a>
            <a href={t('footer.links.vulnerability.link')}>{t('footer.links.vulnerability.text')}</a>
          </Grid>
          <Grid size={{xs: 12, sm: 4}} > 
            <ColumnTitle >{t('footer.links.resources_title')}</ColumnTitle>
            <a href={t('footer.links.bio.link')}>{t('footer.links.bio.text')}</a>
            <a href={t('footer.links.nci.link')}>{t('footer.links.nci.text')}</a>
            <a href={t('footer.links.nih.link')}>{t('footer.links.nih.text')}</a>
            <a href={t('footer.links.hhs.link')}>{t('footer.links.hhs.text')}</a>
            <a href={t('footer.links.usa.link')}>{t('footer.links.usa.text')}</a>
          </Grid>
        </FooterLinks>
        <Tagline >{t('footer.tagline')}</Tagline>
      
      <div id="external" className="visually-hidden">{t('aria.external')}</div>
      {process.env.REACT_APP_GIT_BRANCH_TAG === "true" && <GitBadge />}
    </StyledFooterRoot>
  );
}

export default Footer
