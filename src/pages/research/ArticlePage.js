import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import { caseConverter } from '../../utils/utils'
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
  const nameSpace = `r_${caseConverter(props.article)}`
  const { t, i18n } = useTranslation([nameSpace,'common'])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: t('pageTitle'),
      prop10: `${t("pageTitle")} | ${t("common:nav.research")}`,
    })
  },[t])

  // dynamic path does not exist
  if(!i18n.hasResourceBundle(i18n.languages[0],`r_${caseConverter(props.article)}`)) {
    return   <NotFound />
  }

  return (
    <Box component="article">
      <Helmet>
        <title>{`${t("pageTitle")} | ${t("common:nav.research")}`}</title>
        <meta name="title" content={`${t("pageTitle")} | ${t("common:nav.research")}`} />
        <meta property="og:title" content={t("pageTitle")} />
        <meta name="description" content={t("intro_text")} />
        <meta property="og:description" content={t("intro_text")} />
        <link rel="canonical"      href={process.env.REACT_APP_PUBLIC_URL + t('pageRoute')} />
        <meta property="og:url" content={process.env.REACT_APP_PUBLIC_URL + t('pageRoute')} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6} component="section">
              <Typography paragraph={true} variant={isMobile ? "body1" : "body2"}>
                <RenderContent children={t('intro_text')} />
              </Typography>
            </Grid>
            
              {i18n.exists(`${nameSpace}:img`) && <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
                  <ArticleImage src={t('img.0.file_name')} alt={t('img.0.alt_text')} />
                </Grid>
              }

            <Divider className={classes.divider} />

            {Object.keys(t('sections', { returnObjects: true })).map((section, i) => 
              <Grid item xs={12} md={8} component="section" key={i}>
                {i18n.exists(`${nameSpace}:sections.${i}.title`) &&
                  <Typography variant="h3" component="h3">
                    <RenderContent children={t(`sections.${i}.title`)} />
                  </Typography>
                }
                {/* Render blockquotes if they're provided for this section */}
                {i18n.exists(`${nameSpace}:sections.${i}.quote`) && 
                  <blockquote>
                    <Typography>{t(`sections.${i}.quote.text`)}</Typography>
                    <cite>{t(`sections.${i}.quote.cite`)}</cite>
                  </blockquote>
                }
                {i18n.exists(`${nameSpace}:sections.${i}.body`) &&
                  <Typography component="div">
                    <RenderContent children={t(`sections.${i}.body`)} />
                  </Typography>
                }
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Article