import { Box } from '@mui/material'

const FormButtons = ({ leftButtons, rightButtons }) => {

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      mt: 2 
    }}>
      {leftButtons && 
        <Box sx={{'& button': { marginRight: 2 }}}>
          {leftButtons}
        </Box>
      }
      {rightButtons &&
        <Box sx={{ textAlign: 'right', '& button': { marginLeft: 2 } }}>
          {rightButtons}
        </Box>
      }
    </Box>
  )
}

export default FormButtons