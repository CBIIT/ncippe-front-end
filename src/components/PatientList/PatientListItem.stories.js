import React from 'react'
import PatientListItem from './PatientListItem'

export default {
  title: 'Components/Patient List/Patient List Item',
  component: PatientListItem,
  argTypes: {
    patient: {
      control: null
    },
    firstName: {
      description: `The participant's first name`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    lastName: {
      description: `The participant's last name`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    patientId: {
      description: `The participant's email, used by the \`AddParticipantInfoDialog\` component`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    email: {
      description: `The participant's preferred language, used by the \`AddParticipantInfoDialog\` component`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    lang: {
      description: `The participant's id, used as a visual reference and by the \`AddParticipantInfoDialog\` component`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'en'
        }
      }
    },
    dateCreated: {
      description: `The \`timestamp\` date when this participant was added to the portal`,
      control: 'date',
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    hasNewFiles: {
      description: `Flag if this participant has new biomarker reports or new documents. Will display a yellow "new document" chip`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: false
        }
      }
    },
    isActiveBiobankParticipant: {
      description: `Flag if this participant is no longer participating in the program. Will display an orange "not participating" chip`,
      table: {
        category: 'patient',
        defaultValue: {
          summary: true
        }
      }
    },
    portalAccountStatus: {
      description: `Flag if this participant is either new to the system or has terminated their account. The whole card becomes green and displays a green "New Participant" chip if 'ACCT_NEW'.`,
      control: {
        type: 'radio',
        options: [undefined,'ACCT_NEW','ACCT_TERMINATED_AT_PPE']
      },
      table: {
        category: 'patient',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
  }
}


const Template = (args) => <PatientListItem patient={{...args}} />

const PatientListItemDemo = Template.bind({})
PatientListItemDemo.storyName = "Patient List Item"
PatientListItemDemo.args = {
  firstName: "Thurman",
  lastName: "Kautzer",
  patientId: "AhBW4XAy",
  email: "CadetBlue@Keagan.biz",
  lang: 'en',
  dateCreated: 1550129389000,
  hasNewFiles: false,
  isActiveBiobankParticipant: true,
  portalAccountStatus: undefined
}

export { PatientListItemDemo }