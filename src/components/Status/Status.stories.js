import React from 'react'
import Status from './Status'

export default {
  title: 'Components/Status',
  component: Status,
  argTypes: {
    state: {
      table: {
        defaultValue: {
          summary: 'info'
        }
      },
    },
    title: {},
    message: {},
    fullWidth: {
      table: {
        defaultValue: {
          summary: false
        }
      },
    },
  }
}

const Template = (args) => <Status {...args} />

const StatusDemo = Template.bind({})
StatusDemo.storyName = "Status Demo"
StatusDemo.args = {
  title: 'Did you know?',
  message: 'You might be made of spam.',
}

export { StatusDemo }