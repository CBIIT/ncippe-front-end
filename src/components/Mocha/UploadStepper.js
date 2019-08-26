import React from 'react';
import { Stepper, Typography, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  stepper: {
    marginTop: theme.spacing(2),
    backgroundColor: 'transparent'
  }
}))

const stepText = [
  'Input Patient ID',
  'Select report from your computer',
  'System notifies patient'
]

const UploadStepper = ({activeStep = 0}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6">Upload process</Typography>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {stepText.map((text, i) => (
          <Step key={i}>
            <StepLabel>{text}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default UploadStepper