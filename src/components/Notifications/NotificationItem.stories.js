import React from 'react'
import NotificationItem from './NotificationItem'

export default {
  title: 'UI/Notifications Item',
  component: NotificationItem,
  argTypes: {
    notification: {
      table: {
        defaultValue: {
          summary: '{}'
        }
      }
    },
    lang: {
      table: {
        defaultValue: {
          summary: 'navigator.language'
        }
      }
    },
  }
}


const Template = (args) => <NotificationItem {...args} />

const NotificationItemDemo = Template.bind({})
NotificationItemDemo.storyName = "Notifications Item"
NotificationItemDemo.args = {
  notification: {
    from: "Madeline Hamill, Dr. of Oncology, at [BSS Name]",
    subject: {
      en: "Welcome to the Cancer Moonshot Biobank program",
      es: "Bienvenido al programa Biobanco Moonshot de Cancer"
    },
    message: {
      en: "Thank you for participating in the Cancer Moonshot Biobank Program!",
      es: "¡Gracias por participar en el Programa de Biobanco de Cancer Moonshot!"
    },
    dateGenerated: 1554964189000,
  },
  lang: 'en'
}

const NotificationItemViewedES = Template.bind({})
NotificationItemViewedES.storyName = "Viewed Item in Spanish"
NotificationItemViewedES.args = {
  notification: {
    from: "Madeline Hamill, Dr. of Oncology, at [BSS Name]",
    subject: {
      en: "Welcome to the Cancer Moonshot Biobank program",
      es: "Bienvenido al programa Biobanco Moonshot de Cancer"
    },
    message: {
      en: "Thank you for participating in the Cancer Moonshot Biobank Program!",
      es: "¡Gracias por participar en el Programa de Biobanco de Cancer Moonshot!"
    },
    dateGenerated: 1554964189000,
    viewedByUser: true
  },
  lang: 'es'
}
NotificationItemViewedES.story = {
  parameters: {
    docs: {
      storyDescription: "Note: The date format locale is set on login based on the user's language preference, not the language setting here."
    }
  }
}

export { NotificationItemDemo, NotificationItemViewedES }