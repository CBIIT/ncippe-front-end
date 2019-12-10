const casual = require('casual');

const randomRole = ({
  participant = 55,
  provider = 20,
  crc = 10,
  bssc = 10,
  admin = 5
}) => {
  var n=Math.floor(Math.random()*100)
  let reduce = 0;
  switch(true){
    case n<(reduce+=participant):
      return {
        userType: 'PPE_PARTICIPANT',
        roleName: 'ROLE_PPE_PARTICIPANT'
      };
    case n<(reduce+=provider):
      return {
        userType: 'PPE_PROVIDER',
        roleName: 'ROLE_PPE_PROVIDER'
      };
    case n<(reduce+=crc):
      return {
        userType: 'PPE_CRC',
        roleName: 'ROLE_PPE_CRC'
      };
    case n<(reduce+=bssc):
      return {
        userType: 'PPE_BSSC',
        roleName: 'ROLE_PPE_BSSC'
      };
    case n<=(reduce+=admin):
      return {
        userType: 'PPE_ADMIN',
        roleName: 'ROLE_PPE_ADMIN'
      };
  }
}

const randomBooleanAsString = ({no = 50,yes = 50}) => {
  var n=Math.floor(Math.random()*100)
  switch(true){
    case n<no:
      return "0"
    case n<=(no+yes):
      return "1"
  }
}

casual.define('alphaNumeric', function(length = 8){
  // return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
  let text;
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
})

casual.define('user', function() {
  const firstName = casual.first_name
  const lastName = casual.last_name
  const domain = casual.domain
  const emailName = casual.color_name
	return {
    // userName: `${firstName.toLowerCase()}${lastName}`,
		firstName,
		lastName,
		email: `${emailName}@${domain}`,
    uuid: casual.uuid,
    patientId: casual.alphaNumeric(8),
    phoneNumber: casual.phone,
    allowEmailNotification: randomBooleanAsString({no:25,yes:75}),
    ...randomRole()
	};
});



// const person = (() => {console.log("Person Here")})()

module.exports.users = (count) => {
  const users = []
  do {
    users.push(casual.user)
    count--
  } while(count>0)
  console.log(JSON.stringify(users))
}