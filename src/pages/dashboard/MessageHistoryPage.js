import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs'
import ViewMessages from '../../components/ViewMessages'

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
}))

const Page = () => {
  const { t } = useTranslation(['a_common'])
  const classes = useStyles()

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.messageHistory.metaData.title')}</title>
        <meta name="title" content={t('components.messageHistory.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <div className={classes.titleWithIcon}>
          <img className={classes.titleIcon} src={`${process.env.PUBLIC_URL}/assets/icons/notifications.svg`} alt={t('a_common:icons.notifications')} aria-hidden="true"></img>
          <div>
            <Typography variant="h2" component="h2">{t('components.messageHistory.pageTitle')}</Typography>
            <Typography>{t('components.messageHistory.description')}</Typography>
          </div>
        </div>
        <ViewMessages />
      </Container>
    </Box>
  )
}

export default Page