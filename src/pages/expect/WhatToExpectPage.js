import React, { useEffect, useState } from 'react'
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom'
import { Box, Container, Tab, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import StyledTabs from '../../components/Tabs/StyledTabs'
import Consent from './Consent'
import Donate from './Donate'
import BiomarkerTest from './BiomarkerTest'
import TabAppBar from './AppBar'

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const WhatToExpectPage = () => {
  const theme = useTheme()
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
  console.log( " theme.zIndex.appBar value " + theme.zIndex.appBar)
  return (
    <Box component="article">
      <Container sx={{
      backgroundImage: theme => theme.gradients.primaryDiagonal,
      padding: theme => theme.spacing(4, 5),
      boxShadow: 'inset 0 -13px 13px -13px rgba(30,111,214,0.2)',
      '& h1': {
        fontSize: 22,
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
          fontSize: 26,
          textAlign: 'left',
        },
      },
    }}>
        <Typography variant="h2" component="h1">{t('about:landing_pageTitle')}</Typography>
      </Container>
      <Container sx={{ px:0, py:0  }}>
        <TabAppBar sx={{ backgroundColor: theme => theme.palette.primary.medium,  }} position="static" elevation={0}>
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
        </TabAppBar>
      </Container>
      <Container sx={{ mb: 2,backgroundColor: theme => theme.palette.background.paper,}}>
        <Routes>
          <Route path="consent" element={<Consent index={2} isMobile={isMobile} />} />
          <Route path="donate" element={<Donate index={1} isMobile={isMobile} />} />
          <Route path="testing" element={<BiomarkerTest index={0} isMobile={isMobile} />} />
          <Route path="*" element={<Consent index={2} isMobile={isMobile} />} />
        </Routes>  
      </Container>
    </Box>
  )
}

export default WhatToExpectPage