import React from 'react'
import ExpansionMenu from './ExpansionMenu'

export default {
  title: 'Components/Expansion Menu',
  component: ExpansionMenu,
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: `panel-{####}`
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
    variant: {
      table: {
        defaultValue: {
          summary: 'stacked'
        }
      }
    },
    expanded: {
      table: {
        defaultValue: {
          summary: false
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
    className: {
      table: {
        defaultValue: {
          summary: ''
        }
      }
    },
    handleClick: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
  }
}

const Template = (args) => {

  return (
    <ExpansionMenu menuText="Expansion Menu" {...args}>
      <a href="/about">About</a>
      <a href="/about/eligibility">Eligibility</a>
      <a href="/about/research">Research</a>
    </ExpansionMenu>
  )
}

export const StackedExpansionMenu = Template.bind({})
StackedExpansionMenu.storyName = "Stacked Expansion Menu"
StackedExpansionMenu.args = {
  index: "stacked",
  variant: "stacked",
}

export const FloatingExpansionMenu = Template.bind({})
FloatingExpansionMenu.storyName = "Floating Expansion Menu"
FloatingExpansionMenu.args = {
  index: "floating",
  variant: "floating",
}