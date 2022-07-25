const rateLimiter = require('express-rate-limit')
const slowDown = require("express-slow-down");


const  AUTH_WINDOWS_MS = 15 * 60 * 1000 // 15 minutes in milisecounds
const  AUTH_MAX_REQUESTS = 20

const authRateLimiter = rateLimiter({
    windowMs: AUTH_WINDOWS_MS,
    max: AUTH_MAX_REQUESTS,
    skipSuccessfulRequests: true,
    standardHeaders: true,
	legacyHeaders: false,
})


/*
* Slow down the API response after REGISTER_ACCOUNT_SLOW_DOWN_AFTER  limit reached.
*/
const  REGISTER_ACCOUNT_WINDOWS_MS = 15 * 60 * 1000 // 15 minutes in milisecounds
const  REGISTER_ACCOUNT_SLOW_DOWN_AFTER = 10

const regsiterAccountSlowDownRateLimiter = (isEnable = true) => isEnable ? slowDown({
    windowMs: REGISTER_ACCOUNT_WINDOWS_MS,
    delayAfter: REGISTER_ACCOUNT_SLOW_DOWN_AFTER, // allow 10 requests per 15 minutes, then...
    delayMs: 2000 // begin adding 2000ms of delay per request above 10:
}) : (req,res,next ) => next()

module.exports = {
    authRateLimiter,
    regsiterAccountSlowDownRateLimiter
}