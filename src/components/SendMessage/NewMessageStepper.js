import React from 'react'
import { Box, Stepper, Typography, Step, StepLabel, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NewMessageStepper = ({activeStep = 0}) => {

  const { t } = useTranslation('a_sendMessage')
  const isMobile = useMediaQuery('(max-width:799px)');
  const orientation = isMobile ? 'vertical' : 'horizontal';
  const labelOrientation = !isMobile;

  const stepText = Object.values(t('stepper', {returnObjects: true})).map(key => key.label)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" component="h3">{t('stepper_title')}</Typography>
      <Stepper className="Stepper--small-labels" sx={{
          mt: isMobile ? 0 : 2,
          backgroundColor: 'transparent',
          px: isMobile ? 0 : 2,
          py: isMobile ? 2 : 0,
        }} activeStep={activeStep} alternativeLabel={labelOrientation} orientation={orientation}>
        {stepText.map((text, i) => (
          <Step sx={{
              ...(isMobile && {
                mb: 1, // 8px
              }),
            }} key={i}>
            <StepLabel>{text}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default NewMessageStepper