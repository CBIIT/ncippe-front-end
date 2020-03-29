import React from 'react';
import { Stepper, Typography, Step, StepLabel, StepContent, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles( theme => ({
  stepper: {
    marginTop: theme.spacing(2),
    backgroundColor: 'transparent',
    [`@media (max-width: 799px)`]: {
      marginTop: 0,
      padding: theme.spacing(2,0)
    }
  },
  label: {
    margin: "0 !important",
  }
}))



const UploadStepper = (props) => {
  const {activeStep = 0} = props
  const classes = useStyles()
  const { t } = useTranslation('a_landingMocha')
  const orientation = useMediaQuery('@media (max-width: 799px)') ? "vertical" : "horizontal"
  const labelOrientation = useMediaQuery('@media (max-width: 799px)') ? false : true

  const stepText = [
    t('stepper.0.label'),
    t('stepper.1.label'),
    t('stepper.2.label')
  ]

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h3">{t('stepper_title')}</Typography>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel={labelOrientation} orientation={orientation}>
        {stepText.map((text, i) => (
          <Step key={i}>
            <StepLabel><Typography className={classes.label}>{text}</Typography></StepLabel>
            <StepContent /> {/* StepContent item is needed for vertical spacing} */}
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default UploadStepper