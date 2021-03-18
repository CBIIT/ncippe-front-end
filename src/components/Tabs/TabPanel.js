import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  boxMain: {
    padding: props => props.stupidPaddingException ? theme.spacing(3,0,0) : theme.spacing(3,0),
    [theme.breakpoints.up('sm')]: {
      padding: props => props.stupidPaddingException ? theme.spacing(5,3,0) : theme.spacing(5,3),
    }
  }
}),{name: 'TabPanel'})

const TabPanel = (props) => {
  const { children, stupidPaddingException, ...other } = props
  const classes = useStyles(props)

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