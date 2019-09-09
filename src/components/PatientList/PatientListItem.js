import React from 'react'
import { Badge, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
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
}))

const PatientListItem = ({patient: {firstName, lastName, userName, newReports}}) => {
  const classes = useStyles()
  return (
    <Link className={classes.Link}
      to={`/dashboard/participant/${userName}`}>
      <Paper className={classes.paper}>
        <ConditionalWrapper
        condition={newReports}
        wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
          <Typography className={classes.name} variant="h3" component="h3">{firstName} {lastName}</Typography>
          <Typography>Participant since [date]</Typography>
        </ConditionalWrapper>
      </Paper>
    </Link>
  )
}

export default PatientListItem