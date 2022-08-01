const Op = require('sequelize').Op
const db = require('../models/index')
const { addMinutes } = require('../utils')
const { ipToLocation } = require('../services/ipService')
const UserBlockList = db.userBlockList
const LoginFailedAttempts = db.loginFailedAttempts
const blockUser = async (userId) => {
  try {
    const time = addMinutes.currentDate(1440)

    const blockedUser = await UserBlockList.findOne({
      where: {
        userId,
      },
    })

    const result = await UserBlockList.upsert({
      id: blockedUser?.id,
      userId,
      blockedTill: time,
    })

    return result[0]
  } catch (err) {
    return err
  }
}
async function insertFailedAttempt(userId, ip,) {
  try {
    // minutes in 24 hours = 1440
    const time = addMinutes.previousDate(1440)
    const count = await LoginFailedAttempts.count({
      where: {
        userId,
        createdAt: {
          [Op.gt]: time,
        },
      },
    })
    if (count >= 10) {
      const date = new Date()
      const result = await UserBlockList.findOne({
        where: {
          userId,
        },
      })

      if (!result) {
        const blockedUser = await blockUser(userId)
        let message = `You have been locked for 24 hours till ${blockedUser.dataValues.blockedTill}`
        //return res.status(403).sendResponse(`You have been locked for 24 hours till ${blockedUser.dataValues.blockedTill}`)
        return message
      }
      if (date.getTime() > result.blockedTill.getTime()) {
        blockUser(userId)
        let message = `you can use the service from ${result.blockedTill}`
        // return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
        return message
      }
      if (date.getTime() < result.blockedTill.getTime()) {
        //return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
        let message = `you can use the service from ${result.blockedTill}`
        return message
      }
    }
    const point = await ipToLocation( ip )
    const result1 = await LoginFailedAttempts.create({
      userId,
      ip,
      origin : point
    })
    let message = `invalid Username or password`
    return message
  } catch (err) {
    return err.message
  }
}
module.exports = insertFailedAttempt
