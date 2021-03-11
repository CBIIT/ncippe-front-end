import React, { useContext, useState, useCallback } from 'react'
import { Box, Container} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import getAPI from '../../data'
import Breadcrumbs from '../../components/Breadcrumbs'

const Page = () => {
  const { t } = useTranslation(['a_common'])
  const [loginContext, dispatch] = useContext(LoginContext)
  const { firstName } = loginContext



  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.notificationView.metaData.title')}</title>
        <meta name="title" content={t('components.notificationView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <h1>Send Messages {firstName}</h1>
      </Container>
    </Box>
  )
}

export default Page