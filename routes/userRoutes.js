const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const userValidation = require("./../validations/userValidation");

const validate = require("./../middleware/validate");
const { regsiterAccountSlowDownRateLimiter } = require('../middleware/ratelimiter')

const NODE_ENV = process.env.NODE_ENV || 'development';

router
  .use( regsiterAccountSlowDownRateLimiter( NODE_ENV === 'production') )
  .route("/")
  .post(validate(userValidation.registerUser), userController.registerUser);
//.get(userController.getUser)

router.route("/login").post(validate(userValidation.login),userController.loginUser);
router.route("/forgotPassword").post(validate(userValidation.forgotPassword),userController.forgotPassword);
router.route("/resetPassword").post(validate(userValidation.resetPassword),userController.resetPassword);

router
  .route("/profile/:id")
  .get(auth,userController.getProfile)
  .patch(auth,validate(userValidation.updateUser) ,userController.updateProfile)
  .delete(auth,userController.deleteProfile);

router
     .route('/change-password')  
     .patch(auth,validate(userValidation.changePassword),userController.changePassword)


module.exports = router;
