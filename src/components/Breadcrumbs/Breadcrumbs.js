import React from 'react'
import { navigate } from '@reach/router'
import { Container, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  Breadcrumbs: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  back: {
    marginLeft: theme.spacing(4),
    fontSize: theme.typography.h6.fontSize,
    lineHeight: 0,
    textTransform: 'none',
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
}))

const Breadcrumbs = (props) => {
  const classes = useStyles()
  const handleClick = () => {
    if(props.link) {
      navigate(props.link)
    } else {
      window.history.back()
    }
  }
  return (
    <Container className={classes.Breadcrumbs}>
      <Typography>
        <Button className={classes.back} color="primary" variant="text" onClick={handleClick}><ArrowBack className={classes.backIcon} /> Back</Button>
      </Typography>
    </Container>
  )
}

export default Breadcrumbs