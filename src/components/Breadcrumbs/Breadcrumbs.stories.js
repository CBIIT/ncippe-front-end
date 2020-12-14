import React from 'react'
import Breadcrumbs from './Breadcrumbs'

export default {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    link: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
  }
}

const Template = (args) => <Breadcrumbs {...args} />

export const DemoBreadcrumbs = Template.bind({})
DemoBreadcrumbs.storyName = "Breadcrumbs"