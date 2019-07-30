import React, { createContext, useState } from 'react'

export const LoginContext = createContext()

const userDataDefaults = {
  auth: false,
  role: 'public',
  firstName: '',
  lastName: '',
  userGUID: null,
  id: null
}
// TODO: add useReducer
export const LoginProvider = (props) => {
  const [userData,setUserData] = useState({
    ...userDataDefaults
  })
  const handleClick = (event) => {
    if(userData.auth){
      clearRole()
    } else {
      alert("Login screens not available at this time")
      console.log("future login screen")
    }
  }
  const assignRole = (data) => {
    setUserData(
      {
        auth: true,
        ...data
      }
    )
  }

  const clearRole = () => {
    setUserData({
      ...userDataDefaults
    })
  }

  return (
    <LoginContext.Provider 
      value={{
        ...userData,
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
