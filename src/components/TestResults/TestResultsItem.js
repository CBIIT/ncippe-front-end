import React, { useContext } from 'react'
import { Badge, Card, CardActions, CardContent, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@material-ui/icons'
import moment from 'moment'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import ConditionalWrapper from '../utils/ConditionalWrapper'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2,1),
  },
  cardAction: {
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    margin: theme.spacing(0,2),
    padding: theme.spacing(2,0,0,0),

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
  icon: {
    marginRight: '4px'
  },
}))

const TestResultsItem = ({report}) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {env} = loginContext
  const {reportName, timestamp, reportGUID} = report
  const newReport = report.viewedBy ? !report.viewedBy.includes(loginContext.userGUID) : true

  const showFile = (blob, download = false, filename = 'report.pdf') => {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const file = new Blob([blob], {type: "application/pdf"})

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    } 

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const fileData = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = fileData
    if(download) {
      link.download = filename
    } else {
      link.rel="noopener noreferrer"
      link.target="_blank"
    }
    link.click();
    setTimeout(function(){
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(fileData);
    }, 100);
  }

  // fetch([url to fetch], {[options setting custom http-headers]})
  // .then(r => r.blob())
  // .then(showFile)

  // response header example to parse
  //Content-Disposition: attachment; filename=dummy_PatientReport - Copy8322721829336469280.pdf

  const handleViewReport = (e) => {
    e.preventDefault()
    const download = e.currentTarget.getAttribute('download')
    const reportID = e.currentTarget.attributes.href.value
    let filename
    api[env].fetchPatientReport({reportID})
      .then(resp => {
        try{
          const disposition = resp.headers.get('Content-Disposition')
          filename = disposition ? disposition.replace(/.*filename=(.*\.pdf$)/,'$1') : 'report.pdf'
          return resp.blob()
        } catch(error) {
          throw new Error(error)
        }
      })
      .then(resp => {
        showFile(resp,download,filename)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Card className={classes.card}>
      <ConditionalWrapper
        condition={newReport}
        wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
        <CardContent>
          <Typography className={classes.reportTitle} variant="h3" component="h3">{reportName}</Typography>
          <Typography>Uploaded {moment(timestamp).format("MMM Do YYYY")}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Link href={reportGUID} rel="noopener noreferrer" target="_blank" underline="none" onClick={handleViewReport}>
            <Button color="primary" variant="text"><LaunchIcon className={classes.icon} /> View</Button>
          </Link>
          <Link href={reportGUID} download={reportGUID} underline="none" onClick={handleViewReport}>
            <Button color="primary" variant="text"><GetAppIcon className={classes.icon}  /> Download</Button>
          </Link>
        </CardActions>
      </ConditionalWrapper>
    </Card>

  )
}

export default TestResultsItem