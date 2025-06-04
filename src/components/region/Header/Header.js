import React, { useState } from 'react'
import { Link as RouterLink, useNavigate, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { 
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme, styled } from '@mui/material/styles';
import { 
  MenuRounded as MenuIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material'
import moment from 'moment'

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup'
import ExpansionMenu from '../../ExpansionMenu'
import Search from '../../Search/Search'

const LanguageToggle = styled(Box)(({ theme }) => ({
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

const AppToolbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: 68,
  height: 68,
  [theme.breakpoints.up('sm')]: {
    minHeight: 76,
    height: 76,
  },
  [theme.breakpoints.up('smLandscape')]: {
    paddingRight: theme.spacing(3),
  },
}));

const ToolbarLogo = styled('figure')(({ theme }) => ({
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

const PublicNavDesktop = styled('nav')(({ theme }) => ({
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

const MobileLogin = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 7),
  boxShadow: '0px 5px 15px -5px rgba(0,0,0,0.2)',
}));

const MobileSearch = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'right',
  '& .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey.medium,
  },
  '& button': {
    margin: theme.spacing(2, 0, 0),
  },
}));

/**
 * Common site header component
 * 
 * conditionally renders desktop or mobile menu with site search and language toggle bar
 * note: articles have been hidden until approved for release
 * note: language bar has been disabled until Spanish translations are approved
 * 
 */
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
    moment.locale(newLang)
  }

  return (
    <>
    <Container component="header" id="appHeader" sx={{  px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, py:1}}>
      {/* Spanish language toggle */}
      {!loc.includes('account') && 
      <Box sx={{backgroundColor:'#f0f0f0', }} >
       <Grid  container direction="row" justifyContent="space-between" sx={{ p: 1, }} >
         <Grid >
           <Box sx={{display: "flex", alignItems: "center", backgroundColor: '#f0f0f0' }} direction="row">
            <Avatar variant="square" src={`${process.env.PUBLIC_URL}/assets/images/us_flag.png`}  
              alt="USA flag"  sx={{ width:32,height:22,mr:1, alignItems: 'center'}} >  </Avatar>
            <Button variant="contained"  disabled
              sx ={{  color: '#1b1b1b', fontFamily: 'Open Sans', fontSize: 14,fontWeight: 400,
        boxShadow: 'none', backgroundColor: '#f0f0f0', 
        '&.Mui-disabled': {color: '#1b1b1b',backgroundColor: '#f0f0f0', },}} 
              >{t('links.banner')}</Button>
           </Box>
         </Grid>
         <Grid>
           <Button  variant="contained"  justifycontent="flex-end"
           sx={{backgroundColor:'#298085', color:'white',fontFamily:'Open Sans', fontSize:14, fontWeight: 800, }} 
           onClick={toggleLang}>{t('links.language_toggle')}</Button>
         </Grid>
       </Grid>
     </Box>
     }
      <AppToolbarContainer >
        <ToolbarLogo >
          <Link component={RouterLink} to='/' onClick={trackClick}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/biobank-logo${i18n.languages[0] === 'es' ? '-es' : ''}.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </ToolbarLogo>
        {!isMobile && !loc.includes('account') && (
          <PublicNavDesktop  id="mainNav">
            {/* TODO: loop through nav object and dynamically render menu items */}
            {/* TODO: routes need to be added to translations in order to perform loop logic - or generated from translation key */}
            <MenuGroup menuText={t('nav.about')} active={loc.includes('about')} index="about">
              <Link component={RouterLink} to="/about">{t('nav.about_subNav.about')}</Link>
              <Link component={RouterLink} to="/about/eligibility">{t('nav.about_subNav.eligibility')}</Link>
              {/* <a href="/about/research">{t('nav.research')}</a> */}
              <Link component={RouterLink} to="/about/news">{t('nav.about_subNav.news')}</Link>
              <Link component={RouterLink} to="/about/studyprogress">{t('nav.about_subNav.studyprogress')}</Link>
            </MenuGroup>
            <MenuGroup menuText={t('nav.expect')} active={loc.includes('expect')} index="expect">
              <Link component={RouterLink} to="/expect/consent">{t('nav.expect_subNav.consent')}</Link>
              <Link component={RouterLink} to="/expect/donate">{t('nav.expect_subNav.donate')}</Link>
              <Link component={RouterLink} to="/expect/testing">{t('nav.expect_subNav.testing')}</Link>
            </MenuGroup>
            <MenuGroup menuText={t('nav.participation')} active={loc.includes('participation')} index="participation">
              <Link component={RouterLink} to="/participation/activate">{t('nav.participation_subNav.activate')}</Link>
              <Link component={RouterLink} to="/participation/privacy">{t('nav.participation_subNav.privacy')}</Link>
            </MenuGroup>
            <MenuGroup menuText={t('nav.research')} active={loc.includes('research')} index="research">
              <Link component={RouterLink} to="/research">{t('nav.research_subNav.0')}</Link>
              <Link component={RouterLink} className="subLink" to="/research/tyner-acute-myeloid">
              <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.0')}</Typography></Link>
              <Link component={RouterLink} className="subLink"to="/research/blakely-improving-responses">
              <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.1')}</Typography></Link>
              <Link component={RouterLink} className="subLink" to="/research/kuo-interactions-environment">
              <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.2')}</Typography></Link>
            </MenuGroup>
            <Search />
          </PublicNavDesktop>
        )}

        {isMobile ? <IconButton
          aria-label={t('aria.menu')}
          onClick={toggleDrawer}
          sx={{
            "& svg": {
              fontSize: "2rem"
            } }}
          size="large"><MenuIcon /></IconButton> : <LoginButton />}
        {/* {isMobile && <IconButton aria-label={t('aria.menu')} onClick={toggleDrawer}><MenuIcon /></IconButton>} */}
        
      </AppToolbarContainer>
      {isMobile && (
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer}>
        <Box sx={{ textAlign: 'right', borderBottom: '2px solid #dbdada'}}>
          <IconButton
            aria-label={t('button.close')}
            onClick={closeMenu}
            id="closeMobileMenu"
            size="large"><ClearIcon /></IconButton>
        </Box>
        <nav id="mainNav--mobile">
          <MobileLogin >
            <LoginButton />
          </MobileLogin>
          {/* TODO: loop through nav object and dynamically render menu items */}
          {!loc.includes('account') && <>
            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("about")}
              active={loc.includes('about')}
              menuText={t('nav.about')}
              index="about"
            >
              <Link component={RouterLink} to="/about" onClick={closeMenu} >{t('nav.about_subNav.about')}</Link>
              <Link component={RouterLink} to="/about/eligibility" onClick={closeMenu} >{t('nav.about_subNav.eligibility')}</Link>

              {/* <a onClick={closeMenu} to="/about/research">{t('nav.research')}</a> */}
              <Link component={RouterLink} to="/about/news" onClick={closeMenu} >{t('nav.about_subNav.news')}</Link>
              <Link component={RouterLink} to="/about/studyprogress" onClick={closeMenu} >{t('nav.about_subNav.studyprogress')}</Link>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("expect")}
              active={loc.includes('expect')}
              menuText={t('nav.expect')}
              index="expect"
            >
              <Link component={RouterLink} to="/expect/consent" onClick={closeMenu} >{t('nav.expect_subNav.consent')}</Link>
              <Link component={RouterLink} to="/expect/donate" onClick={closeMenu} >{t('nav.expect_subNav.donate')}</Link>
              <Link component={RouterLink} to="/expect/testing" onClick={closeMenu} >{t('nav.expect_subNav.testing')}</Link>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("participation")}
              active={loc.includes('participation')}
              menuText={t('nav.participation')}
              index="participation"
            >
              <Link component={RouterLink} to="/participation/activate" onClick={closeMenu}>{t('nav.participation_subNav.activate')}</Link>
              <Link component={RouterLink} to="/participation/privacy" onClick={closeMenu}>{t('nav.participation_subNav.privacy')}</Link>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("research")}
              active={loc.includes('research')}
              menuText={t('nav.research')}
              index="research"
            >
              <Link component={RouterLink} to="/research" onClick={closeMenu}>{t('nav.research_subNav.0')}</Link>
              <Link component={RouterLink} to="/research/tyner-acute-myeloid" onClick={closeMenu}  >
               <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.0')}</Typography></Link>
              <Link component={RouterLink} to="/research/blakely-improving-responses" onClick={closeMenu}  >
               <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.1')}</Typography></Link>
              <Link component={RouterLink} to="/research/kuo-interactions-environment" onClick={closeMenu} >
               <Typography sx={{ pl: 2 }}>{t('nav.research_subNav.0_subNav.2')}</Typography></Link>
            </ExpansionMenu>

            <MobileSearch  component="form" onSubmit={handleSearchSubmit}>
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
            </MobileSearch>
          </>
          }
        </nav>
      </Drawer>
      )}
    </Container>
    <Box component="main" sx={{ px: 2, py: 3 }}>
    <Outlet /> {/* 👈 Route content renders here */}
  </Box>
  </>
  );
}

export default Header