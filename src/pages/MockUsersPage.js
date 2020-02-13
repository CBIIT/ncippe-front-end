import React, { useContext, useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import {Box, Button, Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/Login.context'
// import { api } from '../data/api'
import getAPI from '../data'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Status from '../components/Status/Status'
import { randomString } from '../utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4)

  },
  largeButton: {
    width: '100%',
    marginBottom: theme.spacing(4),
    textTransform: "none",
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '55%',
      fontSize: '80%'
    }
  },
  mainContainer: {
    textAlign: 'center'
  }
}))

const MockRoles = () => {
  const classes = useStyles()
  const [users, setUsers] = useState()
  const [error, setError] = useState(false)
  const [loginContext, dispatch] = useContext(LoginContext)


  // Fetch mock users on ComponentDidMount
  useEffect(() => {
    getAPI.then(api => {
      api.fetchMockUsers().then(resp => {
        Array.isArray(resp) ? setUsers(resp) : setError(resp)
      })
    })
  }, [getAPI])

  const mockLogin = user => event => {
    // get token
    const {email, uuid} = user;
    // token fetch was successful, update context with user information
    const identifier = randomString(32)

    dispatch({
      type: 'update',
      userData: {
        uuid,
        email,
        mockState: identifier
      }
    })

    navigate(`/signin?code=${uuid}&state=${identifier}`,{
      state: {
        mockUserLogin: true,
        state: identifier,
        profile: {
          sub: uuid,
          email,
          jti: randomString(22)
        }
      }
    })
  }

  const clearRole = () => {
    localStorage.clear()
    dispatch({type:'reset'})
  }

  return (
    <Box className="popup">
      <Breadcrumbs pageName="Consent Page" />
      <Container className={`mainContainer ${classes.mainContainer}`}>
        <LoginConsumer>
          {([state, dispatch]) => {
            const {auth, roleName, firstName, lastName} = state
            return auth ? (
              <>
                <Typography variant="h2"><Button variant="contained" className={classes.largeButton} onClick={() => navigate('/account')}>Return to account as {firstName} {lastName} ({roleName})</Button></Typography>
                <Typography variant="h2"><Button variant="contained" className={classes.largeButton} color="primary" onClick={clearRole}>Clear role as {firstName} {lastName} ({roleName})</Button></Typography>
              </>
            ) : (
              <>
              {users && users.map((user,i) => <Typography key={i} variant="h2">
                  <Button variant='contained' className={classes.largeButton} onClick={mockLogin(user)}>{user.firstName} {user.lastName} ({user.roleName})</Button>
                </Typography>)}
              {error && <Status state="error" title={error.name} message={error.message} />}
              </>
            )
          }}
        </LoginConsumer>
      </Container>
    </Box>
  )
}

export default MockRoles