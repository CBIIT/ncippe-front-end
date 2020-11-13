import React from 'react'
import { Box, Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../../components/ParticipantView/ParticipantView'

const Page = (props) => {
  const {patientId, location} = props
  const { t } = useTranslation(['a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.participantView.metaData.title')}</title>
        <meta name="title" content={t('components.participantView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Reports" link={location.state.forceNavigation} />
      <Container className="mainContainer">
        <ParticipantView patientId={patientId} location={location} />
      </Container>
    </Box>
  )
}

export default Page