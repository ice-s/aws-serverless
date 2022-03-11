const UserService = require("../../services/UserService");
const {getUserFromToken} = require("../../services/AuthService");

module.exports.handler = async function (event) {
    const userObj = await getUserFromToken(event.headers.Authorization);
    const dbUser = await UserService.getUserByEmail(userObj.email);

    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(
            {
                'user': dbUser,
                'articles': []
            }
        )
    };
};
