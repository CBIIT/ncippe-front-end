import { filesViewedByUser, sortPatients } from '../../data/utils'
import { formatPhoneNumber } from '../../utils/utils'
import queryString from 'query-string'
import {Slider} from "@material-ui/core";

const handleResponse = resp => {
  console.log('MHL 0a resp: ', resp);

  if(resp.ok) {
    const contentType = resp.headers.get("content-type")
      console.log('MHL 1 contentType: ', contentType);
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
  .then(data => {
    if(data.portalAccountStatus === 'ACCT_TERMINATED_AT_PPE') {
      return new Error(`This account has been closed`)
    } else {
      // format "phoneNumber" field
      data.phoneNumber = formatPhoneNumber(data.phoneNumber)

      // set new notification count
      data.newNotificationCount = data.notifications ? data.notifications.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0
      
      // participant specific data
      // find which reports and otherDocuments have been viewed by this user
      if(data.userType === 'PPE_PARTICIPANT') {
        const viewedReports = filesViewedByUser(data.reports, data.uuid)
        const viewedDocuments = filesViewedByUser(data.otherDocuments, data.uuid)
        const roleData = {
          reports: viewedReports.files,
          newReportCount: viewedReports.newCount,
          hasNewReports: Boolean(viewedReports.newCount),
          otherDocuments: viewedDocuments.files,
          newDocumentCount: viewedDocuments.newCount,
          hasNewDocuments: Boolean(viewedDocuments.newCount)
        }
        data = {...data, ...roleData}
      }

      // admin specific data
      // sort patient list alphabetically by last name
      if(data.patients && data.patients.length > 1) {
        data.patients = sortPatients(data.patients)
      }

      return data
    }
  })
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
/*======== Update Participant Email =====================================*/

async function updateParticipantEmail({patientId, email, token}){
  const query = {
    patientId,
    email
  }
  return await fetch(`/api/v1/user/update-participant-email?${queryString.stringify(query)}`,{
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
/*======== Get Home Page Alert ==========================================*/

async function getAlerts(){
  return await fetch(`/publicapi/v1/alerts/`,{
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to fetch site alerts at this time.'))
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
/*======== Get News and Events ==========================================*/

async function getNewsEvents(){
  return await fetch(`/publicapi/v1/newsEvents`,{
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to fetch news & events at this time.'))
}

/*=======================================================================*/
/*======== Send Message =================================================*/

async function sendMessage(data){
  return await fetch(`/api/v1/notifications`,{
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .catch(handleErrorMsg('The server was unable to send messages.'))
}

/*=======================================================================*/
/*======== Get Messages =================================================*/

async function getMessages({uuid}){
  return await fetch(`/api/v1/notifications`,{
    headers: {
      'Content-Type': 'text/plain',
      'access-control-allow-origin': '*'
    }
  })
    .then(handleResponse)
    .catch(handleErrorMsg('Unable to fetch messages at this time.'))
}

/*=======================================================================*/
/*======== Get Chart data =================================================*/
async function getChartData(){
    console.log('MHL getChartData1 ***');
    return await fetch(`/publicapi/v1/chartData`,{
        headers: {
            'Content-Type': 'text/plain',
         //   'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        }
    })
        .then(handleResponse)
        .catch(handleErrorMsg('Unable to fetch chart data at this time.'))
}
/*=======================================================================*/

async function getChartData2(){
    console.log('MHL getChartData2');
    return await fetch(`/chartData`,{
        headers: {
            'Content-Type': 'text/plain',
            'access-control-allow-origin': '*'
        }
    })
        .then(handleResponse)
        .catch(handleErrorMsg('getChartData2 Unable to fetch chart data at this time.'))
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
  updateParticipantEmail,
  activateParticipant,
  getAlerts,
  getHospitalList,
  getNewsEvents,
  sendMessage,
  getMessages,
  getChartData,
  getChartData2
}
