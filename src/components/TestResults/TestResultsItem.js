import React, { useContext } from 'react'
import { Badge, Card, CardActions, CardContent, Grid, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@material-ui/icons'
import moment from 'moment'
import ConditionalWrapper from '../utils/ConditionalWrapper'
import { LoginContext } from '../login/SharedLogin/Login.context'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  card: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
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
  },
  reportTitle: {
    wordBreak: 'break-all'
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

const TestResultsItem = ({report}) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {reportName, timestamp, s3Url} = report
  const newReport = report.viewedBy ? !report.viewedBy.includes(loginContext.userGUID) : true

  return (
    <Grid className={classes.gridItem} item>
      <ConditionalWrapper
        condition={newReport}
        wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.reportTitle} variant="h6">{reportName}</Typography>
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
      </ConditionalWrapper>
    </Grid>
  )
}

export default TestResultsItem