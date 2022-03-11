const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {getUserByEmail} = require("../services/UserService");

async function signToken(user) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");
    return jwt.sign({email: user.email, id: user.id, roles: ["USER"]}, secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}

async function getUserFromToken(token) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");

    return jwt.verify(token.replace("Bearer ", ""), secret);
}

async function login(args) {
    try {
        const user = await getUserByEmail(args.email);
        if (user.Item) {
            const isValidPassword = await comparePassword(
                args.password,
                user.Item.password
            );

            if (isValidPassword) {
                const token = await signToken(user.Item);
                return Promise.resolve({auth: true, 'code': 0, token: token});
            }
        }

        return Promise.resolve({auth: false, 'code': 10102, 'message': "User or Password is not correct"});
    } catch (err) {
        return Promise.resolve({auth: false, 'code': 10103, 'message': "Something was wrong"});
    }
}

function comparePassword(eventPassword, userPassword) {
    return bcrypt.compare(eventPassword, userPassword);
}

module.exports = {
    signToken,
    getUserFromToken,
    login
};
