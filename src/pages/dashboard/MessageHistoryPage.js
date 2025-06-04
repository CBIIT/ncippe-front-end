import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs'
import ViewMessages from '../../components/ViewMessages'

const Page = () => {
  const { t } = useTranslation(['a_messageHistory','a_common'])
 
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Box sx={{ display:'flex', alignItems:'center', mb: 3 }}>
          <Box component='img' sx={{ mr:3, width:'49px'}} 
          src={`${process.env.PUBLIC_URL}/assets/icons/notifications.svg`} 
          alt={t('a_common:icons.notifications')} aria-hidden="true"></Box>
          <Box>
            <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
            <Typography>{t('description')}</Typography>
          </Box>
        </Box>
        <ViewMessages />
      </Container>
    </Box>
  )
}

export default Page