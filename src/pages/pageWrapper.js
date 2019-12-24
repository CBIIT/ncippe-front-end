import React from 'react';
import { Link as RouterLink } from "@reach/router"
import { 
  Button,
  Container,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/region/Header/Header';
import Footer from '../components/region/Footer/Footer';

const useStyles = makeStyles(theme => ({
  main: {
    flex: '1 0 auto',
    margin: '0',
  },
  mockUsers: {
    position: 'absolute',
    right: 32,
    top: 16,
    opacity: .25,
    transition: 'opacity 300ms, box-shadow 300ms',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
      boxShadow: theme.shadows[2]
    }
  },
}))

const pageWrapper = (Component) => ({children, ...props}) => {
  const classes = useStyles()
  return (
    <div className="siteWrapper"> {/* returning a fragment here does not work in ie11 */}
      <Header />
      <div id="main" className={classes.main} role="main">
        <Container style={{position:"relative"}}>
          <Link component={RouterLink} to='/mock-users' className={classes.mockUsers}>
            <Button variant="outlined" color="primary">Mock User</Button>
          </Link>
        </Container>
        <Component {...props} />
      </div>
      <Footer />
    </div>
  )
}

export default pageWrapper