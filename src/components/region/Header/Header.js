import React from 'react';
import { 
  Box,
  Container,
  Link,
  Typography, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from "@reach/router"

import LoginButton from '../../login/LoginButton'
import MenuGroup from './MenuGroup';

const useStyles = makeStyles(theme => ({
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
      fontWeight: 600
    }
  },
  publicNavDesktop: {
    display: 'none',
    [theme.breakpoints.up('smLandscape')]: {
      display: 'flex',
      position: 'relative',
      margin: theme.spacing(0,2),
      minHeight: 82,
      '& button': {
        fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
        fontWeight: 'normal'
      },
      '& button:hover': {
        backgroundColor: 'transparent',
      },
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
            <MenuGroup title="About">
              <a href="/about">About the Biobank</a>
              <a href="/eligibility">Eligibility and locations</a>
              <a href="/research">Biobanking drives research</a>
            </MenuGroup>
            <MenuGroup title="What to expect">
              <a href="/about">Give your consent</a>
              <a href="/locations">Eligibility and locations</a>
              <a href="/research">Biobanking drives research</a>
            </MenuGroup>
            <MenuGroup title="Your participation">
              <a href="/about">Give your consent</a>
              <a href="/locations">Eligibility and locations</a>
              <a href="/research">Biobanking drives research</a>
            </MenuGroup>
          </nav>
          {/* } */}
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