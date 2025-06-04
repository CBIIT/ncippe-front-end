import React, { useContext, useState } from 'react'
import { Button, Box, FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { useOutletContext } from 'react-router-dom'
import { LoginContext } from '../login/Login.context'
import InputGroupError from '../inputs/InputGroupError'
import RenderContent from '../utils/RenderContent'


const ChangeParticipation = () => {
  const { nextStep, cancel, isMobile } = useOutletContext();
  const [loginContext] = useContext(LoginContext)
  const { isActiveBiobankParticipant } = loginContext
  const [participationOption, setParticipationOption] = useState(false);
  const [participationOptionError, setParticipationOptionError] = useState(false);
  const { t } = useTranslation(['a_changeParticipation','a_common'])

  const changeParticipationOption = event => {
    setParticipationOption(event.target.value)
    setParticipationOptionError(false)
    
  }

  const handleNextStep = () => {
    if(!participationOption) {
      setParticipationOptionError(true)
    } else {
      PubSub.publish('ANALYTICS', {
        events: 'event74',
        eventName: 'ChangeParticipationNext',
        prop42: `BioBank_ChangeParticipation|Next:${participationOption}`,
        eVar42: `BioBank_ChangeParticipation|Next:${participationOption}`,
      })
      nextStep(participationOption)
    }
  }

  return (
    <Box>
      <Typography sx={{ mb: 2 }} variant={isMobile ? "h2" : "h1"} component="h1">{t('landing.pageTitle')}</Typography>
      <Typography component="div"><RenderContent children={t('landing.body')} /></Typography>

      <FormControl component="fieldset" sx={{ my:2, mb:5 }} >
        <legend><Typography variant={isMobile ? "h4" : "h3"}>
          {t('landing.form.title')}
          </Typography></legend>
        <InputGroupError error={participationOptionError} errorMessage={t('landing.form.error')}>
          <RadioGroup name="changeOption" value={participationOption} onChange={changeParticipationOption}>
            <FormControlLabel value="close" control={<Radio color="primary" />} label={t('landing.form.close')} />
            <FormControlLabel value="leave" control={<Radio color="primary" disabled={isActiveBiobankParticipant === false ? true : false } />} 
            label={t('landing.form.leave')} />
          </RadioGroup>
        </InputGroupError>
      </FormControl>
      <Box sx={{ mb: 2 }}>
        <Button sx={{mr: 1 }} variant="contained" color="primary" onClick={handleNextStep} 
        disabled={participationOptionError}>
          {t('a_common:buttons.next')}</Button>
        <Button variant="text" color="primary" onClick={cancel}>
          <ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </Box>
    </Box>
  )
}

export default ChangeParticipation