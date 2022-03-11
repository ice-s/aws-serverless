const UserService = require("../../services/UserService.js");
const {validate} = require("../../validate/validator");

module.exports.handler = async function registerUser(event) {
    let body = {};
    try {
        body = event.body ? JSON.parse(event.body) : {};
    } catch (e) {
    }

    const schema = {
        type: "object",
        properties: {
            email: {"type": "string", "format": "email", "minLength": 5, "maxLength": 50},
            password: {"type": "string", "minLength": 5, "maxLength": 30},
            name: {"type": "string", "minLength": 3, "maxLength": 30},
        },
        required: ["email", "password", 'name'],
    };

    const valid = validate(body, schema);

    if (valid.valid === false) {
        return {
            statusCode: 422,
            headers: {"Content-Type": "text/json"},
            body: JSON.stringify({
                'params': valid.error[0].params,
                'message': valid.error[0].message,
            })
        };
    }

    return UserService.createUser(body)
        .then(user => ({
            statusCode: 200,
            headers: {"Content-Type": "text/json"},
            body: JSON.stringify(user)
        }))
        .catch(err => {
            return {
                statusCode: err.statusCode || 400,
                headers: {"Content-Type": "text/json"},
                // body: JSON.stringify({stack: err.stack, message: err.message})
                body: JSON.stringify({code: 10130, message: "Registration failed"})
            };
        });
};
