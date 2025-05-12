import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import { LoginContext } from '../Login.context'

export default {
  title: 'Components/Login Button',
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
 
  return (
    <MemoryRouter initialEntries={[path]}>
    <LoginContext.Provider value={[{auth: args.authenticated}]}>
        <LoginButton />
    </LoginContext.Provider>
    </MemoryRouter>
  )
}

export const Button = Template.bind({})
Button.storyName = "Login Button"
Button.args = {
  authenticated: false,
  isAccount: false
}
