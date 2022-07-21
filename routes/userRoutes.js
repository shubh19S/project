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
router
  .route("/profile/:id")
  .get(userController.getProfile)
  .patch(userController.updateProfile)
  .delete(userController.deleteProfile);
router.route("/all").get(auth, (req, res) => {
  res.json("Working");
});

router.route("/test").post(auth, validate(userValidation.test), (req, res) => {
  res.json("Working");
});

module.exports = router;
