import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0D1C3C',
    padding: theme.spacing(3),
    color: theme.palette.common.white
  },
  logo: {
    float: 'left',
    border: `1px solid ${theme.palette.common.white}`,
    padding: theme.spacing(2)
  },
  links: {
    float: 'right',
    border: `1px solid ${theme.palette.common.white}`,
    padding: theme.spacing(2)
  }
}))


const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <div className={classes.logo}>NCI Logo</div>
      <div className={classes.links}>Footer links, including social media</div>
    </footer>
  )
}
  
export default Footer