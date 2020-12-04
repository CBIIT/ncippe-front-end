import React from 'react'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import LoginButton from './LoginButton'
import { LoginContext } from '../Login.context'

export default {
  title: 'UI/Login Button',
  component: LoginButton,
  argTypes: {
    authenticated: {
      type: 'boolean',
      description: 'state once a user has been authenticated',
      table: {
        type: {
          summary: 'bool'
        },
        defaultValue: {
          summary: false
        }
      }
    },
    isAccount: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    }
  }
}

const Template = (args) => {
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

export const Button = Template.bind({})
Button.storyName = "Login Button"
Button.args = {
  authenticated: false,
  isAccount: false
}
