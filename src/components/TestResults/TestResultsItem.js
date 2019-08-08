import React from 'react'
import { Card, CardActions, CardContent, Grid, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@material-ui/icons';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  card: {

  },
  cardAction: {
    justifyContent: 'space-between',

    '& a:last-of-type': {
      alignSelf: 'flex-end'
    }
  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      height: '100%'
    }
  }
}))

const TestResultsItem = ({report}) => {
  const classes = useStyles()
  const {reportName, timestamp, s3Url} = report

  return (
    <Grid className={classes.gridItem} item>
      <Card className={classes.card}>
        <CardContent>
        <Typography variant="h4">{reportName}</Typography>
        <Typography>{moment(timestamp).format("MMM Do YYYY")}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Link href={`/assets/documents/important-document.pdf`} rel="noopener noreferrer" target="_blank" underline="none">
            <Button color="primary" variant="text"><LaunchIcon />View</Button>
          </Link>
          <Link href={`/assets/documents/important-document.pdf`} download="important-document.pdf" underline="none">
            <Button color="primary" variant="text"><GetAppIcon />Download</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default TestResultsItem