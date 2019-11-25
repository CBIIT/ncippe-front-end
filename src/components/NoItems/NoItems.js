import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  statusGrid: {
    flexWrap: 'nowrap',
    marginTop: theme.spacing(4),
    '& > div:last-of-type': {
      maxWidth: '300px'
    }
  },
  statusIcon: {
    marginRight: theme.spacing(3),
    width: '140px',
  },
  statusText: {
    fontWeight: 'bold'
  },
}))

const NoItems = (props) => {
  const {message} = props
  const classes = useStyles()

  return (
    <Grid container className={classes.statusGrid}>
      <Grid item>
        <img className={classes.statusIcon} src={`/${process.env.PUBLIC_URL}assets/icons/empty-folder.svg`} alt='patient icon' aria-hidden="true"></img>
      </Grid>
      <Grid item>
        <Typography className={classes.statusText}><RenderContent source={message} /></Typography>
      </Grid>
    </Grid>
  )
}

export default NoItems