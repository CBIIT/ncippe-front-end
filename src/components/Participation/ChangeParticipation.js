import React, { useContext, useState } from 'react';
import { Button, Box, FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'

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

  const changeParticipationOption = event => {
    setParticipationOption(event.target.value)
    setParticipationOptionError(false)
    
  }

  const handleNextStep = event => {
    if(!participationOption) {
      setParticipationOptionError(true)
    } else {
      nextStep(participationOption)
    }
  }

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Change your Biobank participation</Typography>
      <Typography>You may stop participating in the Biobank at anytime. You can also close your online account, but remain in the Biobank.</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <legend><Typography variant="h3">How would you like to change your Biobank participation?</Typography></legend>
        <InputGroupError error={participationOptionError} errorMessage="You must complete this field">
          <RadioGroup name="changeOption" value={participationOption} onChange={changeParticipationOption}>
            <FormControlLabel value="close" control={<Radio color="primary" />} label="Close online account" />
            <FormControlLabel value="leave" control={<Radio color="primary" disabled={isActiveBiobankParticipant === false ? true : false } />} label="Leave the Biobank project" />
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