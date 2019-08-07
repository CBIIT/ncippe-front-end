async function fetchMockUsersLocal(){
  // get mock user id list
  const mockUsers = await fetch(`/api/mockUsers`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })

  // compose request using mock user list results
  const url = `/api/users?userName=${mockUsers.join('&userName=')}`

  // fetch data for each mock user
  return await fetch(url)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
    })
}

async function fetchMockUsersProd(){
  // fetch data for each mock user - this will fetch ALL users :(
  return await fetch(`/api/v1/users`)
    .then(resp => resp.json())
    // .then(resp => resp.User)
    .catch(error => {
      console.error(error)
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
    })
}

/*=======================================================================*/

async function fetchUserLocal({userName, token}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserName: ${userName}`, `\ntoken: ${token}`)

  // get user data
  return await fetch(`/api/users/${userName}`)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error)
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
    })
}

/*=======================================================================*/


export const api = {
  local: {
    fetchMockUsers: fetchMockUsersLocal,
    fetchToken: fetchTokenLocal,
    fetchUser: fetchUserLocal,
    updateUser: updateUserLocal,
    fetchPatientTestResults: fetchUserLocal
  },
  prod: {
    fetchMockUsers: fetchMockUsersProd,
    fetchToken: fetchTokenProd,
    fetchUser: fetchUserProd,
    updateUser: updateUserProd,
    fetchPatientTestResults: fetchUserProd
  }
}