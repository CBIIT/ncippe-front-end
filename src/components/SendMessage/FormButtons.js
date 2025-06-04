import React from 'react'
import { Box } from '@mui/material'

const FormButtons = ({ leftButtons, rightButtons }) => {

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
      }}>
      {leftButtons && 
        <Box sx={{
          display: 'flex',
          '& button': { marginRight: 2 },
        }}>
          {leftButtons}
        </Box>
      }
      {rightButtons &&
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& button': { marginLeft: 2 },
        }}>
          {rightButtons}
        </Box>
      }
    </Box>
  )
}

export default FormButtons