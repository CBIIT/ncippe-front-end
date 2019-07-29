import React from 'react'

export const LoginContext = React.createContext()

export const LoginProvider = (props) => {
  const [auth, setAuth] = React.useState(false)
  const [role, setRole] = React.useState('public')
  const [firstName,setFirstName] = React.useState('')
  const [lastName,setLastName] = React.useState('')
  const [userId,setUserId] = React.useState()
  const handleClick = (event) => {
    if(auth){
      clearRole()
    } else {
      alert("Login screens not available at this time")
      console.log("future login screen")
    }
  }
  const assignRole = (userData) => {
    // console.log("assignRole", userData)
    setAuth(true);
    setRole(userData.roleName)
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
    setUserId(userData.userGUID)
  }

  const clearRole = () => {
    setAuth(false)
    setRole('public')
    setFirstName('')
    setLastName('')
    setUserId(null)
  }

  return (
    <LoginContext.Provider 
      value={{
        auth,
        firstName,
        lastName,
        userId,
        role,
        handleClick,
        assignRole: (userData) => assignRole(userData),
        clearRole
      }}
    > 
      {props.children}
    </LoginContext.Provider>
  )

}

export const LoginConsumer = LoginContext.Consumer
