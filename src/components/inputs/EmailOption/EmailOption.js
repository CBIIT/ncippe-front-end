import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormControl, FormLabel, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2,0,1,0),
    minWidth: '200px'
  },
  formLegend: {
    // transform: 'translate(0, 1.5px) scale(0.75)',
    // transformOrigin: 'top left',
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none",
    marginBottom: theme.spacing(1)
  }
}),{name: 'EmailOption'});

const EmailOption = (props) => {
  const {value = true, editMode = false, onClick} = props
  const classes = useStyles()
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
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel 
      htmlFor="notifications-input" 
      component="legend" 
      className={classes.formLegend}>{t('profile.notifications.title')}</FormLabel>
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