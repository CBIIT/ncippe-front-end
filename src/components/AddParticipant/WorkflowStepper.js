import React from 'react'
import { Stepper, Step, StepLabel, useMediaQuery } from '@material-ui/core'
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
  step: {
    [`@media (max-width: 799px)`]: {
      marginBottom: 8
    }
  }
}),{name: 'WorkflowStepper'})



const WorkflowStepper = (props) => {
  const {activeStep = 0} = props
  const classes = useStyles()
  const { t } = useTranslation('a_landingMocha')
  const orientation = useMediaQuery('@media (max-width: 799px)') ? "vertical" : "horizontal"
  const labelOrientation = useMediaQuery('@media (max-width: 799px)') ? false : true

  const stepText = [
    t('stepper.0.label'),
    t('stepper.1.label'),
  ]

  return (
    <Stepper className={`${classes.stepper} Stepper--small-labels`} activeStep={activeStep} alternativeLabel={labelOrientation} orientation={orientation}>
      {stepText.map((text, i) => (
        <Step className={classes.step} key={i}>
          <StepLabel>{text}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default WorkflowStepper