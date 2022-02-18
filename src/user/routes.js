const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();

const routes = express.Router({
   mergeParams: true
});
var AWS = require('aws-sdk');

routes.get("/", (req, res) => {
    const dynamoDbClientParams = {};
    dynamoDbClientParams.region = process.env.REGION;
    dynamoDbClientParams.endpoint = process.env.DB_ENDPOINT;
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
    const params = {
        // Get the table name from the environment variable
        TableName: 'UsersTable',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": "7c1059f0-8fe2-11ec-9bb5-a5d229186a17",
        },
    };

    let results  = dynamoDbClient.query(params);

    res.status(200).json({
        'status': 200,
        'message': 'user list',
        'db': dynamoDbClientParams,
        'users': results.Item
    });

});

routes.post("/create", (req, res) => {
    const dynamoDbClientParams = {};
    dynamoDbClientParams.region = process.env.REGION;
    dynamoDbClientParams.endpoint = process.env.DB_ENDPOINT;
    console.log(dynamoDbClientParams);
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
    const params = {
        // Get the table name from the environment variable
        TableName: 'UsersTable',
        Item: {
            "id": uuid.v1(), // Parsed from request body
            "username": uuid.v1(), // Parsed from request body
            "password": bcrypt.hashSync('123456a@', 5), // Parsed from request body
            "email": uuid.v1() + '@gmail.com', // Parsed from request body
            "created_at": new Date().getTime(), // Parsed from request body
        },
    };

    dynamoDbClient.put(params,function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(200).json({
                'status': 201,
                'message': err,
            });
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));

            res.status(200).json({
                'status': 200,
                'message': 'create success',
                'user': data
            });
        }
    });

});

module.exports = {
    routes
};