import React from 'react'
import IconCardMedia from './IconCardMedia'

export default {
  title: 'Components/Icon Card Media',
  component: IconCardMedia
}

const Template = (args) => <IconCardMedia {...args} />

export const DemoIconCardMedia = Template.bind({})
DemoIconCardMedia.storyName = "Icon Card Media"
DemoIconCardMedia.args = {
  title: 'Would you like to know more?',
  desc: `Here is some <a href="https://hipsum.co/?paras=2&type=hipster-centric&start-with-lorem=1" rel='noopener noreferrer' target="_blank">Hipster Ipsum</a><p>Try-hard franzen echo park helvetica, poutine kickstarter kale chips hexagon tumeric williamsburg blue bottle. Heirloom raw denim occupy actually, shaman gochujang sriracha scenester.</p><p>Taiyaki brunch shabby chic truffaut godard fingerstache, 8-bit 90's franzen hot chicken celiac. Meditation scenester four dollar toast kale chips, leggings echo park art party synth biodiesel microdosing snackwave lo-fi tacos irony copper mug.</p>`,
  image: `assets/images/mediaCard/standard/researcher-examines-slide.jpg`,
  imageTitle: 'researcher examining a slide',
  link: "/results",
  linkText: "Test Results"
}