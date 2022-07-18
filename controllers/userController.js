const user = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      gender,
    } = req.body;

    const newUser = await user.create({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      gender,
    });

    res.status("200").json({
      message: "created successfully",
      status: 200,
      data: newUser,
    });
  } catch (err) {
    res.send("Error Occured", err);
  }
};
module.exports = {
  registerUser,
};
