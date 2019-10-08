import React, { createContext, useReducer } from 'react'

export const LoginContext = createContext()

const userInitialState = {
  auth: false,
  roleName: 'public',
  env: window.location.hostname === 'localhost' || window.location.hostname === 'ncippe.herokuapp.com' ? 'local' : 'prod'
}


const hasUnviewedReports = (reports, uuid) => {
  //TODO: only for Participants
  if(reports){
    return reports.some(report => {
      if (!report.viewedBy) {
        return true
      } else {
        return !report.viewedBy.includes(uuid)
      }
    })          
  } else {
    return null
  }
}

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
      "notificationList": [
        ...state.notificationList.map(notification => {
          return ({
            ...notification,
            viewedByUser: 1
          })
        })
      ],
    })
    case 'reportViewedByOther': {
      return ({
        ...state,
        patients: action.patients
      })
    }
    case 'reportViewedByPatient': {
      return ({
        ...state,
        reports: [...action.reports],
        newReport: hasUnviewedReports(action.reports, action.uuid)
      })
    }
    case 'reset': return ({
      ...userInitialState
    })
    default: throw new Error('Unexpected action')
  }
}

export const LoginProvider = (props) => {
  const userData = useReducer(userReducer, userInitialState)
  return (
    <LoginContext.Provider value={userData}> 
      {props.children}
    </LoginContext.Provider>
  )
}

export const LoginConsumer = LoginContext.Consumer
