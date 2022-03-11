const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const {docClient} = require("../connection/DatabaseConnection");

const createUser = async props => {
    const passwordHash = await bcrypt.hash(props.password, 8);

    let UserItem = {
        "id": uuid.v1(),
        "name": props.name,
        "password": passwordHash,
        "email": props.email,
        "type": 'User',
        "created_at": new Date().getTime(),
    };

    const response = await docClient.put({
        TableName: "UsersTable",
        Item: UserItem,
        ConditionExpression: 'attribute_not_exists(email)'
    }).promise();

    delete UserItem.password;
    delete UserItem.type;

    return UserItem;
};

const createAdmin = async props => {
    const passwordHash = await bcrypt.hash(props.password, 8);

    let UserItem = {
        "id": uuid.v1(),
        "name": props.name,
        "password": passwordHash,
        "email": props.email,
        "type": 'Admin',
        "created_at": new Date().getTime(),
    };

    const response = await docClient.put({
        TableName: "UsersTable",
        Item: UserItem,
        ConditionExpression: 'attribute_not_exists(email)'
    }).promise();

    delete UserItem.password;
    delete UserItem.type;

    return UserItem;
};

const getUserByEmail = async email => {
    const params = {
        TableName: 'UsersTable',
        Key: {
            "email": email,
        }
    };

    return await docClient.get(params).promise();
};

const getUser = async props => {
    const params = {
        // Get the table name from the environment variable
        TableName: 'UsersTable',
        KeyConditionExpression: "#pk = :pkValue",
        ExpressionAttributeNames: {
            "#pk": "email",
        },
        ExpressionAttributeValues: {
            ":pkValue": email,
        },
        // FilterExpression : '#password= :passwordValue',
        // ExpressionAttributeNames : {
        //     '#password' : 'password'
        // },
        ScanIndexForward: true,
    };

    return await docClient.scan(params).promise();
};

module.exports = {
    createUser,
    createAdmin,
    getUser,
    getUserByEmail
};
