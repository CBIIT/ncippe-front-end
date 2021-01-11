import React, { useContext, useEffect, useState } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import Status from '../Status/Status'
import FileItem from '../Mocha/FileItem'

const useStyles = makeStyles(theme => ({
  // contentText: {
  //   marginBottom: theme.spacing(2)
  // },
  // formUpload: {
  //   marginTop: theme.spacing(3)
  // },
  // formButtons: {
  //   marginTop: theme.spacing(2)
  // },
  // dialog: {
  //   '& .MuiDialog-paper': {
  //     minWidth: 600,
  //   },
  // },
  btnSelectReport: {
    margin: theme.spacing(3,0,3)
  },
  input: {
    display: 'none'
  },
  spinner: {
    margin: theme.spacing(2, 0),
    maxWidth: '250px'
  },
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
}),{name: 'UploadConcentDialog'})

const formDataDefaults = {
  file: null,
  patientId: '',
  uploadError: false,
  errorTitle: '',
  errorMessage: ''
}

const UploadConcentDialog = (props) => {
  const {open, setParentState, patientId} = props
  const classes = useStyles()
  const [loginContext] = useContext(LoginContext)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(formDataDefaults)
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation(['a_uploadConsent','a_common'])
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    setIsOpen(open)
  },[open])

  const handleClose = (e, success = false) => {
    if(setParentState){
      if(typeof success === 'boolean'){
        setParentState(success)
      } else {
        setParentState(false)
      }
    } else {
      setIsOpen(false)
    }
    // delay form reset so modal can fade out
    setTimeout(() => {
      setFormData(formDataDefaults)
      setActiveStep(0)
    }, 250)
  }

  // controled file input
  const handleFileChange = (event) => {
    //f = f.replace(/.*[\/\\]/, ''); -ie: evt.target.files[0].name
    const file = event.currentTarget.files.item(0)

    if(file) {
      setFormData({
        ...formData,
        file: file
      })
    }
  }

  const handleRemoveFile = () => {
    const fileInput = document.getElementById('upload-file')
    fileInput.value = null
    setFormData({
      ...formData,
      file: null,
      uploadError: false
    })
  }

  const uploadFile = () => {
    const {token, uuid} = loginContext

    // verify that report data exists before fetch call
    if(!!formData.file) {

      // validate file type
      if(formData.file.type !== 'application/pdf') {
        setFormData(prevState => ({
          ...prevState,
          uploadError: true,
          errorTitle:t('upload.0.error.fileType.title'),
          errorMessage:t('upload.0.error.fileType.message'),
        }))

        return
      }

      PubSub.publish('ANALYTICS', {
        events: 'event75',
        eventName: 'ConsentUploadSubmit',
        prop42: `BioBank_ConsentUpload|Submit`,
        eVar42: `BioBank_ConsentUpload|Submit`,
      })
      setActiveStep(1)
      // reset errors
      setFormData(prevState => ({
        ...prevState,
        uploadError: false
      }))
      // fake response delay
      // setTimeout(() => {
        getAPI.then(api => {
          api.uploadConsentForm({
            patientId,
            uuid,
            reportFile: formData.file,
            fileType: 'PPE_FILETYPE_ECONSENT_FORM',
            token
          })
          .then(resp => {
            if(resp instanceof Error) {
              PubSub.publish('ANALYTICS', {
                events: 'event81',
                eventName: 'ConsentUploadError',
                prop42: `BioBank_ConsentUpload|Error`,
                eVar42: `BioBank_ConsentUpload|Error`,
              })
              // Save unsuccessful - go back a step
              setActiveStep(0)
              setFormData(prevState => ({
                ...prevState,
                uploadError: true,
                errorTitle:t('upload.0.error.onServer.title'),
                errorMessage:t('upload.0.error.onServer.message'),
              }))
            } else {
              PubSub.publish('ANALYTICS', {
                events: 'event80',
                eventName: 'ConsentUploadSuccess',
                prop42: `BioBank_ConsentUpload|Success`,
                eVar42: `BioBank_ConsentUpload|Success`,
              })
              // Save successful - close modal
              handleClose(null, true)
            }
          })
        })
      // }, 3000)
    } else {
      // submit button is disabled if there is no file - this is now just a fallback
      alert("you must upload a file")
    }
  }

  const handleSubmit = (e) => {
    if(activeStep === 0) {
      uploadFile()
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className={classes.dialog}
    >
      <DialogTitle id="responsive-dialog-title" disableTypography><Typography variant="h3" component="h3">{t('title')}</Typography></DialogTitle>
      <DialogContent>
      {activeStep === 0 && (
        <>
        <Typography>{t('description')}</Typography>
        {formData.file && formData.file.name && (
          <FileItem file={formData.file} onRemove={handleRemoveFile} />
        )}
        <input
          accept=".pdf"
          className={classes.input}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        {!formData.file && (
          <label htmlFor="upload-file">
            <Button className={classes.btnSelectReport} variant="outlined" color="primary" component="span">{t('upload.0.button_select')}</Button>
          </label>
        )}
        {formData.uploadError && <Status state="error" title={formData.errorTitle} message={formData.errorMessage} />}
        </>
      )}
      {activeStep === 1 && (
        <>
        <CircularProgress className={classes.progress} size={70} />
        <Typography className={classes.titleUploading} variant="h6">{t('upload.1.progress')}</Typography>
        {/* <img src={`${process.env.PUBLIC_URL}/assets/images/spinner-dna.svg`} className={classes.spinner} alt="Loading..." /> */}
        </>
      )}
      </DialogContent>
      <DialogActions>
        <Button disabled={!formData.file || formData.uploadError} onClick={handleSubmit} color="primary" variant="contained">{t('a_common:buttons.submit')}</Button>
        <Button variant="text" color="primary" onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadConcentDialog