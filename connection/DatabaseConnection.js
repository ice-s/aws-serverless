// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_APP_REGION,
});

const dynamoDbClientParams = {};
dynamoDbClientParams.region = process.env.AWS_APP_REGION;
dynamoDbClientParams.endpoint = process.env.AWS_DB_ENDPOINT;

const docClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

module.exports = {
    docClient
};
