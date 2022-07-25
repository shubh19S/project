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
//.delete(userController.deleteUser)

router.route("/login").post(userController.loginUser);
router
  .route("/profile/:id")
  .get(auth,userController.getProfile)
  .patch(auth,validate(userValidation.updateUser) ,userController.updateProfile)
  .delete(auth,userController.deleteProfile);

router
     .route('/change-password')  
     .patch(auth,validate(userValidation.changePassword),userController.changePassword)

router.route("/all").get(auth, (req, res) => {
  res.json("Working");
});

router.route("/test").post(auth, validate(userValidation.test), (req, res) => {
  res.json("Working");
});

module.exports = router;
