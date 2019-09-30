import { createUUID } from '../utils/utils'

async function fetchMockUsersLocal(){
  // get mock user id list
  const mockUsers = await fetch(`/api/mockUsers`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
      return error
    })

  // compose request using mock user list results
  const url = `/api/users?userName=${mockUsers.join('&userName=')}`

  // fetch data for each mock user
  return await fetch(url)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
      return error
    })
}

async function fetchMockUsersProd(){
  // fetch data for each mock user - this will fetch ALL users :(
  return await fetch(`/api/v1/users`)
    .then(resp => resp.json())
    // .then(resp => resp.User)
    .catch(error => {
      console.error(error)
      return error
    })
}

/*=======================================================================*/

async function fetchTokenLocal({uuid, email}){
  console.log("fetchToken data sent to server:", 
    `\nuuid: ${uuid}`, 
    `\nemail: ${email}`,
  )

  // check if the uuid exists in our system
  const userUUID_exists = await fetch(`/api/users?uuid=${uuid}&singular=1`)
    .then(resp => {
      if(resp.ok) {
        return resp.json()
      }
    })
    .catch(error => {
      console.error(error)
      return error
    })
  let userEmail_exists = false

  // if no uuid then check if the user is in our system based on the email provided. email used for login.gov account must match email registered in OPEN
  if (!userUUID_exists) {
    userEmail_exists = await fetch(`/api/users?email=${email}&singular=1`)
      .then(resp => {
        if(resp.ok) {
          return resp.json()
        }
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }

  // use has a valid uuid of email address in our system
  if (userUUID_exists || userEmail_exists) {

    // if no uuid was found then this user is logging in for the first time. Add their uuid from login.gov used to fetch this token
    if(!userUUID_exists) {
      // this is probably a mock user without a login.gov account. Save their UUID locally
      const user = userEmail_exists
      await fetch(`/users/${user.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uuid:createUUID()})
      }).then(()=>{
        console.log("patch successful")
      })
    }

    return await fetch(`/api/token?singular=1`)
      .then(resp => {
        if(resp.ok) {
          return resp.json()
        } else {
          throw new Error(`We were unable to fetch user data at this time. Please try again.`)
        }
      })
      .catch(error => {
        console.error(error)
        return error
      })

  } else {
    return new Error(`Invalid user`)
  }

}

async function fetchTokenProd({uuid, email}){
  // uuid and email from login.gov as querystring
  return await fetch(`/api/v1/login?uuid=${uuid}&email=${email}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
      return error
    })
}

/*=======================================================================*/

async function fetchUserLocal({uuid, userGUID, email, token}){
  console.log("fetchUser data sent to server:", 
    `\nuuid: ${uuid}`,
    `\nuserGUID: ${userGUID}`,
    `\nemail: ${email}`,
    `\ntoken: ${token}`
  )

  // get user data
  // "/users?userName=:userName&singular=1"
  // userName depricated
  // const query = userName ? `/${userName}` : `?uuid=${uuid}&singular=1` 

  let userData = await fetch(`/api/users?uuid=${uuid}&singular=1`)
    .then(resp => {
      if(resp.ok) {
        return resp.json()
      } else {
        throw new Error(`We were unable to fetch user data at this time. Please try again.`)
      }
    })
    .catch(error => {
      console.log("no users found using uuid")
      return error
    })

    if(userData.hasOwnProperty('message')) {
      console.log("fetch using email")
      userData = await fetch(`/api/users?email=${email}&singular=1`)
      .then(resp => {
        if(resp.ok) {
          return resp.json()
        } else {
          throw new Error(`We were unable to fetch user data at this time. Please try again.`)
        }
      })
      .catch(error => {
        console.log("no users found using userGUID")
        return error
      })
    }

    if(userData.hasOwnProperty('message')) {
      console.log("fetch using userGUID")
      userData = await fetch(`/api/users?userGUID=${userGUID}&singular=1`)
      .then(resp => {
        if(resp.ok) {
          return resp.json()
        } else {
          throw new Error(`We were unable to fetch user data at this time. Please try again.`)
        }
      })
      .catch(error => {
        console.log("no users found using userGUID")
        return error
      })
    }

    return userData


}

async function fetchUserProd({uuid, userGUID, token}){
  return await fetch(`/api/v1/user/${uuid}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(resp => resp.json())
    // .then(resp => resp.User)
    .catch(error => {
      console.error(error)
      return error
    })
}

/*=======================================================================*/

async function updateUserLocal({userName, data}){
  console.log("userData sent to server:",
    `\nuserName: ${userName}`,
    `\ndata: ${JSON.stringify(data)}`
  )
  return await fetch(`/users/${userName}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if(resp.ok) {
        return true
      } else {
        throw new Error(`We were unable to save your changes at this time. Please try again.`)
      }
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

async function updateUserProd({userGUID, data, token}){
  const {phoneNumber, allowEmailNotification} = data
  return await fetch(`/api/v1/user/${userGUID}?phoneNumber=${phoneNumber}&allowEmailNotification=${allowEmailNotification}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(resp => {
      if(resp.ok) {
        return true
      } else {
        throw new Error(`We were unable to save your changes at this time. Please try again.`)
      }
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

/*=======================================================================*/


async function uploadPatientReportLocal({patientGUID, userGUID, reportFile, fileType}){

  // first get reports for this user - local only
  const userDetails = await fetch(`/api/users?userGUID=${patientGUID}&singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })

  const userReports = userDetails.reports || []
  const reports = {
      "reports": [
      ...userReports,
      {
        "id": userDetails.reports && userDetails.reports.length > 0 ? userDetails.reports.length + 1 : 1,
        "reportName": reportFile.name,
        "uploadedFileType": fileType,
        "description": "",
        "timestamp": Date.now(),
        "fileGUID": createUUID()
      }
    ]
  }

  console.log("userData sent to server:", 
    `\nuserGUID: ${userGUID}`, 
    `\npatientGUID: ${patientGUID}`, 
    `\nreportFile:`, reportFile, 
    `\nuploadedFileType:`, fileType, 
    `\nreports:`, reports
  )

  return await fetch(`/users/${userDetails.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reports)
  })
  .then(resp => {
    // TODO: put pdf file into dist folder using middleware
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to upload your file at this time. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

async function uploadPatientReportProd({patientGUID, userGUID, reportFile, fileType, token}){

  const formData = new FormData();

  formData.append("userGUID",userGUID)
  formData.append("patientGUID",patientGUID)
  formData.append("reportFile",reportFile)
  formData.append("uploadedFileType",fileType)

  return await fetch(`/api/patientReport`, {
    method: 'POST',
    // mode: 'no-cors',
    // credentials: 'omit',
    headers: {
      'Authorization': token
    },
    body: formData
  })
  .then(resp => {
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to upload your file at this time. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

/*=======================================================================*/

async function uploadConsentFormLocal({patientGUID, userGUID, reportFile, fileType}){

  // first get reports for this user - local only
  const userDetails = await fetch(`/api/users?userGUID=${patientGUID}&singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })

  const userDocuments = userDetails.otherDocuments || []
  const otherDocuments = {
      "otherDocuments": [
      ...userDocuments,
      {
        "id": userDetails.otherDocuments && userDetails.otherDocuments.length > 0 ? userDetails.otherDocuments.length + 1 : 1,
        "reportName": reportFile.name,
        "uploadedFileType": fileType,
        "description": "",
        "timestamp": Date.now(),
        "fileGUID": createUUID()
      }
    ]
  }

  console.log("userData sent to server:", 
    `\nuserGUID: ${userGUID}`, 
    `\npatientGUID: ${patientGUID}`, 
    `\nfile:`, reportFile, 
    `\nuploadedFileType:`, fileType, 
    `\notherDocuments:`, otherDocuments
  )

  return await fetch(`/users/${userDetails.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(otherDocuments)
  })
  .then(resp => {
    // TODO: put pdf file into dist folder using middleware
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to upload your file at this time. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}


/*=======================================================================*/

// TODO: fetch notifications - needed as seperate call?
async function notificationsMarkAsReadLocal({userGUID}){
  const userDetails = await fetch(`/api/users?userGUID=${userGUID}&singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })

  const userNotificationList = userDetails.notificationList || []
  const notificationList = {
    "notificationList": [
      ...userNotificationList.map(notification => {
        return ({
          ...notification,
          viewedByUser: 1
        })
      })
    ]
  }

  console.log("userData sent to server:", 
    `\nuserGUID: ${userGUID}`
  )

  return await fetch(`/users/${userDetails.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notificationList)
  })
  .then(resp => {
    // TODO: put pdf file into dist folder using middleware
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to mark notifications as read. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

async function notificationsMarkAsReadProd({userGUID, token}){
  return await fetch(`/api/v1/user/${userGUID}/notifications/mark-as-read`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(resp => {
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to mark notifications as read. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

/*=======================================================================*/

async function fetchPatientReportLocal({reportId}){
  // This kind of works, but reports have to be manually placed in the /assets/documents folder and reportId is the filename
  // return await fetch(`//10.5.62.58:8080/api/patientReport/${reportId}`,{
  // return await fetch(`/assets/documents/${reportId}`)
  // return await fetch(`/assets/documents/${reportId}`) // - point to local assets
  return await fetch(`/assets/documents/important-document.pdf`) // - point to local assets
  .then(resp => {
    if(resp.ok) {
      return resp
    } else {
      throw new Error(`We were unable to fetch this report. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

async function fetchPatientReportProd({reportId, token}){
  return await fetch(`/api/patientReport/${reportId}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(resp => {
    if(resp.ok) {
      return resp
    } else {
      throw new Error(`We were unable to fetch this report. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

/*=======================================================================*/

async function reportViewedByLocal({userGUID, reportId}){
  const userDetails = await fetch(`/api/users?userGUID=${userGUID}&singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })

  // get the report that needs updating
  const updatedReports = userDetails.reports.map(report => {
    if(report.fileGUID === reportId) {
      const viewedBy = report.viewedByUsers || []
      return {
        ...report,
        viewedBy: [...new Set([...viewedBy, userGUID])]
      }
    } else {
      return report
    }
  })

  // update the reports list
  const reports = {
    "reports": [
      ...updatedReports
    ]
  }

  console.log("userData sent to server:", 
    `\nuserGUID: ${userGUID}`,
    `\nreportId: ${reportId}`
  )

  //TODO: can I patch one report by ID or do I have to patch the whole reports array?

  return await fetch(`/users/${userDetails.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reports)
  })
    .then(resp => {
      // TODO: put pdf file into dist folder using middleware
      if(resp.ok) {
        return true
      } else {
        throw new Error(`We were unable to mark notifications as read. Please try again.`)
      }
    })
    .catch(error => {
      console.error(error)
    })
}

// flag report as read by user
async function reportViewedByProd({userGUID, reportId, token}){
  return await fetch(`/api/patientReport/${reportId}?viewedByUserId=${userGUID}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(resp => {
    if(resp.ok) {
      return true
    } else {
      throw new Error(`We were unable to mark notifications as read. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}


export const api = {
  local: {
    fetchMockUsers: fetchMockUsersLocal,
    fetchToken: fetchTokenLocal,
    fetchUser: fetchUserLocal,
    updateUser: updateUserLocal,
    fetchPatientTestResults: fetchUserLocal,
    fetchPatientReport: fetchPatientReportLocal,
    uploadPatientReport: uploadPatientReportLocal,
    notificationsMarkAsRead: notificationsMarkAsReadLocal,
    reportViewedBy: reportViewedByLocal,
    uploadConsentForm: uploadConsentFormLocal
  },
  prod: {
    fetchMockUsers: fetchMockUsersProd,
    fetchToken: fetchTokenProd,
    fetchUser: fetchUserProd,
    updateUser: updateUserProd,
    fetchPatientTestResults: fetchUserProd,
    fetchPatientReport: fetchPatientReportProd,
    uploadPatientReport: uploadPatientReportProd,
    notificationsMarkAsRead: notificationsMarkAsReadProd,
    reportViewedBy: reportViewedByProd,
    uploadConsentForm: uploadPatientReportProd
  }
}