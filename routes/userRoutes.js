const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
//const validate = require('./../validations/userValidation')




router
  .route('/')
  .post(userController.registerUser)
  // .get(userController.getUser)
  // .delete(userController.deleteUser)
  
router.route('/login').post(userController.loginUser)

router.route('/all').get(auth,(req,res)=>{
  res.json("Working")
})




  module.exports = router