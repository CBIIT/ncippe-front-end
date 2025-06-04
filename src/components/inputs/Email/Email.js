import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormControl, TextField} from '@mui/material'
import { useTranslation } from 'react-i18next'

const Email = (props) => {
  const { value, editMode = false, error = false, onChange } = props
  const { t } = useTranslation('a_accountSettings')
  // const [email, setEmail] = useState(value)

  const handleChange = event => {
    // setEmail(event.target.value)
    // alert parent component to change
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <FormControl sx={{
      minWidth: 300,
      mt: 2, // replaces marginTop in input
      '& .MuiInput-underline:before': {
        display: 'none',
      },
    }} margin="normal">
      <TextField
        label={t('profile.email.title')}
        error={error}
        value={value}
        onChange={handleChange}
        id="email-input"
        placeholder={t('profile.email.title')}
        variant={editMode ? 'outlined': 'standard'}
        disabled={ !editMode }
        
        helperText={editMode ? t('profile.email.helper_text') : ''}
        inputProps={{
          readOnly: !editMode
        }}
        InputLabelProps={{
          shrink: true,
          sx: {
            fontWeight: 700,
            color: 'text.primary',
            transform: 'none',
          },
          error
        }}
        FormHelperTextProps={{
          sx: { mb: 2 },
        }}
      />
    </FormControl>
  )
}

Email.displayName = "Email"
Email.propTypes = {
  /**
   * The email as text
   */
  value: PropTypes.string,
  /**
   * Set this field to edit mode or read only mode
   */
  editMode: PropTypes.bool,
  /**
   * Flag this component as having an error
   */
  error: PropTypes.bool,
  /**
   * callback function passing the `value`
   */
  onChange: PropTypes.func,
}

export default Email