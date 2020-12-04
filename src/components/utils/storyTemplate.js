import React from 'react'
import Component from './Component'

export default {
  title: 'UI/Component',
  component: Component,
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: 'random 4 digit number'
        }
      }
    },
    expanded: {
      table: {
        defaultValue: {
          summary: false
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

const Template = (args) => <Component {...args} />

export const DemoComponent = Template.bind({})
DemoComponent.storyName = "Demo Component"
DemoComponent.args = {
  index: 'example',
  title: 'Would you like to know more?',
  desc: `Here is some <a href="https://hipsum.co/?paras=2&type=hipster-centric&start-with-lorem=1" rel='noopener noreferrer' target="_blank">Hipster Ipsum</a><p>I'm baby thundercats portland put a bird on it, flannel actually unicorn next level fixie yuccie. Jianbing roof party fam pinterest pitchfork jean shorts. Hashtag bushwick sriracha stumptown pork belly waistcoat food truck mlkshk messenger bag tilde. Vape williamsburg pinterest typewriter iPhone, blog 3 wolf moon photo booth lyft sartorial everyday carry.</p>`,
}