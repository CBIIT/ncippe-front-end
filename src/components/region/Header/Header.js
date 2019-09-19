import React from 'react';
import { 
  Container,
  Link,
  Typography, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from "@reach/router"

import LoginButton from '../../login/SharedLogin/LoginButton'
import ActivateButton from '../../login/SharedLogin/ActivateButton'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  appToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarLogo: {
    flexGrow: 1,
    maxHeight: 50,
    margin: 0,
    marginTop: theme.spacing(3),

    '& img': {
      height: 50,
      width: 'auto',
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <Typography className={classes.root} component="header">
      <Container className={classes.appToolbarContainer}>
        <figure className={classes.toolbarLogo}>
          <Link component={RouterLink} to='/'>
            <img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} alt='NCI PPE logo' title='NCI Patient and Provider Engagement Portal' />
          </Link>
        </figure>
        <ActivateButton />
        <LoginButton />
      </Container>
    </Typography>
  )
}

export default Header