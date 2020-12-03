import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import { caseConverter, trackFallback } from '../../utils/utils'
import NotFound from '../NotFoundPage'

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(3,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7,0)
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
  }
}),{name: 'ArticlePage'})

// This component is for a reusable research article page, but it's limiting in it's layout. Opting for individual article pages that have more flexibility.

const Article = (props) => {
  const classes = useStyles()
  const { trackEvent = trackFallback } = props
  const { t, i18n } = useTranslation(`r_${caseConverter(props.article)}`)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    trackEvent("page view", {
      pageTitle: t("metaData.title"),
      metaTitle: t("metaData.title")
    })
  },[trackEvent, t])

  // dynamic path does not exist
  if(!i18n.hasResourceBundle(i18n.languages[0],`r_${caseConverter(props.article)}`)) {
    return   <NotFound />
  }

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent source={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} component="section">
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent source={t('intro_text')} />
              </Typography>
            </Grid>
            
              {t('img') !== 'img' && <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
                  <ArticleImage src={t('img.0.file_name')} alt={t('img.0.alt_text')} />
                </Grid>
              }

            <Divider className={classes.divider} />

            {Object.keys(t('sections', { returnObjects: true })).map((section, i) => 
              <Grid item xs={12} md={8} component="section" key={i}>
                <Typography variant="h3" component="h3">
                  <RenderContent source={t(`sections.${i}.title`)} />
                </Typography>
                {/* Render blockquotes if they're provided for this section */}
                {t(`sections.${i}.quote`) !== `sections.${i}.quote` && <blockquote>
                    <Typography>{t(`sections.${i}.quote.text`)}</Typography>
                    <cite>{t(`sections.${i}.quote.cite`)}</cite>
                  </blockquote>
                }
                <Typography component="div">
                  <RenderContent source={t(`sections.${i}.body`)} />
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Article