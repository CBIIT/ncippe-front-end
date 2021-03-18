import React from 'react'
import PatientList from './PatientList'
import { LoginContext } from '../login/Login.context'

export default {
  title: 'Components/Patient List/Patient Listing',
  component: PatientList,
  argTypes: {
    patients: {
      table: {
        defaultValue: {
          summary: '[]'
        }
      }
    },
    patientsUpdated: {
      control: 'date',
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      }
    }
  }
}

const patientListData = [
  {
    firstName: "Alfred",
    lastName: "Tromp",
    patientId: "SILxki4k",
    email: "SkyBlue@Chauncey.tv",
    phoneNumber: "559-428-5906",
    allowEmailNotification: true,
    hasNewReports: true,
    userType: "PPE_PARTICIPANT",
    roleName: "ROLE_PPE_PARTICIPANT",
    dateCreated: 1567606345000
  },
  {
    firstName: "Thurman",
    lastName: "Kautzer",
    patientId: "AhBW4XAy",
    email: "CadetBlue@Keagan.biz",
    phoneNumber: "018-374-1064",
    allowEmailNotification: false,
    userType: "PPE_PARTICIPANT",
    roleName: "ROLE_PPE_PARTICIPANT",
    dateCreated: 1550129389000
  },
  {
    firstName: "Gonzalo",
    lastName: "Yost",
    patientId: "MmF2H0C8",
    email: "RoyalBlue@Wiza.org",
    phoneNumber: "905-341-7482",
    allowEmailNotification: true,
    userType: "PPE_PARTICIPANT",
    roleName: "ROLE_PPE_PARTICIPANT",
    dateCreated: 1554791389000
  },
]



const Template = (args) => {

  return (
    <LoginContext.Provider value={[{patients: args.patients}]}>
      <PatientList {...args} />
    </LoginContext.Provider>
  )

}

const PatientListDemo = Template.bind({})
PatientListDemo.storyName = "Patient Listing"
PatientListDemo.args = {
  patients: patientListData
}

export { PatientListDemo }