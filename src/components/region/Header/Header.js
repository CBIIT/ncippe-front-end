import React, { useState } from 'react'
import { Link as RouterLink, navigate } from "@reach/router"
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
  useMediaQuery
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  MenuRounded as MenuIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@material-ui/icons'
import moment from 'moment'

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup'
import ExpansionMenu from '../../ExpansionMenu'
import Search from '../../Search/Search'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0,1 ,0),
  },
  avatar:{
    width:16,
    height:11,
    alignItems: 'center',
  },
  banner:{
    padding: theme.spacing(1,2,1,2),
    display: 'flex',

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
    },

    [theme.breakpoints.up('smLandscape')]: {
      paddingRight: theme.spacing(3)
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
    minHeight: 76,
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
    margin: theme.spacing(0, -3, 0, -3),
    padding: theme.spacing(.75, 3),
    '& a': {
      cursor: "pointer",
      fontSize: 16,
      fontFamily: theme.typography.body1.fontFamily,
      fontWeight: 'Bold',
      lineHeight: 'normal'
    }
  }
}),{name: 'Header'})

/**
 * Common site header component
 * 
 * conditionally renders desktop or mobile menu with site search and language toggle bar
 * note: articles have been hidden until approved for release
 * note: language bar has been disabled until Spanish translations are approved
 * 
 */
const Header = () => {
  const classes = useStyles()
  const loc = window.location.pathname
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(loc)
  const [isDisabled, setIsDisabled] = useState(true)
  const { t, i18n } = useTranslation('common')
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
    <Container component="header" className={classes.root} id="appHeader">

       {/* Spanish language toggle */}
       {!loc.includes('account') && 
       <Box style={{backgroundColor:'#f0f0f0', }} >
        <Grid  container direction="row" justifyContent="space-between" className={classes.banner}>
          <Grid item   >
            <Box style={{display: "flex", alignItems: "center"}} direction="row">
            <Avatar variant="square" src={`${process.env.PUBLIC_URL}/assets/images/us_flag.png`}  
              alt="USA flag" className={classes.avatar} >  </Avatar>
            <Button variant="contained" href="#" disabled
              style={{backgroundColor:'#f0f0f0', color:'#1b1b1b',fontFamily:'Open Sans', fontSize:14, fontWeight: 400,  }} 
              >{t('links.banner')}</Button>
            </Box>
          </Grid>
          <Grid item  >
            <Button  variant="contained" href="#" justifyContent="flex-end"
            style={{backgroundColor:'#298085', color:'white',fontFamily:'Open Sans', fontSize:14, fontWeight: 800, }} 
            onClick={toggleLang}>{t('links.language_toggle')}</Button>
          </Grid>
        </Grid>
      </Box>
      }

      <Box className={classes.appToolbarContainer}>
        <figure className={classes.toolbarLogo}>
          <Link component={RouterLink} to='/' onClick={trackClick}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/biobank-logo${i18n.languages[0] === 'es' ? '-es' : ''}.svg`} alt={t('logo.alt_text')} title={t('logo.title')} />
          </Link>
        </figure>
        {!isMobile && !loc.includes('account') && (
          <nav className={classes.publicNavDesktop} id="mainNav">
            {/* TODO: loop through nav object and dynamically render menu items */}
            {/* TODO: routes need to be added to translations in order to perform loop logic - or generated from translation key */}
            <MenuGroup menuText={t('nav.about')} active={loc.includes('about')} index="about">
              <a href="/about">{t('nav.about_subNav.about')}</a>
              <a href="/about/eligibility">{t('nav.about_subNav.eligibility')}</a>
              {/* <a href="/about/research">{t('nav.research')}</a> */}
              <a href="/about/news">{t('nav.about_subNav.news')}</a>
              <a href="/about/studyprogress">{t('nav.about_subNav.studyprogress')}</a>
            </MenuGroup>
            <MenuGroup menuText={t('nav.expect')} active={loc.includes('expect')} index="expect">
              <a href="/expect/consent">{t('nav.expect_subNav.consent')}</a>
              <a href="/expect/donate">{t('nav.expect_subNav.donate')}</a>
              <a href="/expect/testing">{t('nav.expect_subNav.testing')}</a>
            </MenuGroup>
            <MenuGroup menuText={t('nav.participation')} active={loc.includes('participation')} index="participation">
              <a href="/participation/activate">{t('nav.participation_subNav.activate')}</a>
              <a href="/participation/privacy">{t('nav.participation_subNav.privacy')}</a>
            </MenuGroup>
            <MenuGroup menuText={t('nav.research')} active={loc.includes('research')} index="research">
              <a href="/research">{t('nav.research_subNav.0')}</a>
              <a className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.0')}</a>
              <a className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.1')}</a>
              <a className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.2')}</a>
            </MenuGroup>
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
              menuText={t('nav.about')}
              index="about"
            >
              <a onClick={closeMenu} href="/about">{t('nav.about_subNav.about')}</a>
              <a onClick={closeMenu} href="/about/eligibility">{t('nav.about_subNav.eligibility')}</a>

              {/* <a onClick={closeMenu} href="/about/research">{t('nav.research')}</a> */}
              <a onClick={closeMenu} href="/about/news">{t('nav.about_subNav.news')}</a>
              <a onClick={closeMenu} href="/about/studyprogress">{t('nav.about_subNav.studyprogress')}</a>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("expect")}
              active={loc.includes('expect')}
              menuText={t('nav.expect')}
              index="expect"
            >
              <a onClick={closeMenu} href="/expect/consent">{t('nav.expect_subNav.consent')}</a>
              <a onClick={closeMenu} href="/expect/donate">{t('nav.expect_subNav.donate')}</a>
              <a onClick={closeMenu} href="/expect/testing">{t('nav.expect_subNav.testing')}</a>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("participation")}
              active={loc.includes('participation')}
              menuText={t('nav.participation')}
              index="participation"
            >
              <a onClick={closeMenu} href="/participation/activate">{t('nav.participation_subNav.activate')}</a>
              <a onClick={closeMenu} href="/participation/privacy">{t('nav.participation_subNav.privacy')}</a>
            </ExpansionMenu>

            <ExpansionMenu
              handleClick={expandPanel}
              expanded={expanded.includes("research")}
              active={loc.includes('research')}
              menuText={t('nav.research')}
              index="research"
            >
              <a onClick={closeMenu} href="/research">{t('nav.research_subNav.0')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/tyner-acute-myeloid">{t('nav.research_subNav.0_subNav.0')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/blakely-improving-responses">{t('nav.research_subNav.0_subNav.1')}</a>
              <a onClick={closeMenu} className={classes.subNav} href="/research/kuo-interactions-environment">{t('nav.research_subNav.0_subNav.2')}</a>
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
          </>
          }
        </nav>
      </Drawer>
      )}
     
      
    </Container>
  )
}

export default Header