import React from 'react'
import { Badge, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import ConditionalWrapper from '../utils/ConditionalWrapper'


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.lightGrey
  },
  Link: {
    textDecoration: 'none'
  },
  name: {
    marginBottom: theme.spacing(1)
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
}))

const PatientListItem = (props) => {
  const {
    firstName, 
    lastName, 
    email,
    lang,
    patientId, 
    dateCreated, 
    hasNewReports, 
    isActiveBiobankParticipant,
    portalAccountStatus} = props.patient
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
      <Paper className={`${classes.paper} ${portalAccountStatus === 'ACCT_NEW' && classes.new}`}>
        {(hasNewReports || isActiveBiobankParticipant === false || portalAccountStatus === 'ACCT_NEW') && 
        <div className={classes.badges}>
          {hasNewReports && <Badge className={classes.badge} badgeContent={t('badges.new_document')} />}
          {isActiveBiobankParticipant === false && <Badge className={classes.badge} color="error" badgeContent={t('badges.not_participating')} />}
          {portalAccountStatus === 'ACCT_NEW' && <Badge className={classes.newBadge} badgeContent={t('badges.new_participant')} />}
        </div>
        }
        <Typography className={classes.name} variant="h3" component="h3">{
          firstName ? `${firstName} ${lastName}` : `${t('participant.id')}: ${patientId}`
        }</Typography>
        <Typography>{t('participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
    </Link>
  )
}

export default PatientListItem