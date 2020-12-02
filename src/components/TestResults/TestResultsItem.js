import React, { useContext, useState } from 'react'
import { Badge, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import moment from 'moment'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import ConditionalWrapper from '../utils/ConditionalWrapper'
import { getBool } from '../../utils/utils'

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
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    margin: theme.spacing(0,2),
    padding: theme.spacing(2,0,0,0),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      "& > :not(:first-child)": {
        margin: 0
      }
    },

    [theme.breakpoints.up('xs')]: {
      '& a:last-of-type': {
        alignSelf: 'flex-end',
      }
    }

  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      height: '100%'
    }
  },
  icon: {
    marginRight: '4px'
  },
  badge: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}),{name: 'TestResultsItem'})

const TestResultsItem = (props) => {
  const {report, noBadge, patientId} = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {uuid, token} = loginContext
  const {fileName, dateUploaded, fileGUID} = report
  const [isNewReport, setIsNewReport] = useState(report.viewedBy ? !report.viewedBy.includes(uuid) : true)
  const { t } = useTranslation('a_common')
  const { trackEvent } = useTracking()
  const isIE = /*@cc_on!@*/false || !!document.documentMode

  // response header example to parse
  //Content-Disposition: attachment; filename=dummy_PatientReport - Copy8322721829336469280.pdf

  const handleViewReport = (e) => {
    e.preventDefault()
    const download = e.currentTarget.dataset.download
    const reportId = e.currentTarget.dataset.reportid
    let filename
    let fileData
    let win
    const linkText = e.target.textContent

    // defer opening new window for 100ms so we can return false on a "open in a new tab" click
    setTimeout(() => {
      // set up new tab window before fetch call
      if(!download) {
        win = window.open("",`report-${reportId}`)
        win.document.title = "View Report" // TODO: translate this
        win.document.body.style.margin = 0
        win.onunload = function() {
          window.URL.revokeObjectURL(fileData)
        }
      }

      getAPI.then(api => {
        api.fetchPatientReport({reportId, token})
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
            fileData = window.URL.createObjectURL(blob)

            // trigger download or render blob buffer to new window
            if(download) {
              trackEvent({
                prop50: linkText,
                prop66: `BioBank_AccountDocuments|Download`,
                eVar66: `BioBank_AccountDocuments|Download`,
                events: 'event6',
                pe: 'lnk_e',
                pev1: `${fileName}`,
                eventName: 'AccountDocumentsDownload'
              })
              const link = document.createElement('a');
              link.style.display = 'none';
              document.body.appendChild(link);
              link.download = filename
              link.href = fileData
              link.click();
              document.body.removeChild(link);
            } else {
              trackEvent({
                prop50: linkText,
                prop66: `BioBank_AccountDocuments|View in Browser`,
                eVar66: `BioBank_AccountDocuments|View in Browser`,
                events: 'event6',
                pe: 'lnk_e',
                pev1: `${fileName}`,
                eventName: 'AccountDocumentsView'
              })
              win.document.body.innerHTML = `<embed src='${fileData}' type='application/pdf' width='100%' height='100%' />`
              
            }
          })
          .then(() => {
            // mark this report as viewed in database
            getAPI.then(api => {
              // Note: for local dev, this method will fail for marking consent forms as viewed because they reside inside "otherDocuments" in the mockData.js file. However, for PROD, reports and consent forms use the same api call. 
              api.reportViewedBy({patientId, uuid, reportId, token}).then(resp => {
                if(resp instanceof Error) {
                  console.error(resp.message)
                } else {
                  // mark as viewed in front-end state
                  setIsNewReport(false)

                  // update participant state
                  if(!patientId) {
                    const updatedReports = loginContext.reports.map((report,i) => {
                      if(report.fileGUID === reportId) {
                        const viewedBy = report.viewedBy || []
                        return {
                          ...report,
                          viewedBy: [...new Set([...viewedBy, uuid])]
                        }
                      }
                      return report
                    })

                    dispatch({
                      type: 'reportViewedByPatient',
                      reports: updatedReports,
                      uuid
                    })
                  }
                  // update user roles that can view this patient's reports
                  else {
                    const updatedPatients = loginContext.patients.map((patient,i) => {
                      const badgesOnPage = document.querySelectorAll('#reports .MuiBadge-root')
                      if(patient.patientId === patientId) {
                        return {
                          ...patient,
                          hasNewReports: getBool(badgesOnPage.length)
                        }
                      }
                      return patient
                    })
                    
                    dispatch({
                      type: 'reportViewedByOther',
                      patients: updatedPatients
                    })
                  }
                }
              })
            })
          })
          .catch(error => {
            console.error(error)
          })
      })
    }, 100)

    if (e.ctrlKey || e.metaKey) {
      return false;
    }
  }

  return (
    <Card className={classes.card} elevation={25}>
      <ConditionalWrapper
        condition={noBadge ? false : isNewReport}
        wrapper={children => <Badge className={classes.badge} badgeContent={t('badges.new_document')} component="div">{children}</Badge>}>
        <CardContent>
          <Typography className="breakAll" variant="h3" component="h3">{fileName}</Typography>
          <Typography>{t('components.testResultItem.uploaded')} {moment(dateUploaded).format("MMM DD, YYYY")}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          {isIE ? <Typography component="div" /> :  <Button color="primary" variant="text" data-reportid={fileGUID} onClick={handleViewReport}><LaunchIcon className={classes.icon} /> {t('buttons.view')}</Button>}
          <Button color="primary" variant="text" data-download data-reportid={fileGUID} onClick={handleViewReport}><GetAppIcon className={classes.icon}  /> {t('buttons.download')}</Button>
        </CardActions>
      </ConditionalWrapper>
    </Card>
  )
}

export default TestResultsItem