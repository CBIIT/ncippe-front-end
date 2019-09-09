import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core'

import Routes from './routers/routes'
import { LoginProvider } from './components/login/SharedLogin/Login.context'
import { theme } from './theme/theme'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <CssBaseline />
        <Routes />
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App
