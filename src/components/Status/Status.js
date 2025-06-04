import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import {
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material'

const statusTheme = {
  success: {
    color: '#00a91c',
    background: '#ecf3ec'
  },
  warning: {
    color: '#ffbe2e',
    background: '#faf3d1'
  },
  error: {
    color: '#d63e04',
    background: '#f4e3db'
  },
  info: {
    color: '#00bde3',
    background: '#e7f6f8'
  }
}

/**
 * Easily render status messages to users with useful feedback
 */
const Status = ({state = 'info', title, message, fullWidth = false}) => {

  const theme = statusTheme[state] || statusTheme.info
  const Icon = {
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  }[state] || InfoIcon

  return (
    <Grid container wrap="nowrap" sx={{
      border: `1px solid ${theme.color}`,
      borderLeftWidth: '10px',
      borderRadius: 1,
      backgroundColor: theme.background,
      flexWrap: 'nowrap',
      m: 2,
      maxWidth: fullWidth ? 'none' : 500,
      textAlign: 'left'
    }}>
      <Grid sx={{ m: 2 }} >
        <Icon sx={{ color: theme.color, fontSize: '2rem' }}  />
      </Grid>
      <Grid sx={{ m: 2, ml: 0 }} >
        { title && (
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography> )}
        { message && (
          <Typography>{message}</Typography> )}
      </Grid>
    </Grid>
  );
}

Status.displayName = 'Status'
Status.propTypes = {
  /**
   * The visual state of the status message
   */
  state: PropTypes.oneOf(['success','warning','error','info']),
  /**
   * The title for this status message
   */
  title: PropTypes.string.isRequired,
  /**
   * The descriptive text that appears in the status message
   */
  message: PropTypes.string.isRequired,
  /**
   * Optionally set the component to 100% width
   */
  fullWidth: PropTypes.bool
}

export default Status