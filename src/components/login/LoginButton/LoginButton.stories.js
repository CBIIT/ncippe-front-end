import React from 'react'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import LoginButton from './'
import { LoginContext } from '../Login.context'

export default {
  title: 'UI/Login Button',
  component: LoginButton,
  argTypes: {
    authenticated: {
      type: 'boolean',
      description: 'state once a user has been authenticated',
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    isAccount: {
      type: 'boolean',
      description: 'state when an authenticated user is in the account dashboard',
      table: {
        defaultValue: {
          summary: false
        }
      }
    }
  }
}

export const Button = (args) => {
  const path = args.isAccount ? "/account" : "/"
  const source = createMemorySource(path)
  const history = createHistory(source)

  return (
    <LoginContext.Provider value={[{auth: args.authenticated}]}>
      <LocationProvider history={history}>
        <LoginButton />
      </LocationProvider>
    </LoginContext.Provider>
  )
}