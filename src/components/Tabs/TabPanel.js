import React from 'react'
import { Box, Typography } from '@mui/material'


const TabPanel = ({ children, stupidPaddingException, ...other }) => {
  
  return (
    <Typography
      component="div"
      role="tabpanel"
      {...other}
    >
      <Box className={classes.boxMain}>{children}</Box>
    </Typography>
  )
}

export default TabPanel