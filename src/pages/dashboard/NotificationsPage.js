import React from 'react'
import { Box, Container} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Notifications from '../../components/Notifications/Notifications'

const Page = () => {
  const { t } = useTranslation(['a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.notificationView.metaData.title')}</title>
        <meta name="title" content={t('components.notificationView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Notifications />
      </Container>
    </Box>
  )
}

export default Page