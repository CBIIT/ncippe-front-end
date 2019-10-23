import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'

import Routes from './routers/routes'
import { AuthProvider } from './components/login/AuthContext'
import { LoginProvider } from './components/login/Login.context'
import { theme } from './theme/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoginProvider>
          <CssBaseline />
          <Routes />
        </LoginProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
