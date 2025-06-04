import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Progress = ({title}) => {
  return (
    <Box sx={{ display: 'flex',alignItems: 'center',}}>
      <CircularProgress size={70} />
      <Typography sx={{ ml: 3, display:'inline'}} variant="h6">{title}</Typography>
    </Box>
  )
}

export default Progress