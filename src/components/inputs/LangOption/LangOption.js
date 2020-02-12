import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles( theme => ({
  formControl: {
    margin: theme.spacing(2,0,1,0),
    minWidth: '200px'
  },
  formLegend: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none",
    marginBottom: theme.spacing(1)
  },
  toggleButtonGroup: {
    padding: theme.spacing(1,0,2),
    '& .MuiToggleButton-root': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(0, 3)
    },
    '& .MuiToggleButton-root:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '& .Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    '& .Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}))

const LanguagePreferences = (props) => {
  const { t } = useTranslation(['a_accountSettings','a_common'])
  const {id = "language-input", label, helperText, value, editMode, onChange} = props
  const classes = useStyles()
  const [lang, setLang] = useState(value)

  useEffect(() => {
    setLang(value)
    return setLang(value)
  }, [value])

  const handleChange = (event) => {
    setLang(event.currentTarget.value)
    if(onChange) {
      // alert parent component to change
      onChange(event.currentTarget.value)
    }
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      {label && 
      <FormLabel 
        htmlFor={id} 
        component="legend" 
        className={classes.formLegend}>{label}</FormLabel>
      }
      {editMode ? <>
        <ToggleButtonGroup
          id={id}
          className={classes.toggleButtonGroup}
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

export default LanguagePreferences