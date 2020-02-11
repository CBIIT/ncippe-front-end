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
      'Content-Type': 'application/json',
      'Authorization': id_token
    }
  })
  .then(handleResponse)
  .catch(handleError)
}

/*=======================================================================*/
/*======== Fetch User Data ==============================================*/

async function fetchUser({uuid, patientId, email, token}){
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

async function updateUser({uuid, data, token}){
  const {phoneNumber, allowEmailNotification, lang} = data
  const query = {
    phoneNumber,
    allowEmailNotification,
    lang
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
      'Authorization': token
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

async function fetchPatientReport({reportId, token}){
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

// flag report as read by user
async function reportViewedBy({uuid, reportId, token}){
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

async function withdrawUser({uuid, patientId, qsAnsDTO, token}){
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

async function closeAccount({uuid, token}){
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

async function updateParticipantDetails({uuid, token, patient}){
  const query = {
    updatedByUser: uuid,
    patientId: patient.patientId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    emailId: patient.email,
    lang: patient.lang
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
  fetchMockUsers,
  fetchToken,
  fetchUser,
  updateUser,
  fetchPatientTestResults: fetchUser,
  fetchPatientReport,
  uploadPatientReport,
  notificationsMarkAsRead,
  reportViewedBy,
  uploadConsentForm: uploadPatientReport,
  withdrawUser,
  closeAccount,
  updateParticipantDetails,
}