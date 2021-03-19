import React, { useContext, useRef, useState, Suspense } from 'react'
import { Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import InputGroupError from '../inputs/InputGroupError'
import Editor from '../Editor'
import Loading from '../Loading'
import { SendMessageContext } from './SendMessage.context'
import FormButtons from './FormButtons'

const useStyles = makeStyles( theme => ({
  formControl: {
    margin: theme.spacing(2,0,1,0),
    display: 'block',
  },
}),{name: 'ComposeMessage'})

const ComposeMessage = (props) => {
  const { onNavigate } = props
  const classes = useStyles()
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)
  const { t } = useTranslation(['a_sendMessage'])
  const tinyEditor = useRef(null)
  const tinyEditor_InitialValue = t('compose.textarea_placeholder')
  const [subject, setSubject] = useState(sendMessageContext.subject)
  const [subjectError, setSubjectError] = useState(false)
  const [message, setMessage]  = useState(sendMessageContext.message)
  const [messageError, setMessageError] = useState(false)

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

  const handleSubjectChange = (e) => {
    if(subjectError) {
      setSubjectError(false)
    }
    setSubject(e.target.value)
  }

  const handleMessageChange = (content) => {
    if(messageError) {
      setMessageError(false)
    }
    setMessage(content)
  }

  const handlePrevious = () => {
    // just save everything weather it's valid or not
    dispatch({
      type: 'update',
      data: {
        subject,
        message,
        navigate: 'recipients'
      }
    })
  }

  const handleSubmit = (e) => {
    let valid = true
    const cleanValue = tinyEditor.current.editor.getContent().replace(/\r?\n|\r/g, '').trim()
    if(!subject) {
      setSubjectError(true)
      valid = false
    }
    if(!cleanValue || cleanValue === tinyEditor_InitialValue) {
      setMessageError(true)
      valid = false
    }
    if(valid) {
      dispatch({
        type: 'update',
        data: {
          subject,
          message,
          navigate: 'preview'
        }
      })
    }
  }

  return (
    <Box>
      <Typography variant="h3">{t('compose.title')}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <Box mb={2}>
          <TextField
            error={subjectError} 
            variant="outlined"
            fullWidth
            label={t('compose.input_label')}
            placeholder={t('compose.input_placeholder')}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={subjectError ? t('compose.form.error_input') : t('compose.input_helper_text')}
            value={subject}
            onChange={handleSubjectChange}
          />
        </Box>
          <Suspense fallback={<div style={{display:'flex', justifyContent:'center', width:'100vw', height:'50vh'}}><Loading /></div>}>
            <InputGroupError error={messageError} errorMessage={t('compose.form.error_textarea')}>
              <Editor 
              ref={tinyEditor} 
              value={message}
              initialValue={tinyEditor_InitialValue} 
              onEditorChange={handleMessageChange} />
            </InputGroupError>
          </Suspense>
      </FormControl>
      <FormButtons
        leftButtons={<Button variant="text" color="primary" onClick={() => navigate('dashboard')}><ClearIcon />{t('a_common:buttons.cancel')}</Button>}
        rightButtons={
          <>
            <Button variant="outlined" color="primary" onClick={handlePrevious}>{t('a_common:buttons.previous')}</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>{t('a_common:buttons.next')}</Button>
          </>
        }
      />
    </Box>
  )
}

export default ComposeMessage