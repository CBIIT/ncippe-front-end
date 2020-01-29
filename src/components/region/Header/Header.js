import React, { useState } from 'react'
import { Link as RouterLink, navigate } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { 
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  useMediaQuery
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  MenuRounded as MenuIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@material-ui/icons'

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup';
import ExpansionMenu from '../../ExpansionMenu/ExpansionMenu'
import Search from '../../Search/Search'

const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('smLandscape')]: {
      paddingRight: theme.spacing(3)
    }
  },
  appToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    
    [theme.breakpoints.up('smLandscape')]: {
      marginTop: 0,
      marginBottom: 0,
    }
    // padding: 0
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
  closeMobileMenu: {
    textAlign: 'right',
    borderBottom: '1px solid #dbdada'
  },
  mobileLogin: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey.xlight,
    padding: theme.spacing(2,7),
  },
  mobileSearch: {
    backgroundColor: theme.palette.grey.xlight,
    padding: theme.spacing(3,2),
    textAlign: 'right',
    borderBottom: '1px solid #dbdada',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.medium,
    },
    '& button': {
      margin: theme.spacing(2,0,0)
    }
  },
  languageToggle: {
    textAlign: "right",
    backgroundImage: theme.gradients.lightBlue,
    margin: theme.spacing(0, -3, 0, -4),
    paddingRight: theme.spacing(3),
    '& a': {
      cursor: "pointer",
      fontSize: "90%"
    }
  }
}))

const Header = () => {
  const classes = useStyles()
  const loc = window.location.pathname
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(loc)
  const [isDisabled, setIsDisabled] = useState(true)
  const { t, i18n } = useTranslation('common')
  const { trackEvent } = useTracking()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.smLandscape))

  const toggleDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(prev => !prev)
  }

  const expandPanel = (event, newExpanded) => {
    const id = event.currentTarget.id
    setExpanded(newExpanded ? id : "")
    trackEvent({
      prop53: `BioBank_TopNav|${event.target.textContent}`,
      eVar53: `BioBank_TopNav|${event.target.textContent}`,
      events: 'event26'
    })
  }

  const closeMenu = (event) => {
    setMenuOpen(prev => !prev)
    if(!event.target.closest('#closeMobileMenu')){
      trackEvent({
        prop53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
        eVar53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
        events:'event28'
      })
    }
  }

  const handleSearchInputChange = (e) => {
    const input = e.target.value
    if(input.length > 1) {
      setIsDisabled(false)
    } else (
      setIsDisabled(true)
    )
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // send the search terms to the search results page
    const searchTerm = e.target.mobileSearch.value
    trackEvent({
      prop11: "BioBank Global Search",
      eVar11: "BioBank Global Search",
      eVar13: "+1",
      prop14: searchTerm,
      eVar14: searchTerm,
      events: "event2"
    })
    navigate('/search', {state: {
      term: searchTerm
    }})
  }

  const trackClick = (e) => {
    trackEvent({
      prop53: 'BioBank_TopNav|Logo',
      eVar53: 'BioBank_TopNav|Logo',
      events: 'event26'
    })
  }

  const toggleLang = (e) => {
    e.preventDefault()
    const newLang = i18n.languages[0] === 'en' ? "es" : "en"
    i18n.changeLanguage(newLang)
  }

  return (
    <Container component="header" className={classes.root} id="appHeader">
      <Box className={classes.appToolbarContainer}>
        <figure className={classes.toolbarLogo}>
          <Link component={RouterLink} to='/' onClick={trackClick}>
            <img src={`/${process.env.PUBLIC_URL}assets/images/biobank-logo.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </figure>
        {!isMobile && (
          <nav className={classes.publicNavDesktop} id="mainNav">
            <MenuGroup title={t('nav.topLevel.about')} active={loc.includes('about')} id="about">
              <a href="/about">{t('nav.about')}</a>
              <a href="/about/eligibility">{t('nav.eligibility')}</a>
              <a href="/about/research">{t('nav.research')}</a>
            </MenuGroup>
            <MenuGroup title={t('nav.topLevel.expect')} active={loc.includes('expect')} id="expect">
              <a href="/expect/consent">{t('nav.consent')}</a>
              <a href="/expect/donate">{t('nav.donate')}</a>
              <a href="/expect/testing">{t('nav.testing')}</a>
            </MenuGroup>
            <MenuGroup title={t('nav.topLevel.participation')} active={loc.includes('participation')} id="participation">
              <a href="/participation/activate">{t('nav.activate')}</a>
              <a href="/participation/privacy">{t('nav.privacy')}</a>
            </MenuGroup>
            <Search />
          </nav>
        )}

        {isMobile ? <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer}><MenuIcon /></IconButton> : <LoginButton />}
        {/* {isMobile && <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer}><MenuIcon /></IconButton>} */}
        
      </Box>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <Box className={classes.closeMobileMenu}>
          <IconButton aria-label={t('button.close')} onClick={closeMenu} id="closeMobileMenu"><ClearIcon /></IconButton>
        </Box>
        <nav id="mainNav--mobile">
          <Box className={classes.mobileLogin}>
            <LoginButton />
          </Box>
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
          <Box className={classes.mobileSearch} component="form" onSubmit={handleSearchSubmit}>
            <TextField
              placeholder={t('search.input_placeholder')}
              id="mobileSearch"
              inputProps={
                {'aria-label': t('search.input_placeholder')}
              }
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
              }}
              variant="outlined"
              onChange={handleSearchInputChange}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('buttons.search')}</Button>
          </Box>
        </nav>
      </Drawer>
      )}
      {!loc.includes('dashboard') && <Box className={classes.languageToggle}>
        <Link href="#" onClick={toggleLang}>{t('links.language_toggle')}</Link>
      </Box>
      }
    </Container>
  )
}

export default Header