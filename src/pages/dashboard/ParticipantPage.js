import React, { useState, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useParams, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import ParticipantView from '../../components/ParticipantView/ParticipantView'

const Page = () => {
  const { patientId } = useParams()
  const location = useLocation()
  const { t } = useTranslation(['a_common'])

  const [participant, setParticipant] = useState(location.state?.participant || null)

  useEffect(() => {
    if ( patientId) {
      // Fetch participant data if not already provided in state
      fetch(`/api/participants/${patientId}`)
        .then(response => response.json())
        .then(data => setParticipant(data))
        .catch(error => console.error('Error fetching participant data:', error))
    }
  }, [patientId])  

  return (
    <Box className="popup">
      <Helmet>
        <title>{t('components.participantView.metaData.title')}</title>
        <meta name="title" content={t('components.participantView.metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Reports" link={location.state?.forceNavigation} />
      <Container className="mainContainer">
        <ParticipantView patientId={patientId} location={location} />
      </Container>
    </Box>
  )
}

export default Page