import React from 'react'
import DeactivatedQuestions from './DeactivatedQuestions'


// raw JSON data
const userJSON = `{
  "firstName": "John",
  "lastName": "Smith",
  "dateDeactivated": 1560320999000,
  "questionAnswers": [
    {
      "questionOrder": 1,
      "question": "Program can continue to use samples already collected",
      "answer": "Yes"
    },
    {
      "questionOrder": 2,
      "question": "Program can keep collecting relevant data from patient medical record",
      "answer": "Yes"
    },
    {
      "questionOrder": 3,
      "question": "Reason for leaving the Biobank",
      "answer": "Because I don't want to participate anymore."
    }
  ]
}`

const user = JSON.parse(userJSON)

export default {
  title: 'Components/Questions/Deactivated Questions',
  component: DeactivatedQuestions,
  argTypes: {
    link: {
      table: {
        defaultValue: {
          user: 'undefined'
        }
      }
    },
  }
}

const Template = (args) => <DeactivatedQuestions {...args} />

export const DemoDeactivatedQuestions = Template.bind({})
DemoDeactivatedQuestions.storyName = "Deactivated Questions"
DemoDeactivatedQuestions.args = {
  user
}