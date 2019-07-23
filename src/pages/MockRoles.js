import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import LoginContext from '../context/login'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    alignItems: 'center',
    marginTop: '4vw'

  },
  largeButton: {
    fontSize: '6vw',
    width: '70vw',
    marginBottom: '4vw'
  }
}))


const MockRoles = (props) => {
  const classes = useStyles()
  const login = useContext(LoginContext)
  const [isAuth, setIsAuth] = useState(login.auth)
  const [user, setUser] = useState(login.role)

  const assignRole = (event) => {
    const role = event.currentTarget.dataset.role;
    fetch(`/api/users?id=${role}`)
    .then(resp => resp.json())
    .then(data => {
      // console.log("Dashboard fetch:", data)
      setUser(data[0])
      login.toggleAuth()
      login.role = role
      props.history.push('/dashboard')
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }
  const clearRole = (event) => {
    login.toggleAuth()
    login.role = 'public'
    setIsAuth(login.auth)
  }
  return (
    <div className={classes.root}>
      {!isAuth && (
        <>
        <Button variant='contained' className={classes.largeButton} onClick={assignRole} data-role="patient">Patient</Button>
        <Button variant='contained' className={classes.largeButton} onClick={assignRole} data-role="provider">Provider</Button>
        <Button variant='contained' className={classes.largeButton} onClick={assignRole} data-role="crc">CRC</Button>
        <Button variant='contained' className={classes.largeButton} onClick={assignRole} data-role="bssc">BSSC</Button>
        </>
      )}

      {isAuth && (
        <>
          <Button variant="contained" className={classes.largeButton} onClick={()=>props.history.push('/dashboard')}>Return to Dashboard as {login.role}</Button>
          <Button variant="contained" className={classes.largeButton} color="primary" onClick={clearRole}>Clear Role as {login.role}</Button>
        </>
      )}
    </div>
  )
}

export default withRouter(MockRoles)
