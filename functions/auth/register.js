const UserService = require("../../services/UserService.js");

module.exports.handler = async function registerUser(event) {
  const body = JSON.parse(event.body);

  return UserService.createDbUser(body)
    .then(user => ({
      statusCode: 200,
      body: JSON.stringify(user)
    }))
    .catch(err => {
      console.log({ err });

      return {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: { stack: err.stack, message: err.message }
      };
    });
};
