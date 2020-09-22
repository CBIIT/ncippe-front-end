import React, { useContext, useState } from 'react'
import { Button, Box, FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

import { LoginContext } from '../login/Login.context'
import InputGroupError from '../inputs/InputGroupError/InputGroupError'
import RenderContent from '../utils/RenderContent'


const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2, 0, 5),
  },
  formButtons: {
    marginBottom: theme.spacing(2)
  },
  btnSubmit: {
    marginRight: theme.spacing(1)
  }
}))

const ChangeParticipation = (props) => {
  const {nextStep, cancel, isMobile} = props
  const [loginContext] = useContext(LoginContext)
  const { isActiveBiobankParticipant } = loginContext
  const [participationOption, setParticipationOption] = useState(false);
  const [participationOptionError, setParticipationOptionError] = useState(false);
  const classes = useStyles()
  const { t } = useTranslation(['a_changeParticipation','a_common'])
  const { trackEvent } = useTracking()

  const changeParticipationOption = event => {
    setParticipationOption(event.target.value)
    setParticipationOptionError(false)
    
  }

  const handleNextStep = event => {
    if(!participationOption) {
      setParticipationOptionError(true)
    } else {
      trackEvent({
        prop42: `BioBank_ChangeParticipation|Next:${participationOption}`,
        eVar42: `BioBank_ChangeParticipation|Next:${participationOption}`,
        events: 'event74',
        eventName: 'ChangeParticipationNext'
      })
      nextStep(participationOption)
    }
  }

  return (
    <Box>
      <Typography className={classes.header} variant={isMobile ? "h2" : "h1"} component="h1">{t('landing.pageTitle')}</Typography>
      <Typography component="div"><RenderContent source={t('landing.body')} /></Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        <legend><Typography variant={isMobile ? "h4" : "h3"}>{t('landing.form.title')}</Typography></legend>
        <InputGroupError error={participationOptionError} errorMessage={t('landing.form.error')}>
          <RadioGroup name="changeOption" value={participationOption} onChange={changeParticipationOption}>
            <FormControlLabel value="close" control={<Radio color="primary" />} label={t('landing.form.close')} />
            <FormControlLabel value="leave" control={<Radio color="primary" disabled={isActiveBiobankParticipant === false ? true : false } />} label={t('landing.form.leave')} />
          </RadioGroup>
        </InputGroupError>
      </FormControl>
      <div className={classes.formButtons}>
        <Button className={classes.btnSubmit} variant="contained" color="primary" onClick={handleNextStep} disabled={participationOptionError}>{t('a_common:buttons.next')}</Button>
        <Button variant="text" color="primary" onClick={cancel}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </div>
    </Box>
  )
}

export default ChangeParticipation