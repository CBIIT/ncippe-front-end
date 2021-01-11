import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Chip, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
import moment from 'moment'
import { useTranslation } from 'react-i18next'


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.common.white
  },
  Link: {
    textDecoration: 'none'
  },
  name: {
    marginBottom: theme.spacing(1)
  },
  chip: {
    marginLeft: theme.spacing(1),
    fontWeight: "normal",
  },
  new: {
    backgroundColor: theme.palette.success.light
  },
  badges: {
    position: 'absolute',
    top: 0,
    right: 24,
    display: 'flex',
    '& .MuiBadge-root': {
      width: 'auto',
    },
    '& .MuiBadge-badge': {
      position: 'relative',
      display: 'block',
      right: 0,
      marginLeft: theme.spacing(1),
    }
  },
  newBadge: {
    '& .MuiBadge-badge': {
      position: 'relative',
      display: 'block',
      right: 0,
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.success.main
    }
  }
}),{name: 'PatientListItem'})

/**
 * Render's a Participant card that usually appears in a PatientList component. When clicked, the user will be directed to the ParticipantView component. If the patient data contains `portalAccountStatus="ACCT_NEW"`, then clicking the card will trigger the AddParticipantInfoDialog component to activate this participant.
 */
const PatientListItem = (props) => {
  const {
    firstName, 
    lastName, 
    email,
    lang = 'en',
    patientId, 
    dateCreated,
    isActiveBiobankParticipant = true,
    portalAccountStatus
  } = props.patient
  const hasNewFiles = props.patient.hasNewReports || props.patient.hasNewDocuments
  const classes = useStyles()
  const { t } = useTranslation('a_common')
  const handleClick = (event) => {
    if (portalAccountStatus === 'ACCT_NEW') {
      event.preventDefault()
      props.activate({firstName,lastName,email,lang,patientId,dateCreated})
    }
  }
  return (
    <Link className={classes.Link} onClick={handleClick}
      to={`/account/participant/${patientId}`}>
      <Paper className={`${classes.paper} ${portalAccountStatus === 'ACCT_NEW' && classes.new}`} elevation={25}>
        {(hasNewFiles || isActiveBiobankParticipant === false || portalAccountStatus !== 'ACCT_NEW' || portalAccountStatus !== 'ACCT_TERMINATED_AT_PPE') && 
        <div className={classes.badges}>
          {hasNewFiles && <Badge className={classes.badge} badgeContent={t('badges.new_document')} />}
          {isActiveBiobankParticipant === false && <Badge className={classes.badge} color="error" badgeContent={t('badges.not_participating')} />}
          {portalAccountStatus === "ACCT_TERMINATED_AT_PPE" && <Badge className={classes.badge} color="error" badgeContent={t('badges.terminated')} />}
          {portalAccountStatus === 'ACCT_NEW' && <Badge className={classes.newBadge} badgeContent={t('badges.new_participant')} />}
        </div>
        }
        <Typography className={classes.name} variant="h3" component="h3">{
          // firstName ? <>{firstName} {lastName} <Typography className={classes.patientId} component="span">({patientId})</Typography></> : `${t('participant.id')}: ${patientId}`
        firstName ? <>{firstName} {lastName} <Chip className={classes.chip} size="small" label={patientId} /></> : `${t('participant.id')}: ${patientId}`
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