import React from 'react'
import { createMemorySource, createHistory, LocationProvider } from '@reach/router'
import FAQs from './FAQ_Group'

export default {
  title: "UI/FAQ/Multiple FAQ",
  component: FAQs,
  argTypes: {
    title: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    className: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    faqs: {
      table: {
        defaultValue: {
          summary: 'undefined'
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

const Template = (args) => {
  const source = createMemorySource('/')
  const history = createHistory(source)

  return (
    <LocationProvider history={history}>
        <FAQs {...args} />
    </LocationProvider>
  )
}

export const MultipleFAQ = Template.bind({})
MultipleFAQ.args = {
  title: "A Group of FAQ's",
  faqs: {
    "0": {
      "answer": "A biomarker is a biological molecule found in blood, tissue, or other bodily fluids. It can be used to indicate a disease, or as a way to see if the body is responding to treatment.",
      "question": "What is a biomarker, exactly?"
    },
    "1": {
      "answer": "A biomarker test only analyzes the genes in your cancer. It’s different from genetic testing like commercially available ancestry tests or cancer risk testing which look at the genes you inherited from your parents.",
      "question": "Is a biomarker test the same as a genetic test?"
    }
  },
}