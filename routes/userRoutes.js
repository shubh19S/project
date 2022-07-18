const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validate = require('./../validations/userValidation')




router
  .route('/')
  .post(userController.registerUser)
  // .get(userController.getUser)
  // .delete(userController.deleteUser)
  
router.route('/login').post(userController.loginUser)

  module.exports = router