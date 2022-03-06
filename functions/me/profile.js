const UserService = require("../../services/UserService");
const { getUserFromToken } = require("../../lib/utils");

module.exports.handler = async function(event) {

  return {
    statusCode: 200,
    headers: {},
  };


  const userObj = await getUserFromToken(event.headers.Authorization);

  const dbUser = await UserService.getUserByEmail(userObj.email);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(dbUser)
  };
};
