import React, { useEffect, useRef, useState, useContext } from 'react'
import { Box, TextField, styled} from '@mui/material'
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

const StyledTextField = styled(TextField)({
  width: {
    xs: '100%', // mobile
    sm: '80%',
    md: '70%',
  }
});

const ParticipantInfo = () => {
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
    e.preventDefault();
    // console.log("submit form")
    setHasError(prev => ({
      firstName: !stringRegex.test(addParticipantContext.firstName),
      lastName: !stringRegex.test(addParticipantContext.lastName),
      email: addParticipantContext.email ===  null || addParticipantContext.email === '' ? false: !emailRegex.test(addParticipantContext.email),
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
    <Box component='form' id="activatePatient" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off" onSubmit={handleFormSubmit}>
      <StyledTextField
        error={hasError.firstName}
        required
        id="firstName"
        label={t('form.firstName')}
    
        margin="normal"
        variant="outlined"
        onChange={handleOnChange}
        value={addParticipantContext.firstName}
        helperText={hasError.firstName && t('form.error.firstName')}
      />
      <StyledTextField
        error={hasError.lastName}
        required
        id="lastName"
        label={t('form.lastName')}
        margin="normal"
        variant="outlined"
        onChange={handleOnChange}
        value={addParticipantContext.lastName}
        helperText={hasError.lastName && t('form.error.lastName')}
      />
      <StyledTextField
        error={hasError.email}
        // required
        id="email"
        label={t('form.email')}
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
      {addParticipantContext.existingEmail_error && <Status state="error" title={t('form.error.updateUser.title')} 
      message={t('form.error.updateUser.existingEmail')} />}
      {addParticipantContext.updateUser_error && !addParticipantContext.existingEmail_error && <Status state="error" title={t('form.error.updateUser.title')} 
      message={t('form.error.updateUser.message')} />}
    </Box>
  )
}

export default ParticipantInfo