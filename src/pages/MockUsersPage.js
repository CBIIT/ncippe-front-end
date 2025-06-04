import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Box, Button, Container, Typography} from '@mui/material'
import { LoginConsumer, LoginContext } from '../components/login/Login.context'
// import { api } from '../data/api'
import getAPI from '../data'
import Breadcrumbs from '../components/Breadcrumbs'
import Status from '../components/Status'
import { randomString } from '../utils/utils'

const largeButtonSx = {
  width: '100%',
  mb: 4,
  textTransform: 'none',
  '@media (min-width:600px)': {
    width: '70%',
  },
  '@media (min-width:1200px)': {
    width: '55%',
    fontSize: '80%',
  },
}


const MockRoles = () => {
 
  const navigate = useNavigate()
  const [users, setUsers] = useState()
  const [error, setError] = useState(false)
  const [ , dispatch] = useContext(LoginContext) // don't need loginContext at index 0, just destructuring dispatch


  // Fetch mock users on ComponentDidMount
  useEffect(() => {
    getAPI.then(api => {
      api.fetchMockUsers().then(resp => {
        Array.isArray(resp) ? setUsers(resp) : setError(resp)
      })
    })
  }, [])

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
      <Container className="mainContainer" sx={{ textAlign: 'center' }} >
        <LoginConsumer>
          {([state, dispatch]) => {
            const {auth, roleName, firstName, lastName} = state
            return auth ? (
              <>
                <Typography variant="h2"><Button variant="contained" sx={{largeButtonSx}} onClick={() => navigate('/account')}>Return to account as {firstName} {lastName} ({roleName})</Button></Typography>
                <Typography variant="h2"><Button variant="contained" sx={{ largeButtonSx }} color="primary" onClick={clearRole}>Clear role as {firstName} {lastName} ({roleName})</Button></Typography>
              </>
            ) : (
              <>
              {users && users.map((user,i) => <Typography key={i} variant="h2">
                  <Button variant='contained' sx={{largeButtonSx}} onClick={mockLogin(user)}>{user.firstName} {user.lastName} ({user.roleName})</Button>
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