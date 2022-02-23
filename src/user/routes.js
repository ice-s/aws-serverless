const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const routes = express.Router({
    mergeParams: true
});

let User = require("../models/UserModel");

routes.get("/", (req, res) => {
    const dynamoDbClient = User.getClient();
    const params = {
        // Get the table name from the environment variable
        TableName: 'UsersTable',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": "8e12a970-9094-11ec-b175-812b41eda861",
        },
    };

    dynamoDbClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(200).json({
                'status': 201,
                'message': err,
            });
        } else {
            res.status(200).json({
                'status': 200,
                'message': 'user list',
                'users': data.Items
            });
        }
    });

});

routes.post("/create", (req, res) => {
    let UserItem = {
        "id": uuid.v1(), // Parsed from request body
        "username": uuid.v1(), // Parsed from request body
        "password": bcrypt.hashSync('123456a@', 5), // Parsed from request body
        "email": uuid.v1() + '@gmail.com', // Parsed from request body
        "created_at": new Date().getTime(), // Parsed from request body
    };

    console.log(UserItem);
    User.create(UserItem, (err, userResult) => {
        console.log(err);
        if (err) {
            return res.status(200).json({
                'status': 201,
                'message': err,
            });
        }

        return res.status(200).json({
            'status': 200,
            'message': 'create successfully',
            'user': userResult
        });
    });
});

module.exports = {
    routes
};