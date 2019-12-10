import { createUUID, flatArray, getUserGroup } from '../utils/utils'
import queryString from 'query-string'

const handleResponse = resp => {
  if(resp.ok) {
    const contentType = resp.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return resp.json()
    } else {
      return resp
    }
  } else {
    throw new Error(`Request rejected with status ${resp.status}: ${resp.statusText}`)
  }
}

const handlePromiseAllResponse = resps => {
  // console.log("values",resps)
  let data = []
  let errorMessage

  resps.map(resp => {
    if(resp instanceof Error) {
      // add to the error message only if this message is new. DRY
      if(!errorMessage) {
        errorMessage = resp.message
      }
      else if (!errorMessage.includes(resp.message)){
        errorMessage+= ` ${resp.message}`
      }
    } else {
      data.push(resp)
    }
  })

  // console.log(errorMessage)

  if(errorMessage) {
    throw new Error(errorMessage)
  } else {
    return data
  }
}

// handle error with a custom message
const handleErrorMsg = message => error => {
  console.error(error)
  return message ? typeof message === 'string' ? new Error(message) : message : error.message
}

// handle default error
const handleError = error => {
  console.error(error)
  return error
}

/*=======================================================================*/
/*======== Mock Users ===================================================*/

async function fetchMockUsersLocal(){
  
  const query = {
    _embed: [
      "patients",
      "providers",
      "crcs",
      "bsscs",
      "mochaAdmins",
      "admins"
    ]
  }

  return await fetch(`/api/mockUsers/1?${queryString.stringify(query)}`)
    .then(handleResponse)
    .then(data => flatArray(data))
    .catch(handleErrorMsg(`Unable to fetch mock users`))
}

async function fetchMockUsersProd(){
  return await fetch(`/api/v1/users`)
    .then(handleResponse)
    .catch(handleErrorMsg(`Unable to fetch mock users`))
}

/*=======================================================================*/
/*======== Request Token ================================================*/

async function fetchTokenLocal({uuid, email, id_token}){
  console.log("fetchToken data sent to server:", 
    `\nuuid: ${uuid}`, 
    `\nemail: ${email}`,
    `\nid_token: ${id_token}`,
  )

  // check if the uuid exists in our system
  const userUUID_exists = await fetch(`/api/users?uuid=${uuid}`)
    .then(handleResponse)
    .catch(handleError)

  let userEmail_exists = false

  // if no uuid then check if the user is in our system based on the email provided. email used for login.gov account must match email registered in OPEN
  
  if (!userUUID_exists) {
    userEmail_exists = await fetch(`/api/users?email=${email}`)
      .then(handleResponse)
      .catch(handleError)
  }

  // use has a valid uuid of email address in our system
  if ((userUUID_exists && !(userUUID_exists instanceof Error)) || (userEmail_exists && !(userEmail_exists instanceof Error))) {
    // if no uuid was found then this user is logging in for the first time. Add their uuid from login.gov used to fetch this token
    if(!userUUID_exists) {
      // this is probably a mock user without a login.gov account. Save their UUID locally
      const userData = userEmail_exists
      await fetch(`/api/${getUserGroup(userData.userType)}/${userData.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uuid:createUUID()})
      }).then(()=>{
        console.info('%cpatch successful','color:#00bde3; background:#e7f6f8; display: block')
      })
    }

    return await fetch(`/api/token?singular=1`)
      .then(handleResponse)
      .catch(handleError)

  } else {
    return new Error(`Invalid user.`)
  }
}

async function fetchTokenProd({uuid, email, id_token}){
  // uuid and email from login.gov as querystring
  const query = {
    uuid,
    email
  }
  return await fetch(`/api/v1/login?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': id_token
    }
  })
  .then(handleResponse)
  .catch(handleError)
}

/*=======================================================================*/
/*======== Fetch User Data ==============================================*/

async function fetchUserLocal({uuid, patientId, email, token}){
  console.log("fetchUser data sent to server:", 
    `\nuuid: ${uuid}`,
    `\npatientId: ${patientId}`,
    `\nemail: ${email}`
  )
  const query = uuid ? {uuid} : patientId ? {patientId} : {email}

  return await fetch(`/api/users?${queryString.stringify(query)}`)
    .then(handleResponse)
    .then(data => {
      if(data.portalAccountStatus === 'ACCT_TERMINATED_AT_PPE') {
        return new Error(`This account has been closed`)
      } else {
        // have to stuff provider into an array to match prod machine. Unfortunatly, json-server does not handle many-to-many relationships, so we're hacking the response here
        if(data.provider) {
          return {
            ...data,
            providers: [
              data.provider
            ]
          }
        }
        return data
      }
    })
    .catch(handleErrorMsg(`Unable to fetch user data based on query: ${query}`))
}

