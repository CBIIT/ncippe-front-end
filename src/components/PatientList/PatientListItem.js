import React from 'react'
import { Badge, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
import moment from 'moment'


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
}))

const PatientListItem = (props) => {
  const {firstName, lastName, patientId, dateCreated, hasNewReports, isActiveBiobankParticipant} = props.patient
  const classes = useStyles()
  return (
    <Link className={classes.Link}
      to={`/dashboard/participant/${patientId}`}>
      <Paper className={classes.paper}>
        {(hasNewReports || isActiveBiobankParticipant === false) && 
        <div className={classes.badges}>
          {hasNewReports && <Badge className={classes.badge} badgeContent="New Document" />}
          {isActiveBiobankParticipant === false && <Badge className={classes.badge} color="error" badgeContent="Withdrawn" />}
        </div>
        }
        <Typography className={classes.name} variant="h3" component="h3">{firstName} {lastName}</Typography>
        <Typography>Participant since {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
      </Paper>
    </Link>
  )
}

export default PatientListItem