import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer } from '../components/login/SharedLogin/Login.context'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    alignItems: 'center',
    marginTop: '4vw'

  },
  largeButton: {
    fontSize: '3vw',
    width: '70vw',
    marginBottom: '4vw',
    textTransform: "none"
  }
}))


const MockRoles = (props) => {
  const classes = useStyles()
  const [users, setUsers] = useState()

  // Fetch mock users on ComponentDidMount
  useEffect(() => {
    //fetch mock users list
    async function fetchMockUsers(){
      const mockUsers = await fetch(`/api/mockUsers`)
        .then(resp => resp.json())
        .then(data => data)
        .catch(error => {
          console.error('Error:', error)
        })

      const url = `/api/users?userGUID=${mockUsers.join('&userGUID=')}`

      // fetch data for each mock user
      await fetch(url)
        .then(resp => resp.json())
        .then(data => {
          setUsers(data)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
    fetchMockUsers()
  }, [])

  return (
    <div className={classes.root}>
      <LoginConsumer>
        {({auth, role, assignRole, clearRole, firstName, lastName}) => {
          return auth ? (
            <>
              <Button variant="contained" className={classes.largeButton} onClick={()=>props.history.push('/dashboard')}>Return to Dashboard as {firstName} {lastName} ({role})</Button>
              <Button variant="contained" className={classes.largeButton} color="primary" onClick={clearRole}>Clear Role as {firstName} {lastName} ({role})</Button>
            </>
          ) : (
            <>
            {users && users.map(user => <Button key={user.userGUID} variant='contained' className={classes.largeButton} onClick={() => {assignRole(user,'/dashboard');props.history.push('/dashboard')}} data-role={user.role}>{user.firstName} {user.lastName} ({user.roleName})</Button>)}
            {!users && <h3>Error: Unable to retrieve mock users</h3>}
            </>

          )
        }}
      </LoginConsumer>
    </div>
  )
}

export default withRouter(MockRoles)
