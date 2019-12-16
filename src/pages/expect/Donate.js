import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import FAQs from '../../components/FAQ/FAQ_Wrapper'
import TabPanel from '../../components/Tabs/TabPanel'

const useStyles = makeStyles( theme => ({
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  gridItemImg: {
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
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
    trackEvent({
      event:'pageview',
      prop6: "Donate samples",
    })
  },[trackEvent])

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      stupidPaddingException
    >
      <Helmet>
        <title>What to expect – donating samples | Cancer Moonshot Biobank | NCI</title>
        <meta name="title"        content="What to expect – donating samples | Cancer Moonshot Biobank" />
        <meta property="og:title" content="What to expect – donating samples | Cancer Moonshot Biobank" />
        <meta name="description"        content="During the course of your treatment, you’ll donate samples of blood and tissue. Those samples will be securely stored in the Biobank until they’re shared with researchers." />
        <meta property="og:description" content="During the course of your treatment, you’ll donate samples of blood and tissue. Those samples will be securely stored in the Biobank until they’re shared with researchers." />
        <link rel="canonical"      href="https://moonshotbiobank.cancer.gov/expect/donate" />
        <meta property="og:url" content="https://moonshotbiobank.cancer.gov/expect/donate" />
      </Helmet>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
          <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>
            <RenderContent source={t('intro_text')} />
          </Typography>
          <Typography component="div" className={classes.extraSpacing}>
            <RenderContent source={t('body')} />
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.gridItemImg}>
          <ArticleImage src="doctor-and-patient-1.jpg" alt={t('alt_text.0')} />
        </Grid>
      </Grid>

      {/* Frequently Asked Questions */}
      <FAQs title={t('faqs_title')} faqs={faqs} className={classes.faqs} />

    </TabPanel>
  )
}

export default Donate