import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  boxMain: {
    padding: theme.spacing(3,0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5,3),
    }
  }
}))

const TabPanel = (props) => {
  const { children, ...other } = props
  const classes = useStyles()

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