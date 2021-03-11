import React, { useContext, useState } from 'react'
import { Box, Container, Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs'
import Workflow from '../../components/SendMessage'

const useStyles = makeStyles( theme => ({
  paper: {
    padding: theme.spacing(5)
  },
}))

const Page = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage'])

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.notificationView.metaData.title')}</title>
        <meta name="title" content={t('components.notificationView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Box mb={5}>
          <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
          <Typography>{t('description')}</Typography>
        </Box>
        <Paper className={classes.paper} elevation={25}>
          <Workflow />
        </Paper>
      </Container>
    </Box>
  )
}

export default Page