import React from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ArticleImage from '../../components/utils/ArticleImage'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  grid: {
    justifyContent: 'flex-start'
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
  divider: {
    width: '100%',
    margin: theme.spacing(3,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7,0)
    }
  },
}),{name: 'GetHelpPage'})

const Page = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_help','a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Get Help" />
      <Container className="mainContainer">
        <div className={classes.titleWithIcon}>
          <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/get-help.svg`} alt={t('a_common:icons.help')} aria-hidden="true"></img>
          <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        </div>
        <Typography>{t('description')} </Typography>
        <Box mt={5}>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h3" component="h3">{t('sections.0.title')}</Typography>
              <Typography paragraph={true}>{t('sections.0.body')}</Typography>

              <Typography paragraph={true} variant="h3" component="h3">{t('sections.1.title')}</Typography>
              <Typography paragraph={true}>{t('sections.1.body')}</Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="tablet.jpg" alt={t('sections.1.alt_text')} />
            </Grid>
          </Grid>
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h3" component="h3">{t('sections.2.title')}</Typography>
              <Typography paragraph={true}>{t('sections.2.body')}</Typography>
            </Grid>
            <Grid className={classes.gridItemImg} item xs={12} md={6}>
              <ArticleImage src="hospital-building.jpg" alt={t('sections.2.alt_text')} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Page