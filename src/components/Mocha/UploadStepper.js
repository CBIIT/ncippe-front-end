import React from 'react'
import { Box, Stepper, Typography, Step, StepLabel, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const UploadStepper = ({activeStep = 0}) => {

  const { t } = useTranslation('a_landingMocha')
  const isMobile = useMediaQuery('(max-width:799px)');
  const orientation = isMobile ? "vertical" : "horizontal"
  const labelOrientation = !isMobile 

  const stepText = [
    t('stepper.0.label'),
    t('stepper.1.label'),
    t('stepper.2.label')
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" component="h3" sx={{ mb: 2 }}>{t('stepper_title')}</Typography>
      <Stepper className="Stepper--small-labels" sx={{
          mt: isMobile ? 0 : 2,
          backgroundColor: 'transparent',
          ...(isMobile && {
            px: 0,
            py: 2,
          }),
        }} activeStep={activeStep} alternativeLabel={labelOrientation} orientation={orientation}>
        {stepText.map((text, i) => (
          <Step key={i} sx={{
              ...(isMobile && {
                mb: 1,
              }),
            }}>
            <StepLabel>{text}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default UploadStepper