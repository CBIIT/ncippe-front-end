// StyledMenuItem
// use dummy menu items for DRYness
// MenuGroup - with active and non-active items using LocationProvider
import React from 'react'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import MenuGroup from './'

export default {
  title: 'UI/Menu Group',
  component: MenuGroup,
  argTypes: {
    id: {
      type: 'string',
      description: 'id of this menu',
      table: {
        defaultValue: {
          summary: 'random 4 digit number'
        }
      }
    },
    title: {
      type: 'string',
      description: 'the text for this menu group',
      table: {
        defaultValue: {
          summary: ''
        }
      }
    },
    active: {
      type: 'boolean',
      description: 'is the menu active',
      table: {
        defaultValue: {
          summary: false
        }
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
Menu.args = {
  title: "Menu Group Button",
  active: false
}