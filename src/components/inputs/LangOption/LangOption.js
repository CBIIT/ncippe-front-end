import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormLabel, FormHelperText } from '@mui/material'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useTranslation } from 'react-i18next'

const LanguagePreferences = (props) => {
  const { t } = useTranslation(['a_accountSettings','a_common'])
  const {id = "language-input", label, helperText, value, editMode = false, onChange} = props
  const [lang, setLang] = useState(value)

  useEffect(() => {
    setLang(value)
    return setLang(value)
  }, [value])

  const handleChange = (event) => {
    const newLang = event.currentTarget.value
    setLang(newLang)
    if(onChange) {
      // alert parent component to change
      onChange(newLang)
    }
  }

  return (
    <FormControl component="fieldset" sx={{ my: 2, minWidth: '200px' }}>
      {label && 
      <FormLabel 
        htmlFor={id} 
        component="legend" 
        sx={{
            fontWeight: 700,
            color: theme => theme.palette.text.primary,
            transform: 'none',
            mb: 1,
          }}>{label}</FormLabel>
      }
      {editMode ? <>
        <ToggleButtonGroup
          id={id}
          sx={{
              py: 1,
              pb: 2,
              '& .MuiToggleButton-root': {
                color: theme => theme.palette.primary.main,
                borderColor: theme => theme.palette.primary.main,
                backgroundColor: theme => theme.palette.common.white,
                px: 3,
              },
              '& .MuiToggleButton-root:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              '& .Mui-selected': {
                color: theme => theme.palette.common.white,
                backgroundColor: theme => theme.palette.primary.main,
              },
              '& .Mui-selected:hover': {
                backgroundColor: theme => theme.palette.primary.main,
              },
            }}
          value={lang}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="en">{t('profile.lang.english')}</ToggleButton>
          <ToggleButton value="es">{t('profile.lang.spanish')}</ToggleButton>
        </ToggleButtonGroup>
        {helperText && <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>}
      </>
      :
      <span>{lang === 'en' ? t('profile.lang.english') : t('profile.lang.spanish')}</span>
    }
  </FormControl>
  )
}

LanguagePreferences.displayName = "LanguagePreferences"
LanguagePreferences.propTypes = {
  /**
   * The unique Id for this FormControl
   */
  id: PropTypes.string,
  /**
   * The label text that goes with the form control
   */
  label: PropTypes.string,
  /**
   * The helper text that appears under form control
   */
  helperText: PropTypes.string,
  /**
   * The value of the toggle button
   */
  value: PropTypes.oneOf(['en','es']),
  /**
   * Switched the component from an interactive form control to static text
   */
  editMode: PropTypes.bool,
  /**
   * callback function when the control is toggled, passing the `value`
   */
  onChange: PropTypes.func,
}

export default LanguagePreferences