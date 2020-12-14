import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@material-ui/icons'

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

const useStyles = makeStyles( theme => ({
  root: props => ({
    border: `1px solid ${statusTheme[props.state].color}`,
    borderLeftWidth: '10px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: statusTheme[props.state].background,
    flexWrap: 'nowrap',
    margin: theme.spacing(2, 0),
    maxWidth: props.fullWidth ? "none" : "500px",
    textAlign: "left"
  }),
  gridItem_icon: {
    margin: theme.spacing(2)
  },
  gridItem_text: {
    margin: theme.spacing(2, 2, 2, 0)
  },
  icon: props => ({
    fill: statusTheme[props.state].color,
    fontSize: '2rem'
  }),
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}),{name: 'Status'})

/**
 * Easily render status messages to users with useful feedback
 */
const Status = (props) => {
  const {state = 'info', title, message, fullWidth = false} = props
  const classes = useStyles({state,fullWidth})

  let Icon
  switch(state) {
    case 'success':
      Icon = SuccessIcon
      break;
    case 'warning':
      Icon = WarningIcon
      break;
    case 'error':
      Icon = ErrorIcon
      break;
    default:
      Icon = InfoIcon
  }

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.gridItem_icon}>
        <Icon className={classes.icon} />
      </Grid>
      <Grid item className={classes.gridItem_text}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography>{message}</Typography>
      </Grid>
    </Grid>
  )
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