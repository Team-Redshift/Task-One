const express = require('express');
const bodyParser = require('body-parser');
const { login, signup } = require('./controllers/userController');
const port = 3000;

const root = '/api/v1';
const apiCalls = {
    login: `${root}/login`,
    signup: `${root}/signup`
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(apiCalls.login, login);
app.post(apiCalls.signup, signup);

app.listen(port, () => console.log(`Web service started on port ${port}...`));
module.exports = { app, apiCalls };