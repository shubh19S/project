const Op= require('sequelize').Op;
const db = require("../models/index");
const {addMinutes} = require("../utils")
const UserBlockList = db.userBlockList
const LoginFailedAttempts = db.loginFailedAttempts

const isBlocked = async (req,res)=>{
    try {
    const time = addMinutes.currentDate(1440)
    const userId = 10
    const blockedUser = await UserBlockList.findOne({where:{
        userId
    }})

    const result = await UserBlockList.upsert({
        id:blockedUser?.id,
        userId,
        blockedTill:time
    })
   
    res.send(result)
    } catch (err) {
      return res.status(500).sendResponse(err.message)
    }
}
const blockUser= async (userId)=>{
    try {
    const time = addMinutes.currentDate(1440)
  
    const blockedUser = await UserBlockList.findOne({where:{
        userId
    }})

    const result = await UserBlockList.upsert({
        id:blockedUser?.id,
        userId,
        blockedTill:time
    })
   
   return result[0]
    } catch (err) {
      return err
    }
}
const checkBlock = async(req,res)=>{
    try {
        // const user_id = req.params.id

        const result = await UserBlockList.findOne({where:{
            userId:1
        }})
        const date = new Date()
        if(date.getTime()<result.blockedTill.getTime()){
          return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
        }else{
          console.log(false)
        }
        res.json(result)
    } catch (err) {
      return res.status(500).sendResponse(err.message)
    }
}
const checkTime = async(userId)=>{
    try {
        // const user_id = req.params.id

        const result = await UserBlockList.findOne({where:{
            userId:5
        }})
        const date = new Date()
        if(date.getTime()<result.blockedTill.getTime()){
          return result.blockedTill
        }else{
         return false
        }
        res.json(result)
    } catch (err) {
      return err
    }
}

const insertFailedAttempt = async(req,res)=>{
    try {
        const userId = 15
        // minutes in 24 hours = 1440 
        const time = addMinutes.previousDate(1440)
        const count = await LoginFailedAttempts.count({
            where:{
                userId,
                createdAt:{
                    [Op.gt]:time
                }
            }
        })    
        if(count>=10){
            const date = new Date()
            const result = await UserBlockList.findOne({where:{
                userId
            }})
            
            if(!result){
               const blockedUser=  await blockUser(userId)
               console.log(blockedUser)
                return res.status(403).sendResponse(`You have been locked for 24 hours till ${blockedUser.dataValues.blockedTill}`) 
            }
            if(date.getTime()>result.blockedTill.getTime()){
                blockUser(userId)
                return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
              }
            if(date.getTime()<result.blockedTill.getTime()){

                return res.status(403).sendResponse(`you can use the service from ${result.blockedTill}`)
              }
            //   else{
            //     blockUser(userId)
            //     return res.status(403).sendResponse("You have been locked for 24 hours")
            //   }


        }
        
        const ip = req.ip
        const result1 = await LoginFailedAttempts.create({
            userId,
            ip
        })
        return res.json(result1)
    } catch (err) {
        return res.status(500).sendResponse(err.message)
    }
}
module.exports  = {
    isBlocked,
    checkBlock,
    insertFailedAttempt
}