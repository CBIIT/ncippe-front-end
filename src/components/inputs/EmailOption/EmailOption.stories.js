import React from 'react'
import EmailOption from './EmailOption'

export default {
  title: 'Components/Inputs/Email Option',
  component: EmailOption,
  argTypes: {
    value: {
      table: {
        defaultValue: {
          summary: true
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
  }
}

const Template = (args) => <EmailOption {...args} />

const EmailOptionDemo = Template.bind({})
EmailOptionDemo.args = {
  value: true,
  editMode: true
}
EmailOptionDemo.storyName = "Email Option"

export { EmailOptionDemo }