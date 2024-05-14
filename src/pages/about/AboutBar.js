import React from 'react'
import { Link as RouterLink } from '@reach/router'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
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
}),{name: 'TabAboutBar'})

const TabAboutBar = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

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
    <Container className={classes.appbarContainer}>
      <AppBar className={classes.appbar} position="static" elevation={0}>
        <StyledTabs
          id="tabAboutBar"
          value={props.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons={isMobile ? 'on' : 'auto'}
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