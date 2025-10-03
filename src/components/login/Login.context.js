import React, { createContext, useReducer } from 'react'
import authService from './authService'
// import { hasUnviewedFiles } from '../../data/utils'

const userInitialState = {
  auth: false,
  roleName: 'public',
  uuid: '',
  notifications: [],
  newNotificationCount: 0,
  reports: [],
  newReportCount: 0,
  hasNewReports: false,
  otherDocuments: [],
  newDocumentCount: 0,
  hasNewDocuments: false,
  patients: [],
  patientsUpdated: null,
}
export const LoginContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': return ({
      ...state,
      ...action.userData
    })
    case 'clearNewNotifications': return ({
      ...state,
      newNotificationCount: 0
    })
    case 'notificationsMarkAsRead': return({
      ...state,
      "notifications": [
        ...state.notifications.map(notification => {
          return ({
            ...notification,
            viewedByUser: 1
          })
        })
      ],
      newNotificationCount: 0
    })

    case 'accountActivated':
      return ({
        ...state,
        patients: action.patients,
        patientsUpdated: Date.now()
      })
    case 'addPatientData':
    case 'reportViewedByOther':
    case 'documentViewedByOther': {
      return ({
        ...state,
        patients: action.patients,
        patientsUpdated: Date.now()
      })
    }
    case 'reportViewedByPatient': {
      return ({
        ...state,
        reports: [...action.files],
        newReportCount: action.newFileCount,
        hasNewReports: action.hasNewFiles
      })
    }
    case 'documentViewedByPatient': {
      return ({
        ...state,
        otherDocuments: [...action.files],
        newDocumentCount: action.newFileCount,
        hasNewDocuments: action.hasNewFiles
      })
    }
    case 'reset': return ({
      ...userInitialState
    })
    default: 
    console.error('Login - Unexpected action type:', action.type, action);
    throw new Error('Unexpected action')
  }
}

export const LoginProvider = (props) => {
  const storedUser = authService.getStoredUser();
  const userData = useReducer(userReducer, 
    { ...userInitialState, ...(storedUser || {}),
   });
  return (
    <LoginContext.Provider value={userData}> 
      {props.children}
    </LoginContext.Provider>
  )
}

export const LoginConsumer = LoginContext.Consumer
