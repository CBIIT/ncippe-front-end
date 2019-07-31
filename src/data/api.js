async function fetchMockUsersLocal(){
  // get mock user id list
  const mockUsers = await fetch(`/api/mockUsers`)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })

  // compose request using mock user list results
  const url = `/api/users?userGUID=${mockUsers.join('&userGUID=')}`

  // fetch data for each mock user
  return await fetch(url)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

async function fetchMockUsersProd(){
  // fetch data for each mock user - this will fetch ALL users :(
  return await fetch(`//13.58.241.22:8080/v1/users`)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

/*=======================================================================*/

async function fetchTokenLocal({userName, firstName, lastName, roleName}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserName: ${userName}`, `\nfirstName: ${firstName}`, `\nlastName: ${lastName}`, `\nroleName: ${roleName}`)
  return await fetch(`/api/token?singular=1`)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

async function fetchTokenProd({userName, firstName, lastName, roleName}){
  // get mock user id list
  // userName, role, firstName, lastName as querystring
  return await fetch(`//13.58.241.22:8080/v1/login?userName=${userName}&firstName=${firstName}&lastName=${lastName}&roleName=${roleName}`)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

/*=======================================================================*/

async function fetchUserLocal({userGUID, token}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserGUID: ${userGUID}`, `\ntoken: ${token}`)
  return await fetch(`/api/users/${userGUID}`)
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

async function fetchUserProd({userGUID, token}){
  // get mock user id list
  return await fetch(`//13.58.241.22:8080/v1/user/${userGUID}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then(resp => resp.json())
    .catch(error => {
      console.error('Error:', error)
    })
}

/*=======================================================================*/

async function updateUserLocal({userGUID, data, token}){
  // get mock user id list
  console.log("userData sent to server:", `\nuserGUID: ${userGUID}`, `\ndata: ${JSON.stringify(data)}`, `\ntoken: ${token}`)
  return await fetch(`/users/${userGUID}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return true
      } else {
        return new Error(`Sorry, we were unable to save your changes at this time. Please try again.`)
      }
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

async function updateUserProd({userGUID, data, token}){
  // get mock user id list
  return await fetch(`//13.58.241.22:8080/v1/user/${userGUID}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return true
      } else {
        return new Error(`Sorry, we were unable to save your changes at this time. Please try again.`)
      }
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

/*=======================================================================*/

export const api = {
  local: {
    fetchMockUsers: fetchMockUsersLocal,
    fetchToken: fetchTokenLocal,
    fetchUser: fetchUserLocal,
    updateUser: updateUserLocal
  },
  prod: {
    fetchMockUsers: fetchMockUsersProd,
    fetchToken: fetchTokenProd,
    fetchUser: fetchUserProd,
    updateUser: updateUserProd
  }
}