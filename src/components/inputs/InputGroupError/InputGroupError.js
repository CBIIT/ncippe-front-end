import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography , useTheme } from '@mui/material'


/**
 * This is a HoC for adding error messages to form fields
 */
const InputGroupError = ({children, error = false, errorMessage = '', variant = false}) => {

  const theme = useTheme()

  return (
    <Box sx={{
        ...(variant === 'column' && {
          display: 'inline-flex',
          flexDirection: 'column',
        }),
        ...(error && {
          borderLeft: `10px solid ${theme.palette.error.main}`,
          padding: theme.spacing(0, 2),
          mt: 1,
        }),
      }} >
      {children}
      <Typography className="errorText" sx={{
          display: error ? 'inline-block' : 'none',
          color: theme.palette.error.main,
          fontWeight: 'bold',
        }} >{errorMessage}</Typography>
    </Box>
  )
}

InputGroupError.displayName = "InputGroupError"
InputGroupError.propTypes = {
  /**
   * The input group that is wrapped by the error
   */
  children: PropTypes.node.isRequired,
  /**
   * The error state of this component. When `true` the errorMessage is displayed
   */
  error: PropTypes.bool,
  /**
   * The error message displayed (after the form field) when there is an error
   */
  errorMessage: PropTypes.string,
  /**
   * An additional class to add to the component to provide layout options
   */
  variant: PropTypes.string
}

export default InputGroupError