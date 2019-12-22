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
    zIndex: 1
  },
}))

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
      events: 'event33'
    })
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
          {/* Reverse the order of the tabs for arrows to display properly */}
          {/* New tabs will become index 0 and other existing tabs must be bumpped up a number */}
          {/* Update {value} default state index as well */}
          <Tab disableRipple component={RouterLink} to="/expect/testing" label={t('common:tabs.expect.testing')} />
          <Tab disableRipple component={RouterLink} to="/expect/donate" label={t('common:tabs.expect.donate')} />
          <Tab disableRipple component={RouterLink} to="/expect/consent" label={t('common:tabs.expect.consent')} />
        </StyledTabs>
      </AppBar>
    </Container>
  )
}

export default TabAppBar