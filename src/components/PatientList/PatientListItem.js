import React from 'react'
import { Badge, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
import ConditionalWrapper from '../utils/ConditionalWrapper'


const useStyles = makeStyles(theme => ({
  paper: {
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
  badge: {
    width: '100%',
    display: 'block',

    '& .MuiBadge-badge': {
      right: '20px',
      borderRadius: '0 0 6px 6px',
      padding: '3px 10px',
      height: 'auto',
      textTransform: 'uppercase',
      backgroundColor: '#F6C674',
      color: '#000',
      transform: 'none'
    }
  }
}))

const PatientListItem = ({patient: {firstName, lastName, userName, newReports}}) => {
  const classes = useStyles()
  return (
    <Link className={classes.Link}
      to={`/dashboard/participant/${userName}`}>
        <ConditionalWrapper
        condition={newReports}
        wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
        <Paper className={classes.paper}>
          <Typography className={classes.name} variant="h3" component="h3">{firstName} {lastName}</Typography>
          <Typography>Participant since [date]</Typography>
        </Paper>
      </ConditionalWrapper>
    </Link>
  )
}

export default PatientListItem