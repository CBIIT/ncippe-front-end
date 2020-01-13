import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles( theme => ({
  root: {
    position: "fixed",
    bottom: 10,
    right: 30
  }
}))

const LanguageToggle = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  const toggleLang = (e) => {
    const newLang = lang === 'en' ? "es" : "en"
    i18n.changeLanguage(newLang, () => {
      setLang(i18n.language)
    })
  }

  console.log(i18n)

  return (
    <Button className={classes.root} variant="contained" onClick={toggleLang}>
      {lang === 'en' ? "Español": "English" }
    </Button>
  )
}

export default LanguageToggle