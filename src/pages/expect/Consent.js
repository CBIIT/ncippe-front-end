import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Card, CardMedia, Container, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import TabAppBar from './AppBar'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  gridItemImg: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    '& img': {
      maxWidth: 600,
      [theme.breakpoints.up('md')]: {
        maxWidth: 380
      }
    }
  },
  textColumn: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3)
    }
  },
  videoPlaceholder: {
    width: 470,
    height: 264,
    backgroundColor: "#d8d8d8",
    padding: theme.spacing(3)
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& a': {
      margin: theme.spacing(.5,0),
    }
  },
  mediaWrapper: {
    position: 'relative',
    paddingBottom: '56.25%' /* 16:9 */,
    height: 0,

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}),{name: 'ConsentPage'})

const Consent = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('consent')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const videoURL = i18n.languages[0] === 'en' ? "https://www.youtube.com/embed/KCMvPPRUcZU" : "https://www.youtube.com/embed/iq83dR49WMg"
	const lang = i18n.languages[0] === 'en' ? "" : "-es"


  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Give your consent',
      prop10: t('metaData.title')
    })
  },[t])

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/expect/consent`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/expect/consent`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">{t('pageTitle')}</Typography>
      </Container>
      <TabAppBar value={0} />

      <Container>
        <Grid container component="section">
          <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
            <Typography variant={isMobile ? "body1" : "body2"} component="div">
              <RenderContent children={t('intro_text')} />
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4} className={classes.gridItemImg} component="aside">
            <ArticleImage src="reviewing-test-results.jpg" alt={t('alt_text.0')} />
          </Grid>
          <Grid item xs={12} md={6} lg={8} className={classes.textColumn}>
            <Box mb={5} className={classes.linkList}>
              <Typography variant="h3" component="h3">{t('sample_title')}</Typography>
              <Button  href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Adult-Consent-Form${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_adult')} />
              </Button>
              <Button  href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Parental-Permission-Form${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_parental')} />
              </Button>
              <Button  href={`${process.env.PUBLIC_URL}/assets/documents/Sample-Assent-Form-For-Minors${lang}.pdf`} color="primary" rel="noopener noreferrer" target="_blank">
                <RenderContent children={t('form_link_minors')} />
              </Button>
            </Box>
            <Box mb={4}>
              <figure>
                <Card className={classes.mediaWrapper} elevation={25}>
                  <CardMedia
                    component='iframe'
                    className={classes.media}
                    src={videoURL}
                    title={t('video_title')}
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </Card>
                <figcaption><RenderContent children={t('video_caption')} /></figcaption>
              </figure>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Consent