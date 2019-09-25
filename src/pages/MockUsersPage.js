import React, { useContext, useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import {Box, Button, Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/Login.context'
import { api } from '../data/api'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

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


const MockRoles = (props) => {
  const classes = useStyles()
  const [users, setUsers] = useState()
  const [loginContext, dispatch] = useContext(LoginContext)

  // Fetch mock users on ComponentDidMount
  useEffect(() => {
    //fetch mock users list
    api[loginContext.env].fetchMockUsers().then(res => {
      setUsers(res)
    })
  }, [])

  const mockLogin = user => event => {
    // get token
    const {userName, firstName, lastName, roleName, userGUID} = user;
    api[loginContext.env].fetchToken({userName, firstName, lastName, roleName})
      .then(resp => {
        // token fetch was successful, update context with user information
        dispatch({
          type: 'update',
          userData: {
            ...resp,
            auth: true,
            userName,
            userGUID
          }
        })

        // redirect to dashboard
        if(roleName === 'ROLE_PPE_MOCHA_ADMIN') {
          navigate('/dashboard-mocha')
        } else {
          navigate('/dashboard')
        }
      })
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
                <Typography variant="h2"><Button variant="contained" className={classes.largeButton} onClick={() => navigate('/dashboard')}>Return to Dashboard as {firstName} {lastName} ({roleName})</Button></Typography>
                <Typography variant="h2"><Button variant="contained" className={classes.largeButton} color="primary" onClick={() => {dispatch({type:'reset'})}}>Clear Role as {firstName} {lastName} ({roleName})</Button></Typography>
              </>
            ) : (
              <>
              {users && users.map((user,i) => <Typography variant="h2"><Button key={i} variant='contained' className={classes.largeButton} onClick={mockLogin(user)}>{user.firstName} {user.lastName} ({user.roleName})</Button></Typography>)}
              {!users && <h3>Error: Unable to retrieve mock users</h3>}
              </>
            )
          }}
        </LoginConsumer>
      </Container>
    </Box>
  )
}

export default MockRoles