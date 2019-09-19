import React, { useContext, useState } from 'react'
import { Badge, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
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
  fileTitle: {
    wordBreak: 'break-all'
  },
  icon: {
    marginRight: '4px'
  },
}))

const TestResultsItem = (props) => {
  const {report,noBadge} = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {userGUID,env,token} = loginContext
  const {fileName, dateUploaded, fileGUID} = report
  const [isNewReport, setIsNewReport] = useState(report.viewedBy ? !report.viewedBy.includes(loginContext.userGUID) : true)

  // response header example to parse
  //Content-Disposition: attachment; filename=dummy_PatientReport - Copy8322721829336469280.pdf

  const handleViewReport = (e) => {
    e.preventDefault()
    const download = e.currentTarget.dataset.download
    const reportId = e.currentTarget.dataset.reportid
    let filename
    let win

    // set up new tab window before fetch call
    if(!download) {
      win = window.open("", "reportId")
      win.document.title = "View Report"
      win.document.body.style.margin = 0
    }

    api[env].fetchPatientReport({reportId, token})
      .then(resp => {
        try{
          const disposition = resp.headers.get('Content-Disposition')
          filename = disposition ? disposition.replace(/.*filename=(.*\.pdf$)/,'$1') : 'report.pdf'
          return resp.blob()
        } catch(error) {
          throw new Error(error)
        }
      })
      .then(blob => {
        // const file = new Blob([resp], {type: "application/pdf"})

        // you can only trigger save in IE - viewing blob data not supported
        // TODO: conditionally show "View" for IE browser
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        } 
        // create url reference to blob buffer
        const fileData = window.URL.createObjectURL(blob);

        // trigger download or render blob buffer to new window
        if(download) {
          const link = document.createElement('a');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.download = filename
          link.href = fileData
          link.click();
          document.body.removeChild(link);
        } else {
          win.document.body.innerHTML = `<embed src='${fileData}' type='application/pdf' width='100%' height='100%' />`
        }

        // ensure blob buffer is cleared for garbage collection
        setTimeout(function(){
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(fileData);
        }, 100);
      })
      .then(() => {
        // mark this report as viewed in database
        api[env].reportViewedBy({userGUID,reportId, token})
        // mark as viewed in front-end state
        setIsNewReport(false)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Card className={classes.card}>
      <ConditionalWrapper
        condition={noBadge ? false : isNewReport}
        wrapper={children => <Badge className={classes.badge} badgeContent="new document" component="div">{children}</Badge>}>
        <CardContent>
          <Typography className={classes.fileTitle} variant="h3" component="h3">{fileName}</Typography>
          <Typography>Uploaded {moment(dateUploaded).format("MMM DD, YYYY")}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Button color="primary" variant="text" data-reportid={fileGUID} onClick={handleViewReport}><LaunchIcon className={classes.icon} /> View</Button>
          <Button color="primary" variant="text" data-download data-reportid={fileGUID} onClick={handleViewReport}><GetAppIcon className={classes.icon}  /> Download</Button>
        </CardActions>
      </ConditionalWrapper>
    </Card>
  )
}

export default TestResultsItem