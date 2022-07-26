const rateLimiter = require('express-rate-limit')

const  API_WINDOWS_MS = 1 * 60 * 60 * 1000 // 1 hour in milisecounds
const  API_MAX_REQUESTS = 200

const apiRateLimiter = rateLimiter({
    windowMs: API_WINDOWS_MS,
    max: API_MAX_REQUESTS,
    skipSuccessfulRequests: true,
    standardHeaders: true,
	legacyHeaders: false,
})

module.exports = {
    apiRateLimiter
}