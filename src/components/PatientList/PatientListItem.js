import React from 'react'
import { Card, CardContent, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router' 


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
  }
}))


const PatientListItem = ({patient: {firstName, lastName, userName}, view}) => {
  const classes = useStyles()
  // const handleOnClick = GUID => (event) => {
  //   // route to user test results page
  //   // TODO: patient profile view only mode - https://publicis.invisionapp.com/share/AKT0SFLCYWP#/screens/374585175
  //   history.push(`/dashboard/test-results/${firstName.toLowerCase()}${lastName}`)
  // }

  if(view === 'list') {
    return (
    <Link className={classes.Link}
      to={`/dashboard/test-results/${userName}`}>
      <Paper className={classes.paper}>
        {firstName} {lastName}
      </Paper>
    </Link>
    )
  } else {
    return (
      <Grid className={classes.gridItem} item>
        <Link className={classes.Link}
          to={`/dashboard/test-results/${userName}`}>
          <Card className={classes.card}>
            <CardContent>{firstName} {lastName}</CardContent>
          </Card>
        </Link>
      </Grid>
    )
  }
}

export default PatientListItem