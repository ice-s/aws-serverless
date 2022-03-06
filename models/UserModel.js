let AWS = require('aws-sdk');
let BaseModel = require('./BaseModel');

class User extends BaseModel{
    constructor() {
        super();
        this.tableName = 'UsersTable';
        this.primaryKey = 'id';
    }
}

module.exports = new User();