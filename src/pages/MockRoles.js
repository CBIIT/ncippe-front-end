import React, { useContext, useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import { api } from '../data/api'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4vw'

  },
  largeButton: {
    fontSize: '2vw',
    width: '70vw',
    marginBottom: '4vw',
    textTransform: "none"
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
        navigate('/dashboard') 
      })
  }

  return (
    <div className={classes.root}>
      <LoginConsumer>
        {([state, dispatch]) => {
          const {auth, roleName, firstName, lastName} = state
          return auth ? (
            <>
              <Button variant="contained" className={classes.largeButton} onClick={() => navigate('/dashboard')}>Return to Dashboard as {firstName} {lastName} ({roleName})</Button>
              <Button variant="contained" className={classes.largeButton} color="primary" onClick={() => {dispatch({type:'reset'})}}>Clear Role as {firstName} {lastName} ({roleName})</Button>
            </>
          ) : (
            <>
            {users && users.map((user,i) => <Button key={i} variant='contained' className={classes.largeButton} onClick={mockLogin(user)}>{user.firstName} {user.lastName} ({user.roleName})</Button>)}
            {!users && <h3>Error: Unable to retrieve mock users</h3>}
            </>
          )
        }}
      </LoginConsumer>
    </div>
  )
}

export default MockRoles