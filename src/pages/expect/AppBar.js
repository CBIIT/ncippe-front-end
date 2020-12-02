import React from 'react'
import { Link as RouterLink } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { AppBar, Container, Tab, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import StyledTabs from '../../components/Tabs/StyledTabs'

const useStyles = makeStyles( theme => ({
  appbarContainer: {
    padding: 0,
    marginBottom: theme.spacing(5)
  },
  appbar: {
    backgroundColor: theme.palette.primary.medium,
    zIndex: 5
  },
}),{name: 'TabAppBar'})

const TabAppBar = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleChange = (event) => {
    trackEvent({
      prop53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
      eVar53: `BioBank_SectionTabNav|${event.currentTarget.textContent}`,
      events: 'event33',
      eventName: 'SectionTabNav'
    })
    window.$defaultLinkTrack = false
  }

  return (
    <Container className={classes.appbarContainer}>
      <AppBar className={classes.appbar} position="static" elevation={0}>
        <StyledTabs
          id="tabBar"
          value={props.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons={isMobile ? 'on' : 'auto'}
          aria-label="scrollable auto tabs"
        >
          <Tab disableRipple component={RouterLink} to="/expect/consent" label={t('tabs.expect.consent')} />
          <Tab disableRipple component={RouterLink} to="/expect/donate" label={t('tabs.expect.donate')} />
          <Tab disableRipple component={RouterLink} to="/expect/testing" label={t('tabs.expect.testing')} />
        </StyledTabs>
      </AppBar>
    </Container>
  )
}

export default TabAppBar