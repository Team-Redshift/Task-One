const httpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const data = require('../fakes/data')();

const signature = 'L33T_K0D3';

const login = (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} and ${password}`);
    let data = null;
    const user = findUser(username);
    if (user && password === user.password) {
        data = {
            token: generateToken(),
            user: username,
            message: `User ${username} logged in successfully.`,
            status: httpStatus.OK
        }
        return res.status(httpStatus.OK).json(data);
    } else {
        data = {
            message: 'login failed. check email and password',
            status: httpStatus.UNAUTHORIZED
        }
        return res.status(httpStatus.UNAUTHORIZED).json(data);
    }
};

const signup = (req, res) => {
   res.send('Hello'); 
}

const generateToken = (username) => {
    const token = jwt.sign({
        userEmail: username,
    },
        signature, { expiresIn: '1d' }
    );
    return token;
}

const verifyToken = (token) => jwt.verify(token, signature);

const findUser = (username) => data.users.find(x => x.username === username);

module.exports = { login, signup };
