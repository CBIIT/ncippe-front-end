import React from 'react'
import FAQ from './FAQ'

export default {
  title: 'UI/FAQ/Single FAQ',
  component: FAQ,
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
    title: {
      table: {
        defaultValue: {
          summary: 'undefined',
        }
      },
    },
    desc: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    onClick: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    trackEvent: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    }
  }
}

const Template = (args) => <FAQ {...args} />

export const SingleFAQ = Template.bind({})
SingleFAQ.args = {
  index: 'example',
  title: 'Would you like to know more?',
  desc: `Here is some <a href="https://hipsum.co/?paras=2&type=hipster-centric&start-with-lorem=1" rel='noopener noreferrer' target="_blank">Hipster Ipsum</a><p>I'm baby thundercats portland put a bird on it, flannel actually unicorn next level fixie yuccie. Jianbing roof party fam pinterest pitchfork jean shorts. Hashtag bushwick sriracha stumptown pork belly waistcoat food truck mlkshk messenger bag tilde. Vape williamsburg pinterest typewriter iPhone, blog 3 wolf moon photo booth lyft sartorial everyday carry.</p>`,
}