const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validate = require('./../validations/userValidation')




router
  .route('/')
  .post(userController.registerUser)


  module.exports = router