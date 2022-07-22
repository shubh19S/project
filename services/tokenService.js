const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require("dotenv");
dotenv.config;


const  generateJWT = async(userId) => {

    const secret = process.env.SECRET_KEY;

    const payload = {
        sub : userId
    };

    return await jwtSignAsync(payload, secret, { expiresIn: process.env.JWT_EXPIRATION})
};

const verifyToken = async(token) => {

    const secret = process.env.SECRET_KEY;

    const payload = await jwtVerifyAsync(token,secret)

    return payload
}



/**
 * Asynchronously verify given token using a secret or a public key to get a decoded token
 * token - JWT string to verify
 * secretOrPublicKey - A string or buffer containing either the secret for HMAC algorithms,
 * or the PEM encoded public key for RSA and ECDSA. If jwt.verify is called asynchronous,
 * secretOrPublicKey can be a function that should fetch the secret or public key
 * [options] - Options for the verification
 * callback - Callback to get the decoded token on
 */
function jwtVerifyAsync(token,secretKey){
    return new Promise((resolve,reject) => { 
         jwt.verify( token, secret, (err, decoded) => {
            if(err){
                reject(err);
            }else{
                resolve(decoded);
            }
        })
    })
}

function jwtSignAsync(payload,secret,options){
    return new Promise((resolve,reject) => {
        jwt.sign(payload, secret, options,(err,encoded) => {
              if(err){
                reject(err)
              }else{
                resolve(encoded)
              }
        })
    })
}

module.exports = {
    generateJWT,
    verifyToken
}