async function fetchUserProd({uuid, patientId, email, token}){
  let query = {}
  if(typeof uuid === 'string'){
    query.uuid = uuid
  }
  if(typeof patientId === 'string'){
    query.patientId = patientId
  }
  if(typeof email === 'string'){
    query.email = email
  }

  return await fetch(`/api/v1/user?${queryString.stringify(query)}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg(`Unable to fetch user data based on query: ${query}.`))
}

/*=======================================================================*/
/*======== Update User Account Data =====================================*/

async function updateUserLocal({uuid, data, token}){
  console.log("updateUser data sent to server:",
    `\nuuid: ${uuid}`,
    `\ndata: ${JSON.stringify(data)}`
  )

  // first: identify the user
  const userData = await fetchUserLocal({uuid})

  return await fetch(`/api/${getUserGroup(userData.userType)}/${userData.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse)
  .then(resp => resp)
  .catch(handleErrorMsg('Unable to save changes.'))
}

async function updateUserProd({uuid, data, token}){
  const {phoneNumber, allowEmailNotification} = data
  const query = {
    phoneNumber,
    allowEmailNotification
  }
  return await fetch(`/api/v1/user/${uuid}?${queryString.stringify(query)}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to save changes.'))
}

/*=======================================================================*/
/*======== Upload Report/File ============================================*/

async function uploadPatientReportLocal({patientId, uuid, reportFile, fileType}){

  const endpoint = fileType === 'PPE_FILETYPE_BIOMARKER_REPORT' ? '/api/reports' : '/api/otherDocuments'
  const newFile = {
    uploadedBy: uuid,
    fileName: reportFile.name,
    uploadedFileType: fileType,
    description: "",
    dateUploaded: Date.now(),
    fileGUID: createUUID()
  }

  console.log("uploadPatientReport data sent to server:", 
    `\nnewFile:`, newFile
  )

  // first: identify the user
  const userData = await fetchUserLocal({patientId})

  // attach
  newFile.patientId = userData.id

  // upload the report
  return await fetch(endpoint,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFile)
  })
  .then(handleResponse)
  .then(resp => resp)
  .catch(handleErrorMsg('Unable to upload file.'))
}

async function uploadPatientReportProd({patientId, uuid, reportFile, fileType, token}){

  const formData = new FormData();

  formData.append("uuid",uuid)
  formData.append("patientId",patientId)
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
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to upload file.'))
}

/*=======================================================================*/
/*======== Mark Notifications as Read ===================================*/

async function notificationsMarkAsReadLocal({uuid}){

  // first: identify the user
  const userData = await fetchUserLocal({uuid})

  // get the notifications to be updated
  const notifications = await fetch(`/api/notifications?${getUserGroup(userData.userType, false)}=${userData.id}`)
    .then(handleResponse)
    .catch(handleError)

  // update notifications
  const updatedNotifications = notifications.map(notification => {
    return ({
      ...notification,
      viewedByUser: 1
    })
  })

  console.log("notificationsMarkAsRead data sent to server:", 
    `\nupdatedNotifications:`, updatedNotifications
  )

  // write updates to the server
  const promises = updatedNotifications.map(notification => fetch(`/api/notifications/${notification.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notification)
    })
    .then(handleResponse)
    .catch(handleError)
  )

  return await Promise.all(promises)
    .then(handlePromiseAllResponse)
    .catch(handleError)
}

