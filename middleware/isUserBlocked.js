const userService = require('../services/userService')

const isUserBlocked = async( req , res, next )=>{
    try {
      
        const {email } = req.email
        const user = userService.findByEmail(email)
        const result = await UserBlockList.findOne({where:{
            userId:user.id
        }})
        const date = new Date()
        if(date.getTime()<result.blockedTill.getTime()){
          return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
        }
        next()
    } catch (err) {
      return res.status(500).sendResponse(err.message)
    }
}
module.exports = isUserBlocked;