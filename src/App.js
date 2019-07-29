import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container, CssBaseline } from '@material-ui/core'

import Routes from './routers/routes'
import LoginContext from './context/login'
import Header from './components/region/Header/Header';
import Footer from './components/region/Footer/Footer';
import { LoginProvider } from './components/login/SharedLogin/Login.context'

const useStyles = makeStyles(theme => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  main: {
    flex: '1 0 auto',
    margin: '0',
  },
}))

const defaultLoginContext = {
  auth: false,
  role: 'public',
  token: '',
  toggleAuth: function() {
    this.auth = !this.auth
  },
}

function App( props ) {
  const classes = useStyles()
  return (
    <LoginProvider>
      <BrowserRouter>
        <CssBaseline />
        <div className={classes.App}>
          <Container>
            <Header />
          </Container>
          <main className={classes.main}>
            <Routes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App
