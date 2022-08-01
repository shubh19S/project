const userService = require('../services/userService')
const db = require('../models/index')
const UserBlockList = db.userBlockList
const isUserBlocked = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await userService.findByEmail(email)
    console.log(user)
    const result = await UserBlockList.findOne({
      where: {
        userId: user.id,
      },
    })
    const date = new Date()
    if (result && date.getTime() < result.blockedTill.getTime()) {
      return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
    }
    next()
  } catch (err) {
    return res.status(500).sendResponse(err.message)
  }
}
module.exports = isUserBlocked
