import React from 'react'
import { Box, Container} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ChangeParticipation from '../../components/Participation/Participation'

const Page = () => {
  const { t } = useTranslation(['a_changeParticipation'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Participation" />
      <Container className="mainContainer">
        <ChangeParticipation />
      </Container>
    </Box>
  )
}

export default Page