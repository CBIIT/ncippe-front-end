import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import { Helmet } from 'react-helmet-async'
import { Box, Card, CardMedia, Container, Link, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'

import RenderContent from '../../components/utils/RenderContent'
import TabAppBar from './AppBar'

const useStyles = makeStyles( theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  },
  videoPlaceholder: {
    width: 470,
    height: 264,
    backgroundColor: "#d8d8d8",
    padding: theme.spacing(3)
  },
  iconLink: {
    display: 'block',
    margin: theme.spacing(1,0),
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
}))

const Consent = () => {
  const classes = useStyles()
  const { t } = useTranslation('consent')
  const { trackEvent } = useTracking()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    trackEvent({
      event:'pageview',
      prop6: "Give your consent",
      prop10: t("metaData.title")
    })
  },[trackEvent])

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")} | NCI</title>
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

      <Container component="section" className="mainContainer mainContainer--public">
        <Box className={classes.container}>
          <Typography variant={isMobile ? "body1" : "body2"} component="div">
            <RenderContent source={t('intro_text')} />
          </Typography>
          <Box mb={5}>
            <Typography variant="h3" component="h3">{t('sample_title')}</Typography>
            <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
              <RenderContent source={t('form_link_adult')} />
            </Link>
            <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
              <RenderContent source={t('form_link_parental')} />
            </Link>
            <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
              <RenderContent source={t('form_link_minors')} />
            </Link>
          </Box>
          <Box mb={4}>
            <figure>
              <Card className={classes.mediaWrapper}>
                <CardMedia
                  component='iframe'
                  className={classes.media}
                  src='https://www.youtube.com/embed/OyCFbZYgL3U'
                  title={t('video_title')}
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </Card>
              <figcaption><RenderContent source={t('video_caption')} /></figcaption>
            </figure>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default Consent