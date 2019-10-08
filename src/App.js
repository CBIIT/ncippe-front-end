import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import Routes from './routers/routes'
import { AuthProvider } from './components/login/AuthContext'
import { LoginProvider } from './components/login/Login.context'
import { theme } from './theme/theme'

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      ...theme.typography.body1
    },
  },
}))

const App = () => {
  //eslint-disable-next-line
  const classes = useStyles()
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
