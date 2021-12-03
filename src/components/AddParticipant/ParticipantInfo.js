import React, { useEffect, useRef, useState, useContext } from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { AddParticipantContext } from './AddParticipant.context'

import InputGroupError from '../inputs/InputGroupError'
import LangOption from '../inputs/LangOption'
import Status from '../Status'

const stringRegex = /^[a-zA-Z\s]{1,}/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //from https://emailregex.com/

const defaultValidations = {
  firstName: false,
  lastName: false,
  email: false,
  lang: false
}

const useStyles = makeStyles( theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: '70%'
  },
}),{name: 'ParticipantInfo'})

const ParticipantInfo = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const [addParticipantContext, dispatch] = useContext(AddParticipantContext)
  const [hasError, setHasError] = useState(defaultValidations)
  const initialRender = useRef(true);

  useEffect(()=>{
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if(!Object.values(hasError).includes(true)) {
        dispatch({
          type: "navigate",
          data: "submit"
        })
      }
    }
  }, [hasError, dispatch])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // console.log("submit form")
    setHasError(prev => ({
      firstName: !stringRegex.test(addParticipantContext.firstName),
      lastName: !stringRegex.test(addParticipantContext.lastName),
      email: !emailRegex.test(addParticipantContext.email),
      lang: typeof addParticipantContext.lang === 'string' ? false : true,
    }))
  }

  const handleOnChange = event => {
    const field = event.target
    dispatch({
      type: "update",
      data: {
        [field.id]: field.value
      }
    })
  }

  const updateLang = lang => {
    dispatch({
      type: "update",
      data: {
        lang
      }
    })
  }

  return (
    <form id="activatePatient" className={classes.form} autoComplete="off" onSubmit={handleFormSubmit}>
      <TextField
        error={hasError.firstName}
        required
        id="firstName"
        label={t('form.firstName')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={handleOnChange}
        value={addParticipantContext.firstName}
        helperText={hasError.firstName && t('form.error.firstName')}
      />
      <TextField
        error={hasError.lastName}
        required
        id="lastName"
        label={t('form.lastName')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={handleOnChange}
        value={addParticipantContext.lastName}
        helperText={hasError.lastName && t('form.error.lastName')}
      />
      <TextField
        error={hasError.email}
        required
        id="email"
        label={t('form.email')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={handleOnChange}
        value={addParticipantContext.email}
        helperText={hasError.email && t('form.error.email')}
      />
      <InputGroupError error={hasError.lang} errorMessage={t('form.lang.error')}>
        <LangOption 
          id="lang"
          label={t('form.lang.label')}
          helperText={t('form.lang.helper_text')}
          editMode={true}
          value={addParticipantContext.lang}
          onChange={updateLang}
        />
      </InputGroupError>
      {addParticipantContext.updateUser_error && <Status state="error" title={t('form.error.updateUser.title')} message={t('form.error.updateUser.message')} />}
    </form>
  )
}

export default ParticipantInfo