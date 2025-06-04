import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Link, Box, Chip, Paper, Typography } from '@mui/material'
import { Link as RouterLink} from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'


/**
 * Render's a Participant card that usually appears in a PatientList component. When clicked, the user will be directed to the ParticipantView component. If the patient data contains `portalAccountStatus="ACCT_NEW"`, then clicking the card will trigger the AddParticipantInfoDialog component to activate this participant.
 */
const PatientListItem = ({ patient, activate}) => {
  const {
    firstName, 
    lastName, 
    email,
    lang = 'en',
    patientId, 
    dateCreated,
    isActiveBiobankParticipant = true,
    portalAccountStatus,
    hasNewReports = false,
    hasNewDocuments = false 
  } = patient
  const hasNewFiles = hasNewReports || hasNewDocuments

  const { t } = useTranslation('a_common')
  const handleClick = (event) => {
    if (portalAccountStatus === 'ACCT_NEW') {
      event.preventDefault()
      activate({firstName,lastName,email,lang,patientId,dateCreated})
    }
  }

  const showBadges =
    hasNewFiles ||
    !isActiveBiobankParticipant ||
    portalAccountStatus === 'ACCT_NEW' ||
    portalAccountStatus === 'ACCT_TERMINATED_AT_PPE'

  return (
    <Link component={RouterLink} sx={{ textDecoration: 'none' }} onClick={handleClick}
      to={ portalAccountStatus !== 'ACCT_NEW' ? 
        `/account/participant/${patientId}`
       : '#' }>
      <Paper  elevation={25} sx={{
          position: 'relative',
          p: 4,
          mb: 2,
          backgroundColor: portalAccountStatus === 'ACCT_NEW' ? 'success.light' : 'common.white',
        }}>
        { showBadges && (
        <Box sx={{
              position: 'absolute',
              top: 16,
              right: 24,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}>
          {hasNewFiles && <Chip  label={t('badges.new_document')} 
          color="warning" size="small" sx={{ fontWeight: 'bold' }} />}
          {isActiveBiobankParticipant === false && <Chip label={t('badges.not_participating')} 
          color="warning" size="small" sx={{ fontWeight: 'bold' }} />}
          {portalAccountStatus === "ACCT_TERMINATED_AT_PPE" && <Chip  label={t('badges.terminated')}
          color="warning" size="small" sx={{ fontWeight: 'bold' }}  />}
          {portalAccountStatus === 'ACCT_NEW' && <Chip  label={t('badges.new_participant')} 
          color="success" size="small" sx={{ fontWeight: 'bold' }}/>}
        </Box>
        )}
        <Typography sx={{ mb: 1 }} variant="h3" component="h3">{
          // firstName ? <>{firstName} {lastName} <Typography className={classes.patientId} component="span">({patientId})</Typography></> : `${t('participant.id')}: ${patientId}`
        firstName ? <>{firstName} {lastName} <Chip  sx={{ ml: 1, fontWeight: 'normal' }} size="small" label={patientId} /></> : `${t('participant.id')}: ${patientId}`
        }</Typography>
        <Typography>{t('participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
    </Link>
  )
}
PatientListItem.displayName = "PatientListItem"
PatientListItem.propTypes = {
  /**
   * The patient data for the listing card. This is typically stored in the LoginContext for a Provider or CRC.
   */
  patient: PropTypes.shape({
    /**
     * The participant's first name
     */
    firstName: PropTypes.string,
    /**
     * The participant's last name
     */
    lastName: PropTypes.string,
    /**
     * The participant's email, used by the `AddParticipantInfoDialog` component
     */
    email: PropTypes.string,
    /**
     * The participant's preferred language, used by the `AddParticipantInfoDialog` component
     */
    lang: PropTypes.string,
    /**
     * The participant's id, used as a visual reference and by the `AddParticipantInfoDialog` component
     */
    patientId: PropTypes.string, 
    /**
     * The `timestamp` date when this participant was added to the portal
     */
    dateCreated: PropTypes.number, 
    /**
     * Flag if this participant has new biomarker reports or new documents. Will display a yellow "new document" chip
     */
    hasNewFiles: PropTypes.bool, 
    /**
     * Flag if this participant is no longer participating in the program. Will display an orange "not participating" chip
     */
    isActiveBiobankParticipant: PropTypes.bool,
    /**
     * Flag if this participant is either new to the system or has terminated their account. The whole card becomes green and displays a green "New Participant" chip if 'ACCT_NEW'.
     */
    portalAccountStatus: PropTypes.oneOf([null,'ACCT_NEW','ACCT_TERMINATED_AT_PPE','ACCT_ACTIVE'])
  })
}
export default PatientListItem