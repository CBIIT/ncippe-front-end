import React, { useEffect, useState } from 'react'
import { Router, Link as RouterLink } from '@reach/router'
import { AppBar, Box, Container, Tab, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import StyledTabs from '../../components/Tabs/StyledTabs'
import Consent from './Consent'
import Donate from './Donate'
import BiomarkerTest from './BiomarkerTest'

const useStyles = makeStyles( theme => ({
  pageHeader: {
    backgroundImage: theme.gradients.primaryDiagonal,
    padding: theme.spacing(4,5),
    boxShadow: 'inset 0 -13px 13px -13px rgba(30,111,214,0.2)',
    '& h1': {
      fontSize: 22,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        fontSize: 26,
        textAlign: 'left',
      }
    }
  },
  appbarContainer: {
    padding: 0,
  },
  appbar: {
    backgroundColor: theme.palette.primary.medium,
    zIndex: 1
  }
}),{name: 'WhatToExpectPage'})

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const WhatToExpectPage = () => {
  const classes = useStyles()
  const { t } = useTranslation(['consent','donate','testing'])
  const [value, setValue] = useState(()=>{
    switch(window.location.pathname){
      case '/expect':
        return 2
      case '/expect/donate':
        return 1
      case '/expect/testing':
        return 0
      default:
        return 2
    }
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    const resizeEvt = () => {
      setIsMobile(window.innerWidth < 600)
    }
    window.addEventListener('resize', resizeEvt, {passive: true})
    //clean up
    return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  },[isMobile])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    PubSub.publish('ANALYTICS', {
      events: 'event33',
      prop53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
      eVar53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
    })
  }

  return (
    <Box component="article">
      <Container className={classes.pageHeader}>
        <Typography variant="h2" component="h1">{t('about:landing_pageTitle')}</Typography>
      </Container>
      <Container className={classes.appbarContainer}>
        <AppBar className={classes.appbar} position="static" elevation={0}>
          <StyledTabs
            id="tabBar"
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons={isMobile ? 'on' : 'auto'}
            aria-label="scrollable auto tabs"
          >
            {/* Reverse the order of the tabs for arrows to display properly */}
            {/* New tabs will become index 0 and other existing tabs must be bumpped up a number */}
            {/* Update {value} default state index as well */}
            <Tab disableRipple component={RouterLink} to="testing" label={t('testing:pageTitle')} {...a11yProps(0)} />
            <Tab disableRipple component={RouterLink} to="donate" label={t('donate:pageTitle')} {...a11yProps(1)} />
            <Tab disableRipple component={RouterLink} to="consent" label={t('consent:pageTitle')} {...a11yProps(2)} />
          </StyledTabs>
        </AppBar>
      </Container>
      <Container className={classes.tabsContainer}>
        <Router primary={false}>
          <Consent index={2} isMobile={isMobile} path="/*" component="h2" />
          <Donate index={1} isMobile={isMobile} path="donate" component="h2" />
          <BiomarkerTest index={0} isMobile={isMobile} path="testing" component="h2" />
        </Router>
      </Container>
    </Box>
  )
}

export default WhatToExpectPage