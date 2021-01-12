import React from 'react'
import LangOption from './LangOption'

export default {
  title: 'UI/Inputs/Language Option',
  component: LangOption,
  argTypes: {
    id: {
      table: {
        defaultValue: {
          summary: "language-input"
        }
      }
    },
    label: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    helperText: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    value: {
      table: {
        defaultValue: {
          summary: 'undefined'
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

const Template = (args) => <LangOption {...args} />

const LangOptionDemo = Template.bind({})
LangOptionDemo.storyName = "Language Option"
LangOptionDemo.args = {
  label: 'Preferred language',
  helperText: 'Please select one',
  value: 'en',
  editMode: true,
}

export { LangOptionDemo }