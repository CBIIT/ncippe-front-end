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

async function fetchTokenLocal({userName, firstName, lastName, roleName}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserName: ${userName}`, `\nfirstName: ${firstName}`, `\nlastName: ${lastName}`, `\nroleName: ${roleName}`)
  return await fetch(`/api/token?singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
      return error
    })
}

async function fetchTokenProd({userName, firstName, lastName, roleName}){
  // get mock user id list
  // userName, role, firstName, lastName as querystring
  return await fetch(`/api/v1/login?userName=${userName}&firstName=${firstName}&lastName=${lastName}&roleName=${roleName}`,{
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

async function fetchUserLocal({userGUID, userName, token}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserGUID: ${userGUID}`, `\nuserName: ${userName}`, `\ntoken: ${token}`)

  // get user data

  // "/users?userName=:userName&singular=1"
  const query = userName ? `/${userName}` : `?userGUID=${userGUID}&singular=1` 

  return await fetch(`/api/users${query}`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
      return error
    })
}

async function fetchUserProd({userGUID, token}){
  // get mock user id list
  return await fetch(`/api/v1/user/${userGUID}`,{
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

async function updateUserLocal({userName, data, token}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserName: ${userName}`, `\ndata: ${JSON.stringify(data)}`, `\ntoken: ${token}`)
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
  // get mock user id list
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


async function uploadPatientReportLocal({patientGUID, userGUID, reportFile, token}){

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
        "description": "",
        "timestamp": Date.now(),
        "s3Url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]
  }

  console.log("userData sent to server:", 
    `\nuserGUID: ${userGUID}`, 
    `\npatientGUID: ${patientGUID}`, 
    `\ntoken: ${token}`,
    `\nreportFile:`, reportFile, 
    `\nreports:`, reports)

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

async function uploadPatientReportProd({patientGUID, userGUID, reportFile, token}){

  const formData = new FormData();

  formData.append("userGUID",userGUID)
  formData.append("patientGUID",patientGUID)
  formData.append("reportFile",reportFile)

  // return await fetch(`http://ec2-54-90-152-86.compute-1.amazonaws.com/api/patientReport`, {
  return await fetch(`/api/patientReport`, {
    // 'Content-Type': 'multipart/form-data; boundary=---XXX',
    // 'Content-Type': 'text/plain',
  // return await fetch(`http://10.5.62.130:8080/patientReport`, {
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

// TODO: fetch notifications - needed as seperate call?
async function notificationsMarkAsReadLocal({userGUID, token}){
  // get mock user id list
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
    `\nuserGUID: ${userGUID}`,
    `\ntoken: ${token}`)

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

//TODO: mock fetching report pdf files locally
async function fetchPartientReportProd({reportID}){
  // return await fetch(`//10.5.62.58:8080/api/patientReport/${reportID}`,{
  // return await fetch(`/assets/documents/${reportID}`) - point to local assets
  return await fetch(`/api/patientReport/${reportID}`)
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



export const api = {
  local: {
    fetchMockUsers: fetchMockUsersLocal,
    fetchToken: fetchTokenLocal,
    fetchUser: fetchUserLocal,
    updateUser: updateUserLocal,
    fetchPatientTestResults: fetchUserLocal,
    fetchPatientReport: fetchPartientReportProd,
    uploadPatientReport: uploadPatientReportLocal,
    notificationsMarkAsRead: notificationsMarkAsReadLocal
  },
  prod: {
    fetchMockUsers: fetchMockUsersProd,
    fetchToken: fetchTokenProd,
    fetchUser: fetchUserProd,
    updateUser: updateUserProd,
    fetchPatientTestResults: fetchUserProd,
    fetchPatientReport: fetchPartientReportProd,
    uploadPatientReport: uploadPatientReportProd,
    notificationsMarkAsRead: notificationsMarkAsReadProd
  }
}