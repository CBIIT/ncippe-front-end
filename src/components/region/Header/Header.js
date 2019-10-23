import React, { useState, useEffect } from 'react';
import { 
  Box,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  Link,
  Typography, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { MenuRounded as MenuIcon } from '@material-ui/icons'
import { Link as RouterLink } from "@reach/router"

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
      fontWeight: 'normal'
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
            <img src={`/${process.env.PUBLIC_URL}assets/images/biobank-logo.svg`} alt='NCI Cancer Moonshot Biobank logo' title='NCI Cancer Moonshot Biobank' />
          </Link>
        </figure>
        {!isMobile && (
          <nav className={classes.publicNavDesktop}>
            <MenuGroup title="About" active={loc.includes('about')}>
              <a href="/about">About the Biobank</a>
              <a href="/about/eligibility">Eligibility and locations</a>
              <a href="/about/research">Biobanking drives research</a>
            </MenuGroup>
            <MenuGroup title="What to expect" active={loc.includes('expect')}>
              <a href="/expect/consent">Give your consent</a>
              <a href="/expect/donate">Donate samples</a>
              <a href="/expect/testing">Get a biomarker test</a>
            </MenuGroup>
            <MenuGroup title="Your participation" active={loc.includes('participation')}>
              <a href="/participation/activate">Activate your account</a>
              <a href="/participation/manage">Manage your participation</a>
              <a href="/participation/privacy">Protecting your privacy</a>
            </MenuGroup>
        </nav>
        )}

        {isMobile ? <IconButton aria-label="menu" onClick={toggleDrawer}><MenuIcon /></IconButton> : <LoginButton />}
        
      </Box>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <nav>
          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("about")}
            active={loc.includes('about')}
            name="About"
            id="about"
          >
            <a onClick={closeMenu} href="/about">About the Biobank</a>
            <a onClick={closeMenu} href="/about/eligibility">Eligibility and locations</a>
            <a onClick={closeMenu} href="/about/research">Biobanking drives research</a>
          </ExpansionMenu>

          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("expect")}
            active={loc.includes('expect')}
            name="What to expect"
            id="expect"
          >
            <a onClick={closeMenu} href="/expect/consent">Give your consent</a>
            <a onClick={closeMenu} href="/expect/donate">Donate samples</a>
            <a onClick={closeMenu} href="/expect/testing">Get a biomarker test</a>
          </ExpansionMenu>

          <ExpansionMenu
            handleClick={expandPanel}
            expanded={expanded.includes("participation")}
            active={loc.includes('participation')}
            name="Your participation"
            id="participation"
          >
            <a onClick={closeMenu} href="/participation/activate">Activate your account</a>
            <a onClick={closeMenu} href="/participation/participation">Manage your participation</a>
            <a onClick={closeMenu} href="/participation/privacy">Protecting your privacy</a>
          </ExpansionMenu>
        </nav>
      </Drawer>
      )}
    </Container>
  )
}

export default Header