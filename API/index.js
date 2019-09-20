const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { login, signup } = require('./controllers/userController');
const port = 3000;

const root = '/api/v1';
const apiCalls = {
    login: `${root}/login`,
    signup: `${root}/signup`
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post(apiCalls.login, login);
app.post(apiCalls.signup, signup);
app.post('/test/', (req, res) => {
    console.log("called");
    res.send({status: 'OK'});
});

app.listen(port, () => console.log(`Web service started on port ${port}...`));
module.exports = { app, apiCalls };