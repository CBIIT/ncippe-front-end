const casual = require('casual');

const randomRole = () => {
  var n=Math.floor(Math.random()*100)
  switch(true){
    case n<55:
      return {
        userType: 'PPE_PARTICIPANT',
        roleName: 'ROLE_PPE_PARTICIPANT'
      };
    case n<75:
      return {
        userType: 'PPE_PROVIDER',
        roleName: 'ROLE_PPE_PROVIDER'
      };
    case n<85:
      return {
        userType: 'PPE_CRC',
        roleName: 'ROLE_PPE_CRC'
      };
    case n<95:
      return {
        userType: 'PPE_BSSC',
        roleName: 'ROLE_PPE_BSSC'
      };
    case n<=100:
      return {
        userType: 'PPE_ADMIN',
        roleName: 'ROLE_PPE_ADMIN'
      };
  }
}

casual.define('user', function() {
	return {
    userName: casual.username,
		firstnNme: casual.first_name,
		lastName: casual.last_name,
		email: casual.email,
    userGUID: casual.uuid,
    phoneNumber: casual.phone,
    allowEmailNotification: casual.boolean,
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