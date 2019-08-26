import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link, navigate } from '@reach/router';
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  Breadcrumbs: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1]
  },
  pipe: {
    padding: theme.spacing(0, 2)
  },
  close: {
    float: 'right',
    textTransform: 'none',
    fontSize: theme.typography.h6.fontSize
  }
}))

const Breadcrumbs = (props) => {
  const classes = useStyles();
  const handleClick = (event) => {
    navigate('/dashboard')
  }
  return (
    <Container className={classes.Breadcrumbs}>
      <Typography variant="h5" component="p">
        <Link to="/dashboard">Home</Link> <span className={classes.pipe}>|</span> {props.pageName}
      </Typography>
      
      <Button variant="text" color="primary" size="large" className={classes.close} onClick={handleClick}><Close/>Close</Button>
      
    </Container>
  )
}

export default Breadcrumbs;