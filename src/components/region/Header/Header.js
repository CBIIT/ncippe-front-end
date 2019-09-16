import React, { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  Container,
  Link,
  Typography, 
} from '@material-ui/core';
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
  }
}))

const Header = () => {
  const classes = useStyles()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 800)
    })
  },[isMobile])
  return (
    <Container>
      <Typography className={classes.root} component="header">
        <Box className={classes.appToolbarContainer}>
          <figure className={classes.toolbarLogo}>
            <Link component={RouterLink} to='/'>
              <img src={`/${process.env.PUBLIC_URL}assets/images/nci-ppe-logo.svg`} alt='NCI PPE logo' title='NCI Patient and Provider Engagement Portal' />
            </Link>
          </figure>
          {!isMobile && 
          <nav className={classes.publicNavDesktop}>
            <Link component={RouterLink} to='/expect' className={classes.headerLink}>What to expect</Link>
          </nav>
          }
          <Link component={RouterLink} to='/dashboard/mock-users' className={classes.mockUsers}>
            <Button variant="outlined" color="primary">Mock User</Button>
          </Link>
          <LoginButton />
        </Box>
        {isMobile && <nav className={classes.publicNavMobile}>
          <Link component={RouterLink} to='/expect' className={classes.headerLink}>What to expect</Link>
        </nav>
        }
      </Typography>
    </Container>
  )
}

export default Header