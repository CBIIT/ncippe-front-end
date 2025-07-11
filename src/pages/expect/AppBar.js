import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { AppBar, Container, Tab, useMediaQuery, useTheme } from '@mui/material'
import StyledTabs from '../../components/Tabs/StyledTabs'

const TabAppBar = ({value}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const handleChange = (event) => {
    PubSub.publish('ANALYTICS', {
      events: 'event33',
      eventName: 'SectionTabNav',
      prop53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
      eVar53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
    })
    window.$defaultLinkTrack = false
  }
 
  return (
    <Container maxWidth="lg" disableGutters sx={{ overflowX: 'auto', px: 0, py:0, mb: 5  }} >
      <AppBar sx={{ backgroundColor: theme => theme.palette.primary.medium,}} position="static" elevation={0}>
      <StyledTabs id="tabExpectBar" value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons={isMobile ? true : 'auto'}
        aria-label="scrollable auto tabs">
          <Tab disableRipple component={RouterLink} to="/expect/consent" label={t('tabs.expect.consent')} />
          <Tab disableRipple component={RouterLink} to="/expect/donate" label={t('tabs.expect.donate')} />
          <Tab disableRipple component={RouterLink} to="/expect/testing" label={t('tabs.expect.testing')} />
        </StyledTabs>
      </AppBar>
    </Container>
  )
}

export default TabAppBar