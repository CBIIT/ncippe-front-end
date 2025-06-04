import React, {useContext} from 'react'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import Breadcrumbs from '../../components/Breadcrumbs'
import RenderContent from '../../components/utils/RenderContent'

const Page = () => {
  const [loginContext] = useContext(LoginContext)
  const {roleName} = loginContext
  const contentForRole = roleName === "ROLE_PPE_PROVIDER" ? 'a_resources_provider' : 'a_resources_participant'
  const { t } = useTranslation([contentForRole,'a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Resources" />
      <Container className="mainContainer">
        <Box sx={{ display: 'flex', alignContent: 'center', mb: 3 }} >
          <Box component='img' sx={{ mr: 3, width: '49px' }} 
          src={`${process.env.PUBLIC_URL}/assets/icons/one-idea-v2.svg`} 
          alt={t('a_common:icons.resources')} aria-hidden="true"></Box>
          <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        </Box>
        <Typography>{t('description')} </Typography>
        <Box mt={5}>
          <Box sx={{ maxWidth: { md: '80%'}}} >
          {Object.keys(t('sections', { returnObjects: true })).map((section, i) => 
            <Box key={i} sx={{ mb: 4 }} >
              {i !== 0 && <Divider sx={{ width: '100%', my: {xs: 3, md: 5} }} />}
              <Typography variant="h3" component="h3">
                <RenderContent children={t(`sections.${i}.title`)} />
              </Typography>
              <Typography component="div">
                <RenderContent children={t(`sections.${i}.body`)} />
              </Typography>
            </Box>
          )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Page