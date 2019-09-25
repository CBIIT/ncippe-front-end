import React, { createContext, useReducer } from 'react'

export const LoginContext = createContext()

const userInitialState = {
  auth: false,
  roleName: 'public',
  firstName: '',
  lastName: '',
  userGUID: null,
  id: null,
  env: window.location.hostname === 'localhost' || window.location.hostname === 'ncippe.herokuapp.com' ? 'local' : 'prod'
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': return ({
      ...state,
      ...action.userData
    })
    case 'reset': return ({
      ...userInitialState
    })

    default: throw new Error('Unexpected action');
  }
};

export const LoginProvider = (props) => {
  const userData = useReducer(userReducer, userInitialState)
  return (
    <LoginContext.Provider value={userData}> 
      {props.children}
    </LoginContext.Provider>
  )
}

export const LoginConsumer = LoginContext.Consumer
