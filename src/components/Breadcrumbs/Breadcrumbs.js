import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router';
import { ArrowBack } from '@material-ui/icons'

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
  back: {
    fontSize: theme.typography.h6.fontSize,
    lineHeight: 0,
    textTransform: 'none'
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
}))

const Breadcrumbs = () => {
  const classes = useStyles();
  const handleClick = () => {
    navigate('/dashboard')
  }
  return (
    <Container className={classes.Breadcrumbs}>
      <Typography>
        <Button className={classes.back} color="primary" variant="text" onClick={handleClick}><ArrowBack className={classes.backIcon} /> Back</Button>
      </Typography>
    </Container>
  )
}

export default Breadcrumbs;