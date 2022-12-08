require('dotenv').config();
const Jwt = require('jsonwebtoken');
const serectKey = process.env.SERECTKEY;

const createToken = (data) => {
    return Jwt.sign(data, serectKey)
};

module.exports = { 
    createToken 
};