import React, { useState, useContext } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import { AddParticipantContext } from './AddParticipant.context'

import FileItem from '../FileItem'
import Status from '../Status'
// import FormButtons from '../inputs/FormButtons'


const useStyles = makeStyles( theme => ({
  input: {
    display: 'none'
  },
}),{name: 'AddConsent'})

const AddConsent = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const [addParticipantContext, dispatch] = useContext(AddParticipantContext)
  const [fileError, setFileError] = useState(false)
  const [fileTypeError, setFileTypeError] = useState(false)

  

  // controled file input
  const handleFileChange = (event) => {
    //f = f.replace(/.*[\/\\]/, ''); -ie: evt.target.files[0].name
    const file = event.currentTarget.files.item(0)

    if(file) {
      dispatch({
        type: 'update',
        data: {
          file
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
        file: null
      }
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // console.log("upload file")

    // verify that report data exists before fetch call
    if(!!addParticipantContext.file) {

      // validate file type
      if(addParticipantContext.file.type !== 'application/pdf') {
        setFileTypeError(true)
        return
      }

      PubSub.publish('ANALYTICS', {
        events: 'event78',
        eventName: 'NewParticipantSubmit',
        prop42: `BioBank_NewParticipant|Submit`,
        eVar42: `BioBank_NewParticipant|Submit`,
      })
      
      // reset errors, show spinner
      dispatch({
        type: 'navigate',
        data: 'submit'
      })
    } else {
      // submit button is disabled if there is no file - this is now just a fallback
      // alert("you must upload a file")
      setFileError(true)
    }
  }

  return (
    <form id="activatePatient" className={classes.form} autoComplete="off" onSubmit={handleFormSubmit}>
      {addParticipantContext.file && addParticipantContext.file.name && (
        <FileItem file={addParticipantContext.file} onRemove={handleRemoveFile} />
      )}
      <input
        accept=".pdf"
        className={classes.input}
        id="report-upload-file"
        type="file"
        onChange={handleFileChange}
      />
      {!addParticipantContext.file && (
        <label htmlFor="report-upload-file">
          <Button className={classes.btnSelectReport} variant="outlined" color="primary" component="span">{t('form.consentFile')}</Button>
        </label>
      )}
      {fileError && <Status state="error" title={t('form.error.noFile.title')} message={t('form.error.noFile.message')} />}
      {fileTypeError && <Status state="error" title={t('form.error.fileType.title')} message={t('form.error.fileType.message')} />}
      {addParticipantContext.upload_error && <Status state="error" title={t('form.error.uploadFile.title')} message={t('form.error.uploadFile.message')} />}
    </form>
  )
}

export default AddConsent