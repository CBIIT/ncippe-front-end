import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import track, { useTracking } from 'react-tracking'
import RenderContent from '../../components/utils/RenderContent'

import FAQs from '../../components/FAQ/FAQ_Wrapper'
import TabPanel from '../../components/Tabs/TabPanel'

const useStyles = makeStyles( theme => ({
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  imgColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  bottomSpacer: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },
  extraSpacing: {
    '& h3': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(5)
      }
    }
  },
  img: {
    display: 'block',
    maxWidth: 410,
    '&:first-of-type': {
      marginBottom: theme.spacing(5)
    }
  },
  faqs: {
    marginLeft: theme.spacing(-7),
    width: `calc(100% + ${theme.spacing(14)}px)`
  }
}))

const Donate = (props) => {
  const {index, isMobile} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('donate')
  const { trackEvent } = useTracking()
  const faqs = i18n.getResourceBundle(i18n.languages[0],'donate').faqs

  useEffect(() => {
    trackEvent({event:'pageview'})
  },[trackEvent])

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      stupidPaddingException
    >
      <Grid container>
        <Grid item xs={12} sm={6} lg={8} className={classes.textColumn}>
          <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>
            <RenderContent source={t('intro_text')} />
          </Typography>
          <Typography component="div" className={classes.extraSpacing}>
            <RenderContent source={t('body')} />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.imgColumn}>
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/doctor-and-patient-wide.jpg`} alt={t('alt_text.0')} height="360" />
          <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/test-tubes.jpg`} alt={t('alt_text.1')} height="360" />
        </Grid>
      </Grid>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} className={classes.faqs} />

    </TabPanel>
  )
}

export default track({
  prop6: "Donate samples",
})(Donate)