import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Routes from './routers/routes'
import LoginContext from './context/login'

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
  toggleAuth: function() {
    this.auth = !this.auth
  },
}

function App( props ) {
  const classes = useStyles()
  return (
    <LoginContext.Provider value={defaultLoginContext}>
      <BrowserRouter>
        <div className={classes.App}>
          <div />
          <main className={classes.main}>
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App
