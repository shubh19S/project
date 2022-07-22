const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const userValidation = require("./../validations/userValidation");

const validate = require("./../middleware/validate");

router
  .route("/")
  .post(validate(userValidation.registerUser), userController.registerUser);
//.get(userController.getUser)
//.delete(userController.deleteUser)

router.route("/login").post(userController.loginUser);


router.route("/forgotPassword").post(userController.forgotPassword);

router
  .route("/profile/:id")
  .get(auth,userController.getProfile)
  .patch(auth,validate(userValidation.updateUser) ,userController.updateProfile)
  .delete(auth,userController.deleteProfile);

router
     .route('/change-password')  
     .patch(auth,validate(userValidation.changePassword),userController.changePassword)


module.exports = router;
