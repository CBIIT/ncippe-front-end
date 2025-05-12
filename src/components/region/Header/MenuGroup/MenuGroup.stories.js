import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import MenuGroup from './MenuGroup'

export default {
  title: 'Components/Menu Group',
  component: MenuGroup,
  // decorators:  [(Story) => {
  //   const source = createMemorySource('/')
  //   const history = createHistory(source)
  //   return <LocationProvider history={history}><Story /></LocationProvider>
  // }],
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: 'random 4 digit number'
        }
      }
    },
    menuText: {
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
  
  return (
    <MemoryRouter initialEntries={['/']}>
      <MenuGroup {...args}>
        <a href="/about">About</a>
        <a href="/about/eligibility">Eligibility</a>
      </MenuGroup>
    </MemoryRouter>
  )
}

const Menu = Template.bind({})
Menu.storyName = "Menu Group"
Menu.args = {
  menuText: "Menu Group Button",
  active: false
}

export { Menu }