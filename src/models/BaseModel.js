let AWS = require('aws-sdk');

module.exports = class BaseModel {
    constructor() {
        this.tableName = '';
        this.primaryKey = '';
        const dynamoDbClientParams = {};
        dynamoDbClientParams.region = process.env.AWS_APP_REGION;
        dynamoDbClientParams.endpoint = process.env.AWS_DB_ENDPOINT;
        console.log(dynamoDbClientParams);
        this.dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
    }

    getClient() {
        return this.dynamoDbClient;
    }

    find(id, callback) {

    }

    query(params, callback) {
        return this.dynamoDbClient.query(params, callback);
    }

    create(item, callback) {
        let params = {
            TableName: this.tableName,
            Item: item,
        };

        return this.dynamoDbClient.put(params, callback);
    }

    update(item, callback) {

    }

    delete(id, callback) {

    }
};