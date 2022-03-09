// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const {docClient} = require("../connection/DatabaseConnection");

const createDbUser = async props => {
    const passwordHash = await bcrypt.hash("123456", 8);

    let UserItem = {
        "id": uuid.v1(), // Parsed from request body
        "username": uuid.v1(), // Parsed from request body
        "password": passwordHash, // Parsed from request body
        "email": uuid.v1() + '@gmail.com', // Parsed from request body
        "created_at": new Date().getTime(), // Parsed from request body
    };

    const response = await docClient.put({
        TableName: "UsersTable",
        Item: UserItem,
    }).promise();

    return UserItem;
};

const getUserByEmail = async email => {
    const params = {
        // Get the table name from the environment variable
        TableName: 'UsersTable',
        Key: {
            "email": "d64bad32-9f95-11ec-b1af-5dd856d9aa56@gmail.com",
            "id": "d64bad30-9f95-11ec-b1af-5dd856d9aa56"
        },
        // KeyConditionExpression: "#pk = :pkValue",
        // ExpressionAttributeNames: {
        //     "#pk": "email",
        // },
        // ExpressionAttributeValues: {
        //     ":pkValue": email,
        // },
        // // FilterExpression : '#password= :passwordValue',
        // // ExpressionAttributeNames : {
        // //     '#password' : 'password'
        // // },
        // ScanIndexForward: true,
    };

    return await docClient.get(params).promise();
};

module.exports = {
    createDbUser,
    getUserByEmail
};
