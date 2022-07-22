const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require("dotenv");
dotenv.config;


const  generateJWT = async(userId) => {

 

    const secret = process.env.SECRET_KEY;

    const payload = {
        sub : userId
    };

    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRATION})
  
};

const verifyToken = async(token) => {

    const secret = process.env.SECRET_KEY;

    const payload = jwt.verify(token,secret)

    return payload
}

module.exports = {
    generateJWT,
    verifyToken
}