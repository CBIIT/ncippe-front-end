import React from 'react'
import Component from './Component'

export default {
  title: 'UI/Component',
  component: Component,
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: 'random 4 digit number'
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
    ['...other']: {
      type: {
        summary: 'mixed'
      },
      description: 'this component also accepts props to be passed along to the <a href="https://material-ui.com/api/container/" rel="noopener noreferrer" target="_blank">MuiContainer</a> that wrapps all the FAQs',
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      },
      control: {
        type: null
      }
    },
  }
}

const Template = (args) => <Component {...args} />

const ComponentDemo = Template.bind({})
ComponentDemo.storyName = "Component"
ComponentDemo.args = {
  index: 'example',
  title: 'Component Title',
  desc: `Here is some descriptive text`,
}

export { ComponentDemo }