async function notificationsMarkAsReadProd({uuid, token}){
  return await fetch(`/api/v1/user/${uuid}/notifications/mark-as-read`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to mark notifications as read.'))
}

/*=======================================================================*/
/*======== Fetch Patient Report =========================================*/

async function fetchPatientReportLocal({reportId}){
  // This kind of works, but reports have to be manually placed in the /assets/documents folder and reportId is the filename
  // return await fetch(`/assets/documents/${reportId}`) // - point to local assets
  return await fetch(`/assets/documents/important-document.pdf`) // - point to local assets
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to fetch report.'))
}

async function fetchPatientReportProd({reportId, token}){
  return await fetch(`/api/patientReport/${reportId}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to fetch report.'))
}

/*=======================================================================*/
/*======== Report Viewed By =============================================*/

async function reportViewedByLocal({uuid, reportId}){

  // fetch the report to be updated
  const report = await fetch(`/api/reports?fileGUID=${reportId}&singular=1`)
    .then(handleResponse)
    .catch(handleError)

  const viewedBy = report.viewedBy || []
  // add the uuid to the report's viewedBy list
  const updatedReport = {
    ...report,
    viewedBy: [...new Set([...viewedBy, uuid])]
  }

  console.log("reportViewedBy data sent to server:", 
    `\nupdatedReport:`, updatedReport
  )

  // write updates
  return await fetch(`/api/reports/${report.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedReport)
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to mark notifications as read.'))
}

// flag report as read by user
async function reportViewedByProd({uuid, reportId, token}){
  return await fetch(`/api/patientReport/${reportId}?viewedByUserId=${uuid}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to mark notifications as read.'))
}

/*=======================================================================*/
/*======== Withdraw User ================================================*/

async function withdrawUserLocal({uuid, patientId, qsAnsDTO, token}){
  // this will be two fetch requests since we're updating both the user data and the questionAnswers data
  
  // first: identify the patient
  const patientData = await fetchUserLocal({patientId})

  // data to save on withdraw
  const withdrawUpdates = {
    isActiveBiobankParticipant: false,
    dateDeactivated: new Date(),
    lastRevisedUser: uuid,
  }

  const questionsWithPatientId = qsAnsDTO.map(q => ({
    ...q,
    patientId: patientData.id
  }))

  const qaUpdates = [...questionsWithPatientId]

  console.log("withdrawUser data sent to server", 
    `\nwithdrawUpdates:`, withdrawUpdates, 
    `\nqaUpdates:`, qaUpdates
  )

  const updatePatients = fetch(`/api/patients/${patientData.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(withdrawUpdates)
    })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to withdraw the participant account.'))

  // write updates to the server
  const qaPromises = qaUpdates.map(question => fetch(`/api/questionAnswers`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to save questions and answers.'))
  )

  return Promise.all([updatePatients,...qaPromises])
    .then(handlePromiseAllResponse).then(resp => {
      const [userData, ...rest ] = resp
      return ({
        ...userData,
        questionAnswers: rest
      })
    })
    .catch(handleError)
}

async function withdrawUserProd({uuid, patientId, qsAnsDTO, token}){
  const query = {
    patientId,
    updatedByUser: uuid
  }
  return await fetch(`/api/v1/withdraw-user-participation?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(qsAnsDTO)
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to withdraw participant account.'))
}

/*=======================================================================*/
/*======== Close Account ================================================*/

async function closeAccountLocal({uuid, token}){

  // first: identify the patient
  const userData = await fetchUserLocal({uuid})

  return await fetch(`/api/patients/${userData.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      portalAccountStatus: 'ACCT_TERMINATED_AT_PPE'
    })
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to close account.'))
}

async function closeAccountProd({uuid, token}){
  return await fetch(`/api/v1/deactivate-user/${uuid}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to close account.'))
}

/*=======================================================================*/
/*======== Activate Participant =========================================*/

async function updateParticipantDetailsLocal({uuid, token, patient}){

  // first: identify the patient
  const userData = await fetchUserLocal({patientId: patient.patientId})

  return await fetch(`/api/patients/${userData.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      updatedByUser: uuid,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      portalAccountStatus: 'ACCT_ACTIVE'
    })
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to activate participant account.'))
}

async function updateParticipantDetailsProd({uuid, token, patient}){
  const query = {
    updatedByUser: uuid,
    patientId: patient.patientId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    emailId: patient.email
  }

  return await fetch(`/api/v1/user/invite-participant-to-portal?${queryString.stringify(query)}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to activate participant account.'))
}

/*=======================================================================*/
/*======== Public API ===================================================*/

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
    uploadConsentForm: uploadPatientReportLocal,
    withdrawUser: withdrawUserLocal,
    closeAccount: closeAccountLocal,
    updateParticipantDetails: updateParticipantDetailsLocal
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
    uploadConsentForm: uploadPatientReportProd,
    withdrawUser: withdrawUserProd,
    closeAccount: closeAccountProd,
    updateParticipantDetails: updateParticipantDetailsProd
  }
}