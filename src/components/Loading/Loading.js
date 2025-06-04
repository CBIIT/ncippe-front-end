import React from 'react'
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'

/**
 * A stylish animated loading indicator
 */
const Loader = ({message}) => (
  <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <Box component='img' srcSet={`/assets/images/spinner-dna.svg`} src={`/assets/images/spinner-dna.gif`} alt="loading indicator" width="250px" 
    sx={{width:250,height:250,margin:'auto 0'}} />
    { message && 
    <Typography variant='body1' sx={{ mt:2 }}>{message}</Typography>}
  </Box>
)
Loader.displayName = 'Loading'
Loader.propTypes = {
  /**
   * An optional message to display below the animated loading indicator
   */
  message: PropTypes.string
}
export default Loader