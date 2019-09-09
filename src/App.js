import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles'
import { Container, CssBaseline } from '@material-ui/core'

import Routes from './routers/routes'
import Header from './components/region/Header/Header';
import Footer from './components/region/Footer/Footer';
import { LoginProvider } from './components/login/SharedLogin/Login.context'
import { theme } from './theme/theme'

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

const App = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
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
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App
