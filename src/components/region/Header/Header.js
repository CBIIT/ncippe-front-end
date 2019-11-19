import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { 
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { MenuRounded as MenuIcon } from '@material-ui/icons'

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup';
import ExpansionMenu from '../../ExpansionMenu/ExpansionMenu'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('smLandscape')]: {
      marginTop: 0,
      marginBottom: 0,
      paddingRight: theme.spacing(3)
    }
  },
  appToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },
  toolbarLogo: {
    flexGrow: 1,
    maxHeight: 50,
    margin: 0,
    
    '& img': {
      height: 50,
      width: 'auto',
      maxWidth: '100%',
    },
  },
  headerLink: {
    color: theme.palette.grey[800],
    marginRight: theme.spacing(1),
    
    '&:hover': {
      color: theme.palette.grey[900],
      fontWeight: 600
    }
  },
  publicNavDesktop: {
    display: 'flex',
    position: 'relative',
    margin: theme.spacing(0,2),
    minHeight: 82,
    '& button': {
      fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
    },
    '& button:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = window.location.pathname
  const [expanded, setExpanded] = useState(loc)
  const { t } = useTranslation('common');

  // TODO: set active state on nav menu items based on site location

  useEffect(() => {
    const resizeEvt = () => {
      setIsMobile(window.innerWidth < 800)
    }
    window.addEventListener('resize', resizeEvt, {passive: true})
    //clean up
    return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  },[isMobile])

  const toggleDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(prev => !prev)
  }

  const expandPanel = (event, newExpanded) => {
    setExpanded(newExpanded ? event.currentTarget.id : "")
  }

  const closeMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <Container component="header" className={classes.root}>
      <Box className={classes.appToolbarContainer}>
        <figure className={classes.toolbarLogo}>
          <Link component={RouterLink} to='/'>
            <img src={`/${process.env.PUBLIC_URL}assets/images/biobank-logo.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </figure>
        {!isMobile && (
          <nav className={classes.publicNavDesktop}>
            <MenuGroup title="About" active={loc.includes('about')}>
              <a href="/about">{t('nav.about')}</a>
              <a href="/about/eligibility">{t('nav.eligibility')}</a>
              <a href="/about/research">{t('nav.research')}</a>
            </MenuGroup>
            <MenuGroup title="What to expect" active={loc.includes('expect')}>
              <a href="/expect/consent">{t('nav.consent')}</a>
              <a href="/expect/donate">{t('nav.donate')}</a>
              <a href="/expect/testing">{t('nav.testing')}</a>
            </MenuGroup>
            <MenuGroup title="Your participation" active={loc.includes('participation')}>
              <a href="/participation/activate">{t('nav.activate')}</a>
              <a href="/participation/privacy">{t('nav.privacy')}</a>
            </MenuGroup>
        </nav>
        )}

        {isMobile ? <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer}><MenuIcon /></IconButton> : <LoginButton />}
        
      </Box>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <nav>
          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("about")}
            active={loc.includes('about')}
            name={t('nav.topLevel.about')}
            id="about"
          >
            <a onClick={closeMenu} href="/about">{t('nav.about')}</a>
            <a onClick={closeMenu} href="/about/eligibility">{t('nav.eligibility')}</a>
            <a onClick={closeMenu} href="/about/research">{t('nav.research')}</a>
          </ExpansionMenu>

          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("expect")}
            active={loc.includes('expect')}
            name={t('nav.topLevel.expect')}
            id="expect"
          >
            <a onClick={closeMenu} href="/expect/consent">{t('nav.consent')}</a>
            <a onClick={closeMenu} href="/expect/donate">{t('nav.donate')}</a>
            <a onClick={closeMenu} href="/expect/testing">{t('nav.testing')}</a>
          </ExpansionMenu>

          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("participation")}
            active={loc.includes('participation')}
            name={t('nav.topLevel.participation')}
            id="participation"
          >
            <a onClick={closeMenu} href="/participation/activate">{t('nav.activate')}</a>
            <a onClick={closeMenu} href="/participation/privacy">{t('nav.privacy')}</a>
          </ExpansionMenu>
        </nav>
      </Drawer>
      )}
    </Container>
  )
}

export default Header