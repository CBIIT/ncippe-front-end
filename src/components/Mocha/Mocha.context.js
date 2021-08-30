import React, { createContext, useReducer } from 'react'

const initialState = {
  reportFile: null,
  patientId: '',
  firstName: '',
  lastName: '',
  error: false,
  errorTitle: '',
  errorMessage: '',
  uploadError: false,
  noFound: false,
  serverError: null,
  navigate: null
}

export const MochaContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': return ({
      ...state,
      ...action.data
    })
    case 'navigate': return({
      ...state,
      navigate: action.data
    })
    case 'reset': return ({
      ...initialState,
      navigate: 'reset'
    })
    case 'error': return ({
      ...state,
      serverError: action.data
    })
    default: throw new Error('Unexpected action')
  }
}

export const MochaProvider = (props) => {
  const data = useReducer(userReducer, initialState)
  return (
    <MochaContext.Provider value={data}> 
      {props.children}
    </MochaContext.Provider>
  )
}

export const MochaConsumer = MochaContext.Consumer
