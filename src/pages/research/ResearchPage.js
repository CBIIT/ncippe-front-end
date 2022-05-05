import React, { useEffect } from 'react'
import { Link as RouterLink } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Container, Divider, Grid, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'

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
  dividerSmall: {
    width: '100%',
    margin: theme.spacing(2,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3,0)
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
  updates: {
    marginTop: theme.spacing(5)
  }
}),{name: 'ResearchPage'})

const ResearchPage = () => {
  const classes = useStyles()
  const { t } = useTranslation('research')

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'Biobanks are important for research',
      prop10: t('metaData.title'),
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
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/research`} />
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
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.0.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.0.body')} />
              </Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="researchers-2.jpg" alt={t('sections.0.alt_text')} />
            </Grid>

            <Divider className={classes.divider} />

            <Grid item xs={12} md={6} component="section">
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.1.title')} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t('sections.1.body')} />
              </Typography>

              <section className={classes.updates}>
                <Typography paragraph={true} variant="h3" component="h3">
                  <RenderContent children={t('sections.2.title')} />
                </Typography>
                <div>
                  {Object.keys(t('sections.2.links', { returnObjects: true })).map((link, i) => 
                    <Typography component="div" paragraph={true} key={i}>
                      <Link component={RouterLink} to={t(`sections.2.links.${i}.route`)}>{t(`sections.2.links.${i}.text`)}</Link>
                      <Typography><RenderContent children={t(`sections.2.links.${i}.author`)} /></Typography>
                      <Divider className={classes.dividerSmall} />
                    </Typography>
                  )}
                </div>
              </section>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="researchers-1.jpg" alt={t('sections.1.alt_text')} />
            </Grid>

            <Grid item xs={12} md={6} component="section">
              
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
export default ResearchPage