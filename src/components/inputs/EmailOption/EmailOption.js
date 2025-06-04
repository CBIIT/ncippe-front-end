import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'

const EmailOption = ({ value = true, editMode = false, onClick }) => {

  const { t } = useTranslation('a_accountSettings')
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
    return setChecked(value)
  }, [value])

  const handleChange = () => {
    setChecked(!checked)
    if(onClick) {
      // alert parent component to change
      onClick(!checked)
    }
  }

  return (
    <FormControl component="fieldset"  sx={{
        my: 2,
        minWidth: '200px',
      }}>
      <FormLabel 
      htmlFor="notifications-input" 
      component="legend" 
      sx={{
          fontWeight: 700,
          color: theme => theme.palette.text.primary,
          transform: 'none',
          mb: 1,
        }}>{t('profile.notifications.title')}</FormLabel>
      {editMode ? (
        <FormControlLabel
          control={
            <Checkbox 
            id="notifications-input"
            color="primary" 
            checked={checked} 
            onChange={handleChange} />
          }
          label={t('profile.notifications.edit_label')}
          labelPlacement="end"
        />
      ) : (
        <span>{t('profile.notifications.label')} {checked ? t('profile.notifications.on') : t('profile.notifications.off')}</span>
      )}
    </FormControl>
  )
}

EmailOption.displayName = "EmailOption"
EmailOption.propTypes = {
  /**
   * The phone number formatted as (###)###-####
   */
  value: PropTypes.bool,
  /**
   * Set this field to edit mode or read only mode
   */
  editMode: PropTypes.bool,
}

export default EmailOption