import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  statusGrid: {
    flexWrap: 'nowrap',
    marginTop: theme.spacing(4),
    '& > div:last-of-type': {
      maxWidth: '300px'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  statusIcon: {
    width: '140px',
    [theme.breakpoints.up('xs')]: {
      marginRight: theme.spacing(3)
    }
  },
  statusText: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
}),{name: 'NoItems'})

/**
 * Display a simple and reusable "No Items" message. This component is used for notifications, biomarker reports and consent forms
 */
const NoItems = (props) => {
  const { message = 'No items to display'} = props
  const classes = useStyles()

  return (
    <Grid container className={classes.statusGrid}>
      <Grid item>
        <img className={classes.statusIcon} src={`${process.env.PUBLIC_URL}/assets/icons/empty-folder.svg`} alt='empty folder icon' aria-hidden="true"></img>
      </Grid>
      <Grid item>
        <Typography className={classes.statusText}><RenderContent children={message} /></Typography>
      </Grid>
    </Grid>
  )
}

NoItems.displayName = "NoItems"
NoItems.propTypes = {
  /**
   * A message to display below the empty folder image
   */
  message: PropTypes.string
}

export default NoItems