import React from 'react'
import NoItems from './NoItems'

export default {
  title: 'Components/No Items',
  component: NoItems,
}

const Template = (args) => <NoItems {...args} />

const NoItemsDemo = Template.bind({})
NoItemsDemo.storyName = "No Items"
NoItemsDemo.args = {
  message: "You currently have no reports waiting to be reviewed."
}

export { NoItemsDemo }