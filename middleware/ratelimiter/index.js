const authRateLimiter =require('./authRateLimiter')
const apiRateLimiter  = require('./apiRateLimiter')

module.exports = {
    ...authRateLimiter,
    ...apiRateLimiter
}