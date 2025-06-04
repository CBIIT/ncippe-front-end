import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { 
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  useMediaQuery, styled, useTheme
} from '@mui/material'
import { 
  MenuRounded as MenuIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material'

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup';
import ExpansionMenu from '../../ExpansionMenu'
import Search from '../../Search/Search'

const HeaderRootSx = styled(Container)(({ theme }) => ({
padding: theme.spacing(1, 0),
}));

const LanguageToggleSx = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  backgroundImage: theme.gradients.lightBlue,
  margin: theme.spacing(0, -3),
  padding: theme.spacing(0.75, 3),
  '& a': {
    cursor: 'pointer',
    fontSize: 16,
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
}));

const PublicNavDesktopSx = styled('nav')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  margin: theme.spacing(0, 2),
  minHeight: 76,
  '& button': {
    fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
  },
  '& button:hover': {
    backgroundColor: 'transparent',
  },
}));

const ToolbarLogoSx = styled('figure')(({ theme }) => ({
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
    },
  },
}));

const Header = () => {
  const loc = window.location.pathname
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(loc)
  const [isDisabled, setIsDisabled] = useState(true)
  const { t, i18n } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.smLandscape))
  const navigate = useNavigate()
  const toggleDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(prev => !prev)
  }

  const expandPanel = (event, newExpanded) => {
    const id = event.currentTarget.id
    setExpanded(newExpanded ? id : "")
    PubSub.publish('ANALYTICS', {
      events: 'event26',
      eventName: 'TopNavHamburger',
      prop53: `BioBank_TopNav|${event.target.textContent}`,
      eVar53: `BioBank_TopNav|${event.target.textContent}`,
    })
  }

  const closeMenu = (event) => {
    setMenuOpen(prev => !prev)
    if(!event.target.closest('#closeMobileMenu')){
      PubSub.publish('ANALYTICS', {
        events:'event28',
        eventName: 'TopNavHamburger',
        prop53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
        eVar53: `BioBank_TopNav|${event.target.closest("ul").dataset.panelgroup}|${event.target.textContent}`,
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
    PubSub.publish('ANALYTICS', {
      events: "event2",
      eventName: 'GlobalMobileSearch',
      prop11: "BioBank Global Search",
      eVar11: "BioBank Global Search",
      eVar13: "+1",
      prop14: searchTerm,
      eVar14: searchTerm,
    })
    navigate('/search', {state: {
      term: searchTerm
    }})
  }

  const trackClick = (e) => {
    PubSub.publish('ANALYTICS', {
      events: 'event26',
      eventName: 'TopNavLogo',
      prop53: 'BioBank_TopNav|Logo',
      eVar53: 'BioBank_TopNav|Logo',
    })
  }

  const toggleLang = (e) => {
    e.preventDefault()
    const newLang = i18n.languages[0] === 'en' ? "es" : "en"
    i18n.changeLanguage(newLang)
  }

  return (
    <HeaderRootSx component="header" id="appHeader">
      <Box sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: { xs: 68, sm: 76 },
          height: { xs: 68, sm: 76 },
          pr: { xs: 1, smLandscape: 3 },
        }}>
        <ToolbarLogoSx >
          <Link component={RouterLink} to='/' onClick={trackClick}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/biobank-logo${i18n.languages[0] === 'es' ? '-es' : ''}.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </ToolbarLogoSx>
        {!isMobile && !loc.includes('account') && (
          <PublicNavDesktopSx id="mainNav">
            {/* TODO: loop through nav object and dynamically render menu items */}
            {/* TODO: routes need to be added to translations in order to perform loop logic - or generated from translation key */}
            <MenuGroup menuText={t('nav.about')} active={loc.includes('about')} id="about">
              <RouterLink to="/about">{t('nav.about_subNav.about')}</RouterLink>
              <RouterLink to="/about/eligibility">{t('nav.about_subNav.eligibility')}</RouterLink>
              <RouterLink to="/about/studyprogress">{t('nav.about_subNav.studyprogress')}</RouterLink>
            </MenuGroup>
            <MenuGroup menuText={t('nav.expect')} active={loc.includes('expect')} id="expect">
              <RouterLink to="/expect/consent">{t('nav.expect_subNav.consent')}</RouterLink>
              <RouterLink to="/expect/donate">{t('nav.expect_subNav.donate')}</RouterLink>
              <RouterLink to="/expect/testing">{t('nav.expect_subNav.testing')}</RouterLink>
            </MenuGroup>
            <MenuGroup menuText={t('nav.participation')} active={loc.includes('participation')} id="participation">
              <RouterLink to="/participation/activate">{t('nav.participation_subNav.activate')}</RouterLink>
              <RouterLink to="/participation/privacy">{t('nav.participation_subNav.privacy')}</RouterLink>
            </MenuGroup>
            <MenuGroup menuText={t('nav.research')} active={loc.includes('research')} id="research">
              <RouterLink to="/research">{t('nav.research_subNav.0')}</RouterLink>
              {/* <a className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.0')}</a>
              <a className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.1')}</a>
              <a className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.2')}</a> */}
            </MenuGroup>
            <Search />
          </PublicNavDesktopSx>
        )}

        {isMobile ? <IconButton
          aria-label={t('aria.menu')}
          onClick={toggleDrawer}
          size="large"><MenuIcon /></IconButton> : <LoginButton />}
        {/* {isMobile && <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer}><MenuIcon /></IconButton>} */}
        
      </Box>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <Box sx={{ textAlign: 'right', borderBottom: '2px solid #dbdada' }}>
          <IconButton
            aria-label={t('button.close')}
            onClick={closeMenu}
            id="closeMobileMenu"
            size="large"><ClearIcon /></IconButton>
        </Box>
        <nav id="mainNav--mobile">
          <Box sx={{
              display: 'flex', flexDirection: 'column', p: 2, px: 7,
              boxShadow: "0px 5px 15px -5px rgba(0,0,0,0.2)"
            }}>
            <LoginButton />
          </Box>
          {/* TODO: loop through nav object and dynamically render menu items */}
          {!loc.includes('account') && <>
            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("about")}
              active={loc.includes('about')}
              menuText={t('nav.about')}
              id="about"
            >
              <RouterLink to="/about" onClick={closeMenu}>{t('nav.about_subNav.about')}</RouterLink>
              <RouterLink to="/about/eligibility" onClick={closeMenu}>{t('nav.about_subNav.eligibility')}</RouterLink>
              <RouterLink to="/about/news" onClick={closeMenu}>{t('nav.about_subNav.news')}</RouterLink>
              <RouterLink to="/about/studyprogress" onClick={closeMenu}>{t('nav.about_subNav.studyprogress')}</RouterLink>

            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("expect")}
              active={loc.includes('expect')}
              menuText={t('nav.expect')}
              id="expect"
            >
              <RouterLink to="/expect/consent" onClick={closeMenu}>{t('nav.expect_subNav.consent')}</RouterLink>
              <RouterLink to="/expect/donate" onClick={closeMenu}>{t('nav.expect_subNav.donate')}</RouterLink>
              <RouterLink to="/expect/testing" onClick={closeMenu}>{t('nav.expect_subNav.testing')}</RouterLink>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("participation")}
              active={loc.includes('participation')}
              menuText={t('nav.participation')}
              id="participation"
            >
              <RouterLink to="/participation/activate" onClick={closeMenu}>{t('nav.participation_subNav.activate')}</RouterLink>
              <RouterLink to="/participation/privacy" onClick={closeMenu} >{t('nav.participation_subNav.privacy')}</RouterLink>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("research")}
              active={loc.includes('research')}
              menuText={t('nav.research')}
              id="research"
            >
              <RouterLink to="/research" onClick={closeMenu}>{t('nav.research_subNav.0')}</RouterLink>
              {/* <a onClick={closeMenu} className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.0')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.1')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.2')}</a> */}
            </ExpansionMenu>

            <Box sx={{
                p: 3, pt: 3, textAlign: 'right',
                '& .MuiFormControl-root': { width: '100%' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.grey.medium,
                },
                '& button': { mt: 2 }
              }} component="form" onSubmit={handleSearchSubmit}>
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
      {!loc.includes('account') && <LanguageToggleSx>
        <Button href="#" color="primary" onClick={toggleLang}>{t('links.language_toggle')}</Button>
      </LanguageToggleSx>
      }
    </HeaderRootSx>
  );
}

export default Header