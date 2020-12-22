import React from 'react'
import NotificationItem from './NotificationItem'

export default {
  title: 'UI/Notifications/Notifications Item',
  component: NotificationItem,
  argTypes: {
    notification: {
      control: null,
      table: {
        defaultValue: {
          summary: '{}'
        }
      }
    },
    subject_en: {
      name: 'en',
      description: 'The subject text in English as text, html or markdown',
      table: {
        category: 'notification',
        subcategory: 'subject',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    subject_es: {
      name: 'es',
      description: 'The subject text in Spanish as text, html or markdown',
      table: {
        category: 'notification',
        subcategory: 'subject',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    message_en: {
      name: 'en',
      description: 'Multi-line message text in English as text, html or markdown',
      table: {
        category: 'notification',
        subcategory: 'message',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    message_es: {
      name: 'es',
      description: 'Multi-line message text in Spanish as text, html or markdown',
      table: {
        category: 'notification',
        subcategory: 'message',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    dateGenerated: {
      description: `The date this messages was sent as a raw \`datestamp\` number. The date format locale is set on login based on the user's language preference`,
      table: {
        category: 'notification',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    viewedByUser: {
      description: `Flag if this message has been viewed by the user. Possible values are \`0\` or \`1\` for some reason and evaluated in code as boolean. If \`false\` then this message will display a "new" badge`,
      table: {
        category: 'notification',
        defaultValue: {
          summary: 'undefined'
        }
      },
      control: {
        type: 'boolean'
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


const Template = (args) => <NotificationItem lang={args.lang} notification={{
  subject: {
    en: args.subject_en,
    es: args.subject_es,
  },
  message: {
    en: args.message_en,
    es: args.message_es,
  },
  dateGenerated: args.dateGenerated,
  viewedByUser: args.viewedByUser
}} />

const NotificationItemDemo = Template.bind({})
NotificationItemDemo.storyName = "Notifications Item"
NotificationItemDemo.args = {
  subject_en: "Welcome to the Cancer Moonshot Biobank program",
  subject_es: "Bienvenido al programa Biobanco Moonshot de Cancer",
  message_en: "Thank you for participating in the Cancer Moonshot Biobank Program!",
  message_es: "¡Gracias por participar en el Programa de Biobanco de Cancer Moonshot!",
  dateGenerated: 1554964189000,
  viewedByUser: false,
  lang: 'en',
}

const NotificationItemViewedES = Template.bind({})
NotificationItemViewedES.storyName = "Viewed Item in Spanish"
NotificationItemViewedES.args = {
  subject_en: "Welcome to the Cancer Moonshot Biobank program",
  subject_es: "Bienvenido al programa Biobanco Moonshot de Cancer",
  message_en: "Thank you for participating in the Cancer Moonshot Biobank Program!",
  message_es: "¡Gracias por participar en el Programa de Biobanco de Cancer Moonshot!",
  dateGenerated: 1554964189000,
  viewedByUser: true,
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