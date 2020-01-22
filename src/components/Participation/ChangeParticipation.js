import React, { useContext, useState } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Button, Box, FormControl, FormControlLabel, Link, RadioGroup, Radio, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTracking } from 'react-tracking'

import { LoginContext } from '../login/Login.context'
import InputGroupError from '../inputs/InputGroupError/InputGroupError'


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
  btnCancel: {
    marginLeft: theme.spacing(1)
  }
}))

const ChangeParticipation = (props) => {
  const {nextStep, cancel} = props
  const [loginContext, dispatch] = useContext(LoginContext)
  const { isActiveBiobankParticipant } = loginContext
  const [participationOption, setParticipationOption] = useState(false);
  const [participationOptionError, setParticipationOptionError] = useState(false);
  const classes = useStyles()
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
        events: 'event74'
      })
      nextStep(participationOption)
    }
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Change your Biobank participation</Typography>
      <Typography component="div"><p>You may stop participating in the Biobank at any time. You can close your online Biobank account but keep participating in the Biobank.</p><p><Link to="/dashboard/help" component={RouterLink} variant="button">Learn more about the difference between closing your online account and leaving the Biobank.</Link></p>
      </Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        <legend><Typography variant="h3">How would you like to change your Biobank participation?</Typography></legend>
        <InputGroupError error={participationOptionError} errorMessage="You must complete this field">
          <RadioGroup name="changeOption" value={participationOption} onChange={changeParticipationOption}>
            <FormControlLabel value="close" control={<Radio color="primary" />} label="Close online account" />
            <FormControlLabel value="leave" control={<Radio color="primary" disabled={isActiveBiobankParticipant === false ? true : false } />} label="Leave the Biobank" />
          </RadioGroup>
        </InputGroupError>
      </FormControl>
      <div className={classes.formButtons}>
        <Button variant="contained" color="primary" onClick={handleNextStep} disabled={participationOptionError}>Next</Button>
        <Button className={classes.btnCancel} variant="text" onClick={cancel}><ClearIcon />Cancel</Button>
      </div>
    </Box>
  )
}

export default ChangeParticipation