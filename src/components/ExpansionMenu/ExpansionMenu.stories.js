import React from 'react'
import ExpansionMenu from './ExpansionMenu'
import { useTranslation } from 'react-i18next'

export default {
  title: 'UI/Expansion Menu',
  component: ExpansionMenu,
  argTypes: {
    index: {
      table: {
        defaultValue: {
          summary: `panel-{####}`
        }
      }
    },
    menuText: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'stacked'
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
    active: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    className: {
      table: {
        defaultValue: {
          summary: ''
        }
      }
    },
    handleClick: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
  }
}

const Template = (args) => {
  const { t } = useTranslation('storybook')

  return (
    <ExpansionMenu menuText={t('components.ExpansionMenu.menuText')} {...args}>
      <a href="/about">{t('components.ExpansionMenu.links.0')}</a>
      <a href="/about/eligibility">{t('components.ExpansionMenu.links.1')}</a>
      <a href="/about/research">{t('components.ExpansionMenu.links.2')}</a>
    </ExpansionMenu>
  )
}

export const StackedExpansionMenu = Template.bind({})
StackedExpansionMenu.storyName = "Stacked Expansion Menu"
StackedExpansionMenu.args = {
  index: "stacked",
  variant: "stacked",
}

export const FloatingExpansionMenu = Template.bind({})
FloatingExpansionMenu.storyName = "Floating Expansion Menu"
FloatingExpansionMenu.args = {
  index: "floating",
  variant: "floating",
}