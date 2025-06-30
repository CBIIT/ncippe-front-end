const axios = require('axios');
module.exports = async (req, res, next) => {
  
  if(req.path.search(/patients\/\d{1,3}$/) > 0) {

    const _send = res.send

    res.send = async function (body) {

      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return _send.call(this, body); // Return original body if parsing fails
      }

      if(data.providers) {

        try {
        // console.log('fetch all providers here')

        const providerIds = Array.isArray(data.providers) 
        ? data.providers.map(id => `id=${id}`).join("&i") 
        : `id=${data.providers}`

        const response = await axios.get(`http://localhost:5000/providers?${providerIds}`);
        // console.log("response", response.data)
        const providerData = response.data.map(provider => ({
          firstName: provider.firstName,
          lastName: provider.lastName,
          phoneNumber: provider.phoneNumber,
          email: provider.email
            
        }));

        data.providers = providerData;
        return _send.call(this, JSON.stringify(data,null,2));
      } catch (error) {
        console.error("Error fetching providers:", error);
        return _send.call(this, body); // Return original body if fetching fails
      }
        
      } else {
        return _send.call(this,body)
      }
    };
    next()
  }
  else {
    next()
  }
};