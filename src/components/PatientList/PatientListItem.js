import React from 'react'
import { Badge, Card, CardContent, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 
import ConditionalWrapper from '../utils/ConditionalWrapper'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  card: {

  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      height: '100%'
    }
  },
  Link: {
    textDecoration: 'none'
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


const PatientListItem = ({patient: {firstName, lastName, userName, newReports}, view}) => {
  const classes = useStyles()
  // const handleOnClick = GUID => (event) => {
  //   // route to user test results page
  //   // TODO: patient profile view only mode - https://publicis.invisionapp.com/share/AKT0SFLCYWP#/screens/374585175
  //   history.push(`/dashboard/test-results/${firstName.toLowerCase()}${lastName}`)
  // }

  // TODO: wrap components if they have newReports flag - for providers

  if(view === 'list') {
    return (
      <Link className={classes.Link} to={`/dashboard/participant/${userName}`}>
        <ConditionalWrapper
          condition={newReports}
          wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
          <Paper className={classes.paper}>
            {firstName} {lastName}
          </Paper>
        </ConditionalWrapper>
      </Link>
    )
  } else {
    return (
      <Grid className={classes.gridItem} item>
        <Link className={classes.Link} to={`/dashboard/participant/${userName}`}>
          <ConditionalWrapper
            condition={newReports}
            wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
            <Card className={classes.card}>
              <CardContent>{firstName} {lastName}</CardContent>
            </Card>
          </ConditionalWrapper>
        </Link>
      </Grid>
    )
  }
}

export default PatientListItem