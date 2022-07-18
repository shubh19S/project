const router = require('express').router()
const userController = require('../controllers/userController')
router
  .route('/')
  .post(userController.registerUser)


  module.exports = router