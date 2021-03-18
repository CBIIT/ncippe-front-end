import React from 'react'
import Notifications from './Notifications'

export default {
  title: 'Components/Notifications/Notifications Listing',
  component: Notifications,
  argTypes: {
    notifications: {
      description: "An array of notifications as structured for the `NotificationItem` component",
      table: {
        defaultValue: {
          summary: '[]'
        }
      }
    },
    lang: {
      table: {
        defaultValue: {
          summary: 'en'
        }
      }
    },
  }

}

const notificationsData = [
  {
    portalNotificationId: 2,
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
  {
    portalNotificationId: 3,
    from: "MOCHA Labs",
    subject: {
      en: "We added a biomarker report to Marco's account",
      es: "Agregamos un &aacute; informe de biomarcadores a la cuenta de Marco"
    },
    message: {
      en: "<p>Dear Marco,</p><p>We added a biomarker report to Marco's account. Log into the PPE Portal to view this report.</p><h3>Why is this important?</h3><p>Your biomarker report may inform your treatment. Each report is available to the patient, their provider, and a family member if they have been added to the patient account.</p><div> </div><h3>What action should I take?</h3><p>For patients and family members: set up a time to talk with your provider about these results.</p><p>For providers: review the report and any supporting NCI materials to determine whether or not you should alter your patient&rsquo;s treatment.</p><div> </div><p>If you have questions, you can reply to this email or call us at (202) 000 &ndash; 0000.</p><p>Thank you for participating in the Cancer Moonshot Biobank Program!</p><div> </div><p>NCI Program Staff</p>",
      es: "<p> Estimado Marco, </p> <p> Agregamos un informe de biomarcadores a la cuenta de Marco. Inicie sesión en el portal PPE para ver este informe. </p> <h3> ¿Por &aacute; qué es importante? </h3> <p>Su informe de biomarcadores puede informar su tratamiento. Cada informe está disponible para el paciente, su proveedor y un miembro de la familia si se han agregado a la cuenta del paciente. </p> <div> </div> <h3> ¿Qué medidas debo tomar? </h3><p>Para pacientes y familiares: establezca un horario para hablar con su proveedor sobre estos resultados. </p> <p> Para proveedores: revise el informe y cualquier material de apoyo del NCI para determinar si debe o no alterar a su paciente&rsquo;s tratamiento. </p> <div> </div> <p> Si tiene preguntas, puede responder a este correo electrónico o llamarnos al (202) 000&ndash;0000. </p> <p> ¡Gracias por participar en el Programa de Biobanco de Cancer Moonshot! </p> <div> </div> <p> Personal del programa del NCI </p>"
    },
    dateGenerated: 1556000989000,
    viewedByUser: false
  },
]


// const Template = (args,global) => <Notifications notifications={args.notifications} lang={global.globals.locale} />
const Template = (args) => <Notifications {...args} />

const NotificationsDemo = Template.bind({})
NotificationsDemo.storyName = "Notifications Listing"
NotificationsDemo.args = {
  notifications: notificationsData,
  lang: 'en'
}

export { NotificationsDemo }