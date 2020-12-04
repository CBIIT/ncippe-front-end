import React from 'react'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import MenuGroup from './MenuGroup'

export default {
  title: 'UI/Menu Group',
  component: MenuGroup,
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: 'random 4 digit number'
        }
      }
    },
    title: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    active: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    children: {
      table: {
        defaultValue: {
          summary: 'ReactNode'
        }
      },
      control: {
        type: null
      }
    }
  }
}

const Template = (args) => {
  const source = createMemorySource('/')
  const history = createHistory(source)

  return (
    <LocationProvider history={history}>
      <MenuGroup {...args}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </MenuGroup>
    </LocationProvider>
  )
}

export const Menu = Template.bind({})
Menu.storyName = "Menu Group"
Menu.args = {
  title: "Menu Group Button",
  active: false
}