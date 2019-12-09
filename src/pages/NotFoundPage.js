import React, { useEffect } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import track, { useTracking } from 'react-tracking'

const useStyles = makeStyles( theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  clear: {
    display: 'inline-flex',
    border: '5px solid',
    borderRadius: '50%',
    
    "& > svg": {
      padding: 10,
      fontSize: "5.8rem",
    }
  }
}))

const ErrorPage = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('errorPage')
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({event:'pageview'})
  },[trackEvent])

  return (
    <Box mt={5}>
      <Container className={classes.container}>
        <div>
          <div className={classes.clear}>
            <ClearIcon />
          </div>
        </div>
        <Typography variant="h1" component="h1">{t('pageTitle')}</Typography>
        <Typography gutterBottom variant="h2" component="h2">{t('subtitle')}</Typography>
        <div>
          <Button variant="contained" color="primary" component={RouterLink} to="/">{t('buttonText')}</Button>
        </div>
      </Container>
    </Box>
  )
}

export default track({
  prop6: "Error Page",
  pageType: "errorpage"
})(ErrorPage)