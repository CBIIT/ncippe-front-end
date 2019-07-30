import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import { api } from '../data/api'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
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
  const loginContext = useContext(LoginContext)

  // Fetch mock users on ComponentDidMount
  useEffect(() => {
    //fetch mock users list
    api[loginContext.env].fetchMockUsers().then(res => {
      setUsers(res)
    })
  }, [])

  const goToDashboard = () => {
    props.history.push('/dashboard')
  }

  const mockLogin = user => event => {
    // get token
    const {userName, firstName, lastName, roleName} = user;
    api[loginContext.env].fetchToken({userName, firstName, lastName, roleName})
      .then(res => {
        // token fetch was successful, update context with user information
        loginContext.update({
          ...res,
          auth: true,
          ...user
        })

        // redirect to dashboard
        goToDashboard()
      })
  }

  return (
    <div className={classes.root}>
      <LoginConsumer>
        {({auth, role, clearRole, firstName, lastName}) => {
          return auth ? (
            <>
              <Button variant="contained" className={classes.largeButton} onClick={goToDashboard}>Return to Dashboard as {firstName} {lastName} ({role})</Button>
              <Button variant="contained" className={classes.largeButton} color="primary" onClick={clearRole}>Clear Role as {firstName} {lastName} ({role})</Button>
            </>
          ) : (
            <>
            {users && users.map(user => <Button key={user.userGUID} variant='contained' className={classes.largeButton} onClick={mockLogin(user)} data-role={user.role}>{user.firstName} {user.lastName} ({user.roleName})</Button>)}
            {!users && <h3>Error: Unable to retrieve mock users</h3>}
            </>
          )
        }}
      </LoginConsumer>
    </div>
  )
}

export default withRouter(MockRoles)
