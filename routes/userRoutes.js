const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const userValidation = require('./../validations/userValidation')

const validate = require("./../middleware/validate")


router
  .route('/')
  .post( userController.registerUser)
  // .get(userController.getUser)
  // .delete(userController.deleteUser)
  
router.route('/login').post(userController.loginUser)

router.route('/all').get(auth,(req,res)=>{
  res.json("Working")
})
// router.route('/test').post((req,res,next)=>{
//   const Joi = require('joi')
//   const data =req.body 
//   const schema =Joi.object().keys({
//     email:Joi.string().email().required(),
//     phone:Joi.string().required(),
//     birthday:Joi.date().max('1-1-2004').iso()

//   })
//   const Validation = schema.validate(req.body);

//   if(Validation.error){
//     res.json(Validation.error.details[0].message)
//    }else{
//     next()
//    }
  
// },(req,res)=>{
//   res.json('Working')
// })

router.route('/test').post(validate(userValidation.test.body),(req,res)=>{
  res.json('Working')
})



  module.exports = router