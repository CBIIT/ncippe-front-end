import React, { createContext, useReducer } from 'react'

const initialState = {
  patientId: null,
  firstName: '',
  lastName: '',
  email: '',
  lang: null,
  file: null,
  updateUser_error: false,
  upload_error: false,
  activate_error: false,
  navigate: null
}

export const AddParticipantContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'error':
    case 'update': return ({
      ...state,
      ...action.data
    })
    case 'navigate': return({
      ...state,
      navigate: action.data
    })
    case 'reset': return ({
      ...initialState
    })
    default: throw new Error('Unexpected action')
  }
}

export const AddParticipantProvider = (props) => {
  const data = useReducer(userReducer, initialState)
  return (
    <AddParticipantContext.Provider value={data}> 
      {props.children}
    </AddParticipantContext.Provider>
  )
}

export const AddParticipantConsumer = AddParticipantContext.Consumer
