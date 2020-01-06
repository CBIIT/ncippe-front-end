module.exports = (req, res, next) => {
  const request = require('request');
  
  if(req.path.search(/patients\/\d{1,3}$/) > 0) {

    const _send = res.send

    res.send = function (body) {

      const data = JSON.parse(body)

      if(data.providers) {

        console.log('fetch all providers here')

        const providerIds = Array.isArray(data.providers) ? 'id=' + data.providers.join("&id=") : 'id=' + data.providers

        request({
          url: `http://localhost:5000/providers?${providerIds}`,
        },
        (error, resp, providers) => {
          console.log("providers response", providers)

          const providersData = JSON.parse(providers)

          const providerData = providersData.map(provider => {
            return {
              firstName: provider.firstName,
              lastName: provider.lastName,
              phoneNumber: provider.phoneNumber,
              email: provider.email
            }
          })

          data.providers = providerData
          return _send.call(this, JSON.stringify(data,null,2))
        })
      } else {
        return _send.call(this,body)
      }
    } 
    next()
  }
  else {
    next()
  }
}