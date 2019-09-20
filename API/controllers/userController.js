const httpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const data = require("../fakes/data")();

const signature = "L33T_K0D3";

const login = (req, res) => {
  const { username, password } = req.body;
  let data = null;
  console.log("hey", username, password);
  const user = findUser(username);
  if (user && password === user.password) {
    data = {
      token: user.token || generateToken(user),
      user: username,
      message: `User ${username} logged in successfully.`,
      status: httpStatus.OK
    };
    return res.status(httpStatus.OK).json(data);
  } else {
    data = {
      message: "login failed. check username and password",
      status: httpStatus.UNAUTHORIZED
    };
    return res.status(httpStatus.UNAUTHORIZED).json(data);
  }
};

const signup = (req, res) => {
  const { name, username, password } = req.body;
  const id = data.users.length;
  const user = { id, name, username, password };
  let results = {};
  if (name && username && password && !findUser(user.username)) {
    insertNewUser(user);
    results = {
      user: username,
      message: `User ${username} created successfully.`,
      status: httpStatus.OK,
      token: generateToken(user)
    };
    return res.status(httpStatus.OK).json(results);
  } else {
    results = {
      message: `Failure: Could not create new user`,
      status: httpStatus.UNAUTHORIZED
    };
    return res.status(httpStatus.UNAUTHORIZED).json(results);
  }
};

const generateToken = user => {
  const token = jwt.sign(
    {
      id: user.id,
      userEmail: user.username
    },
    signature,
    { expiresIn: "1d" }
  );
  return token;
};

const verifyToken = token => jwt.verify(token, signature);

const insertNewUser = user => {
  data.users.push(user);
};

const findUser = username => data.users.find(x => x.username === username);

module.exports = { login, signup };
