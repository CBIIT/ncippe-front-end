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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MenuRounded as MenuIcon } from '@material-ui/icons'
import { Link as RouterLink } from "@reach/router"

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup';
import ExpansionList from '../../ExpansionList/ExpansionList'

const useStyles = makeStyles(theme => ({
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

    setMenuOpen(prev => !prev);
  };


  return (
    <Container component="header">
      <Typography className={classes.root} component="div">
        <Box className={classes.appToolbarContainer}>
          <figure className={classes.toolbarLogo}>
            <Link component={RouterLink} to='/'>
              <img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} alt='NCI PPE logo' title='NCI Patient and Provider Engagement Portal' />
            </Link>
          </figure>
          {!isMobile && (
            <nav className={classes.publicNavDesktop}>
              <MenuGroup title="About">
                <a href="/about">About the Biobank</a>
                <a href="/eligibility">Eligibility and locations</a>
                <a href="/research">Biobanking drives research</a>
              </MenuGroup>
              <MenuGroup title="What to expect">
                <a href="/consent">Give your consent</a>
                <a href="/donate">Donate samples</a>
                <a href="/test">Get a biomarker test</a>
              </MenuGroup>
              <MenuGroup title="Your participation">
                <a href="/activate">Activate your account</a>
                <a href="/participation">Manage your participation</a>
                <a href="/privacy">Protecting your privacy</a>
              </MenuGroup>
          </nav>
          )}

          {isMobile ? <IconButton aria-label="menu" onClick={toggleDrawer}><MenuIcon /></IconButton> : <LoginButton />}
          
        </Box>
      </Typography>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <nav>
          <ExpansionList
            name="About"
          >
            <MenuItem><a href="/about">About the Biobank</a></MenuItem>
            <MenuItem><a href="/eligibility">Eligibility and locations</a></MenuItem>
            <MenuItem><a href="/research">Biobanking drives research</a></MenuItem>
          </ExpansionList>

          <ExpansionList
            name="What to expect"
          >
            <MenuItem><a href="/consent">Give your consent</a></MenuItem>
            <MenuItem><a href="/donate">Donate samples</a></MenuItem>
            <MenuItem><a href="/test">Get a biomarker test</a></MenuItem>
          </ExpansionList>
          
          <ExpansionList
            name="Your participation"
          >
            <MenuItem><a href="/activate">Activate your account</a></MenuItem>
            <MenuItem><a href="/participation">Manage your participation</a></MenuItem>
            <MenuItem><a href="/privacy">Protecting your privacy</a></MenuItem>
          </ExpansionList>
        </nav>
      </Drawer>
      )}
    </Container>
  )
}

export default Header