import React from 'react';
import { Stepper, Typography, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles( theme => ({
  stepper: {
    marginTop: theme.spacing(2),
    backgroundColor: 'transparent'
  }
}))



const UploadStepper = (props) => {
  const {activeStep = 0} = props
  const classes = useStyles()
  const { t } = useTranslation('a_landingMocha')

  const stepText = [
    t('stepper.0.label'),
    t('stepper.1.label'),
    t('stepper.2.label')
  ]

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h3">{t('stepper_title')}</Typography>
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