const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require("dotenv");
dotenv.config;


const  generateJWT = (userId) => {

    const secret = process.env.SECRET_KEY;

    const payload = {
        sub : userId
    };
    console.log("aa gya yaha tk",payload)

    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRATION})
    // return jwt.sign(payload, secret);
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