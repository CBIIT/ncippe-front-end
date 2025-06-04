import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { AppBar, Container, Tab, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import StyledTabs from '../../components/Tabs/StyledTabs'

const TabAboutBar = ({value}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event) => {
    PubSub.publish('ANALYTICS', {
      events: 'event34',
      eventName: 'AboutSectionTabNav',
      prop53: `BioBank_AboutSectionTabNav|${event.currentTarget.textContent}`,
      eVar53: `BioBank_AboutSectionTabNav|${event.currentTarget.textContent}`,
    })
    window.$defaultLinkTrack = false
  }
 
  return (
    <Container sx={{  px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, py:0, mb: 5 }}>
      <AppBar sx={{ bgcolor: theme => theme.palette.primary.medium,  }} 
      position="static" elevation={0}>
        <StyledTabs
          id="tabAboutBar"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons={isMobile ? true : 'auto'}
          aria-label="scrollable auto tabs"
        >
          <Tab disableRipple component={RouterLink} to="/about" label={t('tabs.about.abouts')} />
          <Tab disableRipple component={RouterLink} to="/about/eligibility" label={t('tabs.about.eligibility')} />
          <Tab disableRipple component={RouterLink} to="/about/news" label={t('tabs.about.news')} />
          <Tab disableRipple component={RouterLink} to="/about/studyprogress" label={t('tabs.about.studyprogress')} />
        </StyledTabs>
      </AppBar>
    </Container>
  )
}

export default TabAboutBar