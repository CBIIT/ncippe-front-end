import React, { createContext, useReducer } from 'react'
import data from '../../data'

const initialState = {
  audience_state: [],
  audiences: [],
  subject: '',
  message: null,
  serverError: null,
  navigate: null
}

export const SendMessageContext = createContext()

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
      ...initialState
    })
    case 'error': return ({
      ...state,
      serverError: action.data
    })
    default: throw new Error('Unexpected action')
  }
}

export const SendMessageProvider = (props) => {
  const data = useReducer(userReducer, initialState)
  return (
    <SendMessageContext.Provider value={data}> 
      {props.children}
    </SendMessageContext.Provider>
  )
}

export const SendMessageConsumer = SendMessageContext.Consumer
