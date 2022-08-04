import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, TextField} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '300px',
    '& .MuiInput-formControl': {
      marginTop: 20
    },
    '& .MuiInput-underline:before': {
      display: 'none'
    }
  },
  label: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none"
  },
  helperText: {
    marginBottom: theme.spacing(2)
  }
}),{name: 'Email'});

const Email = (props) => {
  const { value, editMode = false, error = false, onChange } = props
  const classes = useStyles()
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
    <FormControl className={classes.formControl} margin="normal">
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
          className: classes.label,
          error
        }}
        FormHelperTextProps={{
          className: classes.helperText
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