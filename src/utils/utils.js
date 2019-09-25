export const getBool = (val) => {
  return !!JSON.parse(String(val).toLowerCase());
}

export const formatPhoneNumber = (number) => {
  const cleaned = ('' + number).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid)
}

export const isValidUserId = (id) => {
  const userIdRegex = /[a-zA-Z0-9]{8}/;
  return userIdRegex.test(id)
}

export const createUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //eslint-disable-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const randomString = (length) => [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')