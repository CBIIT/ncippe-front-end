import React from 'react'
import Breadcrumb from './Breadcrumbs'

export default {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
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

const Template = (args) => <Breadcrumb {...args} />

export const DemoBreadcrumb = Template.bind({})
DemoBreadcrumb.storyName = "Breadcrumb"