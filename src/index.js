const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    routes: userRouters,
} = require('./user/routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouters);

module.exports = app;