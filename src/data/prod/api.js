import { filesViewedByUser, sortPatients } from '../../data/utils'
import { formatPhoneNumber } from '../../utils/utils'
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

async function fetchMockUsers(){
  return await fetch(`/api/v1/users`)
    .then(handleResponse)
    .catch(handleErrorMsg(`Unable to fetch mock users`))
}

/*=======================================================================*/
/*======== Request Token ================================================*/

async function fetchToken({uuid, email, id_token}){
  // uuid and email from login.gov as querystring
  const query = {
    uuid,
    email
  }
  return await fetch(`/api/v1/login?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
  .catch(handleError)
}

/*=======================================================================*/
/*======== Fetch User Data ==============================================*/

async function loginUser(){
  return await fetch(`/api/v1/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg(`Unable to login user.`))
}

/*=======================================================================*/
/*======== Fetch User Data ==============================================*/

async function fetchUser({uuid, patientId, email, adminId, token}){
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
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .then(data => {
    if(data.portalAccountStatus === 'ACCT_TERMINATED_AT_PPE') {
      return new Error(`This account has been closed`)
    } else {
      // format "phoneNumber" field
      data.phoneNumber = formatPhoneNumber(data.phoneNumber)

      // set new notification count
      data.newNotificationCount = data.notifications ? data.notifications.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0
      
      // find which reports and otherDocuments have been viewed by this user
      const viewer = adminId || uuid
      const viewedReports = filesViewedByUser(data.reports, viewer)
      const viewedDocuments = filesViewedByUser(data.otherDocuments, viewer)
      const roleData = {
        reports: viewedReports.files,
        newReportCount: viewedReports.newCount,
        hasNewReports: Boolean(viewedReports.newCount),
        otherDocuments: viewedDocuments.files,
        newDocumentCount: viewedDocuments.newCount,
        hasNewDocuments: Boolean(viewedDocuments.newCount)
      }
      data = {...data, ...roleData}

      // participant specific data 
      if (data.roleName === "ROLE_PPE_PARTICIPANT") {
        // have to stuff provider into an array to match prod machine. Unfortunatly, json-server does not handle many-to-many relationships, so we're hacking the response here
        if(data.provider) {
          const { provider, ...rest } = data
          data = {
            ...rest,
            providers: [provider]
          }
        }
      }

      // admin specific data
      // sort patient list alphabetically by last name
      if(data.patients && data.patients.length > 1) {
        data.patients = sortPatients(data.patients)
      }

      return data
    }
  })
  .catch(handleErrorMsg(`Unable to fetch user data based on query: ${query}.`))
}

/*=======================================================================*/
/*======== Update User Account Data =====================================*/

async function updateUser({uuid, data, token}){
  const {phoneNumber, allowEmailNotification, lang} = data
  const query = {
    phoneNumber,
    allowEmailNotification,
    preferredLanguage: lang
  }
  return await fetch(`/api/v1/user/${uuid}?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to save changes.'))
}

/*=======================================================================*/
/*======== Upload Report/File ============================================*/

async function uploadPatientReport({patientId, uuid, reportFile, fileType, token}){

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
      'access-control-allow-origin': '*'
    },
    body: formData
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to upload file.'))
}

/*=======================================================================*/
/*======== Mark Notifications as Read ===================================*/

async function notificationsMarkAsRead({uuid, token}){
  return await fetch(`/api/v1/user/${uuid}/notifications/mark-as-read`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to mark notifications as read.'))
}

/*=======================================================================*/
/*======== Fetch Patient Report =========================================*/

async function fetchPatientReport({reportId, token}){
  return await fetch(`/api/patientReport/${reportId}`,{
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to fetch report.'))
}

/*=======================================================================*/
/*======== Report Viewed By =============================================*/

// flag report as read by user
async function reportViewedBy({uuid, reportId, token}){
  return await fetch(`/api/patientReport/${reportId}/markAsRead`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to mark notifications as read.'))
}

/*=======================================================================*/
/*======== Withdraw User ================================================*/

async function withdrawUser({uuid, patientId, qsAnsDTO, token}){
  const query = {
    patientId,
    updatedByUser: uuid
  }
  return await fetch(`/api/v1/withdraw-user-participation?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: JSON.stringify(qsAnsDTO)
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to withdraw participant account.'))
}

/*=======================================================================*/
/*======== Close Account ================================================*/

async function closeAccount({uuid, token}){
  return await fetch(`/api/v1/deactivate-user/${uuid}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to close account.'))
}

/*=======================================================================*/
/*======== Activate Participant =========================================*/

async function updateParticipantDetails({uuid, token, patient}){
  const query = {
    updatedByUser: uuid,
    patientId: patient.patientId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    emailId: patient.email,
    preferredLanguage: patient.lang
  }

  return await fetch(`/api/v1/user/enter-new-participant-details?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to update participant information.'))
}

async function activateParticipant({uuid, token, patient}){
  const query = {
    updatedByUser: uuid,
    patientId: patient.patientId,
  }

  return await fetch(`/api/v1/user/invite-participant-to-portal?${queryString.stringify(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
  .then(handleResponse)
  .catch(handleErrorMsg('Unable to activate participant account.'))
}

/*=======================================================================*/
/*======== Get Hospital List =========================================*/

async function getHospitalList(){
  return await fetch(`/publicapi/v1/sites`,{
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to fetch hospital list at this time.'))
}

/*=======================================================================*/
/*======== Public API ===================================================*/

export const api = {
  fetchMockUsers,
  fetchToken,
  loginUser,
  fetchUser,
  updateUser,
  fetchPatientTestResults: fetchUser,
  fetchPatientReport,
  fetchPatientFile: fetchPatientReport,
  uploadPatientReport,
  uploadConsentForm: uploadPatientReport,
  notificationsMarkAsRead,
  reportViewedBy,
  documentViewedBy: reportViewedBy,
  withdrawUser,
  closeAccount,
  updateParticipantDetails,
  activateParticipant,
  getHospitalList
}