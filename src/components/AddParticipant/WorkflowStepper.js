import React from 'react'
import { Stepper, Step, StepLabel, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const WorkflowStepper = (props) => {
  const {activeStep = 0} = props

  const { t } = useTranslation('a_landingMocha')
  const orientation = useMediaQuery('@media (max-width: 799px)') ? "vertical" : "horizontal"
  const labelOrientation = useMediaQuery('@media (max-width: 799px)') ? false : true

  const stepText = [
    t('stepper.0.label'),
    t('stepper.1.label'),
  ]

  return (
    <Stepper sx={{
      mt: 2,
      bgcolor: 'transparent',
      '@media (max-width: 799px)': {
        mt: 0,
        py: 2, // padding top/bottom: theme.spacing(2)
      },
    }} className="Stepper--small-labels" activeStep={activeStep} alternativeLabel={labelOrientation} orientation={orientation}>
      {stepText.map((text, i) => (
        <Step sx={{
          '@media (max-width: 799px)': {
            mb: '8px',
          },
        }} key={i}>
          <StepLabel>{text}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default WorkflowStepper