import React from 'react'
import PhoneNumber from './PhoneNumber'

export default {
  title: 'Components/Inputs/Phone Number',
  component: PhoneNumber,
  argTypes: {
    value: {
      table: {
        defaultValue: {
          summary: '(   )    -    '
        }
      }
    },
    editMode: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    error: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    onChange: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      },
      control: {
        type: null
      }
    }
  }
}

const Template = (args) => <PhoneNumber {...args} />

const PhoneNumberDemo = Template.bind({})
PhoneNumberDemo.storyName = "Phone Number"
PhoneNumberDemo.args = {
  value: '7038675309',
  editMode: true,
}

export { PhoneNumberDemo }