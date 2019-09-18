import React from 'react';
import { Grid, Typography } from '@material-ui/core';
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
    maxWidth: "500px"
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
}))

const Status = (props) => {
  const {state, title, message} = props
  const classes = useStyles(props)

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.gridItem_icon}>
        {state==='success' && <SuccessIcon className={classes.icon} />}
        {state==='warning' && <WarningIcon className={classes.icon} />}
        {state==='error' && <ErrorIcon className={classes.icon} />}
        {state==='info' && <InfoIcon className={classes.icon} />}
      </Grid>
      <Grid item className={classes.gridItem_text}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography>{message}</Typography>
      </Grid>
    </Grid>
  )
}

export default Status