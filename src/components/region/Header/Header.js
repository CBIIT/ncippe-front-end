import React, { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  Container,
  Link,
  Typography, 
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from "@reach/router"

import LoginButton from '../../login/SharedLogin/LoginButton'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2,0)
  },
  appToolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },
  toolbarLogo: {
    flexGrow: 1,
    maxHeight: 50,
    margin: 0,
    

    '& img': {
      height: 50,
      width: 'auto',
      maxWidth: '100%',
    },
  },
  headerLink: {
    color: theme.palette.grey[800],
    marginRight: theme.spacing(1),
    
    '&:hover': {
      color: theme.palette.grey[900],
      fontWeight: '600'
    }
  },
  mockUsers: {
    marginRight: theme.spacing(1)
  },
  publicNavDesktop: {
    display: 'none',
    [theme.breakpoints.up('smLandscape')]: {
      display: 'flex',
      position: 'relative',
      margin: theme.spacing(0,2),
      '& a': {
        marginRight: theme.spacing(2),
      },
      '& a:last-of-type': {
        marginRight: 0,
      }
    }
  },
  publicNavMobile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('smLandscape')]: {
      display: 'none'
    }

  }
}))

const Header = () => {
  const classes = useStyles()
  // const [isDesktop, setIsDesktop] = useState(useMediaQuery(theme => theme.breakpoints.up('smLandscape')))

  return (
    <Container component="header">
      <Typography className={classes.root} component="div">
        <Box className={classes.appToolbarContainer}>
          <figure className={classes.toolbarLogo}>
            <Link component={RouterLink} to='/'>
              <img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} alt='NCI PPE logo' title='NCI Patient and Provider Engagement Portal' />
            </Link>
          </figure>
          {/* {!isDesktop &&  */}
          <nav className={classes.publicNavDesktop}>
            <Link component={RouterLink} to='/expect' className={classes.headerLink}>What to expect</Link>
            <Link component={RouterLink} to='/privacy' className={classes.headerLink}>Learn More</Link>
          </nav>
          {/* } */}
          <Link component={RouterLink} to='/dashboard/mock-users' className={classes.mockUsers}>
            <Button variant="outlined" color="primary">Mock User</Button>
          </Link>
          <LoginButton />
        </Box>
        {/* {isDesktop &&  */}
        <nav className={classes.publicNavMobile}>
          <Link component={RouterLink} to='/expect' className={classes.headerLink}>What to expect</Link>
          <Link component={RouterLink} to='/privacy' className={classes.headerLink}>Learn More</Link>
        </nav>
        {/* } */}
      </Typography>
    </Container>
  )
}

export default Header