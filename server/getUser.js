module.exports = (req, res, next) => {

  const request = require('request');

  if(req.path.startsWith('/userLists')){

    const _send = res.send

    res.send = function(body) {
      if(Object.keys(req.query)[0] !== "_embed") {
        try {
          const json = JSON.parse(body)
          const flatArray = Object.keys(json).reduce((arr,key) => {
            if(Array.isArray(json[key])) {
              return arr.concat(...json[key])
            }
            return arr
          },[])
          const match = flatArray.find(elem => elem[Object.keys(req.query)[0]] === Object.values(req.query)[0])
          return _send.call(this,JSON.stringify(match))

        } catch (e) {}
      }
      return _send.call(this,body)
    }
    next()
  }

  else if(req.path === '/users') {

    const _query = req.query

    // console.log("query",_query)

    request({
      url: 'http://localhost:5000/userLists/1',
      qs: { 
        ..._query,
        _embed: [
          'patients',
          'providers',
          'crcs',
          'bsscs',
          'mochaAdmins',
          'admins',
          'messengers'
        ],
      }
    },(error, resp, body) => {

      // if there was a query then return single user
      if(Object.keys(_query).length) {

        const user = JSON.parse(body)

        let userType = ''
        let _embed = []
        let _expand = []
        if(user.userType) {
          switch(user.userType) {
            case 'PPE_PARTICIPANT':
              userType = 'patients'
              _embed = [
                'reports',
                'notifications',
                'questionAnswers',
                'otherDocuments'
              ]
              if(user.providerId) { _expand.push('provider')}
              if(user.crcId) { _expand.push('crc')}
              break;
            case 'PPE_PROVIDER':
              userType = 'providers'
              _embed = [
                'patients',
                'notifications'
              ]
              if(user.crcId) { _expand.push('crc')}
              break;
            case 'PPE_CRC':
              userType = 'crcs'
              _embed = [
                'patients',
                'providers',
                'notifications'
              ]
              break;
            case 'PPE_BSSC':
              userType = 'bsscs'
              _embed = ['notifications']
              break;
            case 'PPE_MOCHA_ADMIN':
              userType = 'mochaAdmins'
              break;
            case 'PPE_ADMIN':
              userType = 'admins'
              _embed = ['notifications']
              break;
            case 'PPE_MESSENGER':
                userType = 'messengers'
                break;
            default:
              userType = 'patients'
              _embed = ['notifications']
              if(user.providerId) { _expand.push('provider')}
              if(user.crcId) { _expand.push('crc')}
          }

          req.url = `/${userType}/${user.id}`
          req.query = {
            _embed,
            _expand
          }
        }
      }

      // if there was no query then send back all users
      else {
        const _send = res.send
        res.send = function() {
          return _send.call(this,body)
        }
      }
      
      next()

    })

  } 
  else {
    next()
  }
}