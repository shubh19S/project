const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require("dotenv");
dotenv.config;


const  generateJWT = async(userId) => {

    const secret = process.env.SECRET_KEY;

    const payload = {
        sub : userId
    };

    return  await jwtSignAsync(payload, secret, { expiresIn: process.env.JWT_EXPIRATION})
    // return jwt.sign(payload, secret);
};

const verifyToken = async(token) => {

    const secret = process.env.SECRET_KEY;

    const payload = await jwtVerifyAsync(token,secret)

    return payload
}


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