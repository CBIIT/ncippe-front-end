import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  title: {
    marginLeft: theme.spacing(3),
    display: 'inline',
  },
}),{name: 'Progress'})

const Progress = (props) => {
  const classes = useStyles()
  const { title } = props

  return (
    <Box>
      <CircularProgress size={70} />
      <Typography className={classes.title} variant="h6">{title}</Typography>
    </Box>
  )
}

export default Progress