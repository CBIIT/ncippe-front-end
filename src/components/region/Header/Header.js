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
    minHeight: 68,
    height: 68,
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    
    // [theme.breakpoints.up('smLandscape')]: {
    //   marginTop: 0,
    //   marginBottom: 0,
    // }
    // padding: 0
    [theme.breakpoints.up('sm')]: {
      minHeight: 76,
      height: 76,
    }
  },
  toolbarLogo: {
    flexGrow: 1,
    maxHeight: 32,
    margin: 0,
    
    '& img': {
      height: 32,
      width: 'auto',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 40,
      '& img': {
        height: 40,
      }
    }
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
  subNav: {
    "& span": {
      paddingLeft: theme.spacing(2),
    }
  },
  menuIcon: {
    "& svg": {
      fontSize: "2rem"
    }
  },
  closeMobileMenu: {
    textAlign: 'right',
    borderBottom: '2px solid #dbdada'
  },
  mobileLogin: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: theme.palette.grey.xlight,
    padding: theme.spacing(2,7),
    boxShadow: "0px 5px 15px -5px rgba(0,0,0,0.2)"
  },
  mobileSearch: {
    // backgroundColor: theme.palette.grey.xlight,
    padding: theme.spacing(3,2),
    textAlign: 'right',
    // borderBottom: '2px solid #dbdada',
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
    margin: theme.spacing(0, -1, 0, -3),
    padding: theme.spacing(.75, 0),
    '& a': {
      cursor: "pointer",
      fontSize: 12,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: 'normal',
      lineHeight: 'normal'
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
      events: 'event26',
      eventName: 'TopNavHamburger'
    })
  }

  const closeMenu = (event) => {
    setMenuOpen(prev => !prev)
    if(!event.target.closest('#closeMobileMenu')){
      trackEvent({
        prop53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
        eVar53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
        events:'event28',
        eventName: 'TopNavHamburger'
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
      events: "event2",
      eventName: 'GlobalMobileSearch'
    })
    navigate('/search', {state: {
      term: searchTerm
    }})
  }

  const trackClick = (e) => {
    trackEvent({
      prop53: 'BioBank_TopNav|Logo',
      eVar53: 'BioBank_TopNav|Logo',
      events: 'event26',
      eventName: 'TopNavLogo'
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
            <img src={`/${process.env.PUBLIC_URL}assets/images/biobank-logo${i18n.languages[0] === 'es' ? '-es' : ''}.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </figure>
        {!isMobile && !loc.includes('account') && (
          <nav className={classes.publicNavDesktop} id="mainNav">
            {/* TODO: loop through nav object and dynamically render menu items */}
            {/* TODO: routes need to be added to translations in order to perform loop logic - or generated from translation key */}
            <MenuGroup title={t('nav.about')} active={loc.includes('about')} id="about">
              <a href="/about">{t('nav.about_subNav.about')}</a>
              <a href="/about/eligibility">{t('nav.about_subNav.eligibility')}</a>
            </MenuGroup>
            <MenuGroup title={t('nav.expect')} active={loc.includes('expect')} id="expect">
              <a href="/expect/consent">{t('nav.expect_subNav.consent')}</a>
              <a href="/expect/donate">{t('nav.expect_subNav.donate')}</a>
              <a href="/expect/testing">{t('nav.expect_subNav.testing')}</a>
            </MenuGroup>
            <MenuGroup title={t('nav.participation')} active={loc.includes('participation')} id="participation">
              <a href="/participation/activate">{t('nav.participation_subNav.activate')}</a>
              <a href="/participation/privacy">{t('nav.participation_subNav.privacy')}</a>
            </MenuGroup>
            {/* <MenuGroup title={t('nav.research')} active={loc.includes('research')} id="research">
              <a href="/research">{t('nav.research_subNav.0')}</a>
              <a className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.0')}</a>
              <a className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.1')}</a>
              <a className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.2')}</a>
            </MenuGroup> */}
            <Search />
          </nav>
        )}

        {isMobile ? <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer} className={classes.menuIcon}><MenuIcon /></IconButton> : <LoginButton />}
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
          {/* TODO: loop through nav object and dynamically render menu items */}
          {!loc.includes('account') && <>
            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("about")}
              active={loc.includes('about')}
              name={t('nav.about')}
              id="about"
            >
              <a onClick={closeMenu} href="/about">{t('nav.about_subNav.about')}</a>
              <a onClick={closeMenu} href="/about/eligibility">{t('nav.about_subNav.eligibility')}</a>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("expect")}
              active={loc.includes('expect')}
              name={t('nav.expect')}
              id="expect"
            >
              <a onClick={closeMenu} href="/expect/consent">{t('nav.expect_subNav.consent')}</a>
              <a onClick={closeMenu} href="/expect/donate">{t('nav.expect_subNav.donate')}</a>
              <a onClick={closeMenu} href="/expect/testing">{t('nav.expect_subNav.testing')}</a>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("participation")}
              active={loc.includes('participation')}
              name={t('nav.participation')}
              id="participation"
            >
              <a onClick={closeMenu} href="/participation/activate">{t('nav.participation_subNav.activate')}</a>
              <a onClick={closeMenu} href="/participation/privacy">{t('nav.participation_subNav.privacy')}</a>
            </ExpansionMenu>

            {/* <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("research")}
              active={loc.includes('research')}
              name={t('nav.research')}
              id="research"
            >
              <a onClick={closeMenu} href="/research">{t('nav.research_subNav.0')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.0')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.1')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.2')}</a>
            </ExpansionMenu> */}

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
          </>
          }
        </nav>
      </Drawer>
      )}
      {/* Spanish language toggle */}
      {/* {!loc.includes('account') && <Box className={classes.languageToggle}>
        <Button href="#" color="primary" onClick={toggleLang}>{t('links.language_toggle')}</Button>
      </Box>
      } */}
    </Container>
  )
}

export default Header