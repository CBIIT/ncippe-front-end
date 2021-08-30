import React, { useContext, useEffect, useRef } from 'react'
import { Button, Chip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import getAPI from '../../data'

import { MochaContext } from './Mocha.context'
import { LoginContext } from '../login/Login.context'

import FileItem from '../FileItem'
import ReportList from './ReportList'
import Status from '../Status'
import FormButtons from '../inputs/FormButtons'

const useStyles = makeStyles( theme => ({
  chip: {
    marginLeft: theme.spacing(1),
  },
  participantReport: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    }
  },
  uploadReport: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      width: '49%',
    }
  },
  btnSelectReport: {
    margin: theme.spacing(2,0,4)
  },
  input: {
    display: 'none'
  },
  reportList: {
    [theme.breakpoints.up('md')]: {
      width: '49%',
    }
  }
}),{name: 'AddReport'})

const AddReport = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_landingMocha','a_common'])
  const [mochaContext, dispatch] = useContext(MochaContext)
  const [loginContext] = useContext(LoginContext)
  const submitBtn = useRef()

  useEffect(()=>{
    if(mochaContext.reportFile) {
      submitBtn.current.focus()
    }
  },[mochaContext.reportFile])

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

  // controled file input
  const handleFileChange = (event) => {
    //f = f.replace(/.*[\/\\]/, ''); -ie: evt.target.files[0].name
    const file = event.currentTarget.files.item(0)

    if(file) {
      dispatch({
        type: 'update',
        data: {
          reportFile: file
        }
      })
    }
  }

  const handleRemoveFile = () => {
    const fileInput = document.getElementById('report-upload-file')
    fileInput.value = null;
    dispatch({
      type: 'update',
      data: {
        reportFile: null,
        uploadError: false
      }
    })
  }

  const uploadFile = () => {

    // console.log("upload file")
    const {uuid} = loginContext

    // verify that report data exists before fetch call
    if(!!mochaContext.reportFile) {

      // validate file type
      if(mochaContext.reportFile.type !== 'application/pdf') {
        dispatch({
          type: 'update',
          data: {
            uploadError: true,
            errorTitle:t('upload.1.error.fileType.title'),
            errorMessage:t('upload.1.error.fileType.message'),
          }
        })

        return
      }

      PubSub.publish('ANALYTICS', {
        events: 'event78',
        eventName: 'FilesUploaded',
        prop42: `BioBank_AdminUpload|FilesUploaded`,
        eVar42: `BioBank_AdminUpload|FilesUploaded`,
      })
      // reset errors, show spinner
      dispatch({
        type: 'update',
        data: {
          uploadError: false,
          navigate: 'submit'
        }
      })
      // fake response delay
      // setTimeout(() => {
        // api[env].uploadPatientReport({
        getAPI.then(api => {
          api.uploadPatientReport({
            patientId: mochaContext.patientId,
            uuid,
            reportFile: mochaContext.reportFile,
            fileType: 'PPE_FILETYPE_BIOMARKER_REPORT'
          })
          .then(resp => {
            if(resp instanceof Error) {
              // Save unsuccessful - go back a step
              dispatch({
                type: 'update',
                data: {
                  uploadError: true,
                  errorTitle: t('upload.1.error.onServer.title'),
                  errorMessage: t('upload.1.error.onServer.message'),
                  navigate: 'addReport'
                }
              })
              PubSub.publish('ANALYTICS', {
                events: 'event81',
                eventName: 'AdminUploadError',
                prop42: `BioBank_AdminUpload|Error: Failed to upload to server`,
                eVar42: `BioBank_AdminUpload|Error: Failed to upload to server`,
              })
            } else {
              // Save successful
              dispatch({
                type: 'navigate',
                data: 'finish'
              })
              PubSub.publish('ANALYTICS', {
                events: 'event80',
                eventName: 'AdminUploadComplete',
                prop42: `BioBank_AdminUpload|Completed`,
                eVar42: `BioBank_AdminUpload|Completed`,
              })
            }
          })
        })
      // }, 3000)
    } else {
      // submit button is disabled if there is no file - this is now just a fallback
      alert("you must upload a file")
    }
  }

  return (
    <>
    <Typography variant="h2" component="h2">{t('upload.1.form_title')}: {mochaContext.firstName} {mochaContext.lastName} <Chip className={classes.chip} size="small" label={mochaContext.patientId} /></Typography>
    <div className={classes.participantReport}>
      <div className={classes.uploadReport}>
        <Typography variant="h3">{t('upload.1.form_subtitle')}</Typography>
        {mochaContext.reportFile && mochaContext.reportFile.name && (
          <FileItem file={mochaContext.reportFile} onRemove={handleRemoveFile} />
        )}
        <input
          accept=".pdf"
          className={classes.input}
          id="report-upload-file"
          type="file"
          onChange={handleFileChange}
        />
        {!mochaContext.reportFile && (
          <label htmlFor="report-upload-file">
            <Button className={classes.btnSelectReport} variant="outlined" color="primary" component="span">{t('upload.1.button_select')}</Button>
          </label>
        )}
        {mochaContext.uploadError && <Status state="error" title={mochaContext.errorTitle} message={mochaContext.errorMessage} />}

        <FormButtons
          leftButtons={
            <>
            <Button variant="contained" color="primary" type="submit" ref={submitBtn} onClick={uploadFile} disabled={!mochaContext.reportFile || mochaContext.uploadError}>{t('a_common:buttons.submit')}</Button>
            <Button variant="text" color="primary" onClick={() => navigate('dashboard')}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
            </>
          }
        />
      </div>
      <div className={classes.reportList}>
        <ReportList reports={mochaContext.reports} />
      </div>
    </div>
  </>
  )
}

export default AddReport