import React from 'react';
import { 
  Container,
  Link,
  Typography, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { Link as RouterLink } from 'react-router-dom'

import LoginButton from '../../login/SharedLogin/LoginButton'

const useStyles = makeStyles(theme => ({
  appToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarLogo: {
    flexGrow: 1,
    maxHeight: 50,
    margin: 0,

    '& img': {
      height: 50,
      width: 'auto',
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <Typography component="header">
      <Container className={classes.appToolbarContainer}>
        <figure className={classes.toolbarLogo}>
          <Link component={RouterLink} to='/'>
            <img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} alt='NCI PPE logo' title='NCI Patient and Provider Engagement Portal' />
          </Link>
        </figure>
        <LoginButton />
      </Container>
    </Typography>
  )
}

export default Header