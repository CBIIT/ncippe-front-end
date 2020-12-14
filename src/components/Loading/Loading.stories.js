import React from 'react'
import Loading from './Loading'

export default {
  title: 'UI/Loader',
  component: Loading,
}

const Template = (args) => <Loading {...args} />

const Loader = Template.bind({})
Loader.storyName = "Loader"

const LoaderMsg = Template.bind({})
LoaderMsg.storyName = "With Message"
LoaderMsg.args = {
  message: "Please wait while we sequence your DNA"
}

export { Loader, LoaderMsg }