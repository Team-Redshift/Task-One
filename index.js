const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { login, signup, fetchUser } = require("./controllers/userController");
const port = 3000;

const root = "/api/v1";
const apiCalls = {
  login: `${root}/login`,
  signup: `${root}/signup`,
  fetchUser: `${root}/fetchUser`
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.post(apiCalls.login, login);
app.post(apiCalls.signup, signup);
app.post(apiCalls.fetchUser, fetchUser);

app.listen(port, () => console.log(`Web service started on port ${port}...`));
module.exports = { app, apiCalls };
