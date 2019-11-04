import React from 'react';
import { Stepper, Typography, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
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

const UploadStepper = (props) => {
  const {activeStep = 0} = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h3">Upload process</Typography>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {stepText.map((text, i) => (
          <Step key={i}>
            <StepLabel><Typography >{text}</Typography></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default UploadStepper