
const db = require("../models/index");

const User = db.user


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


    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      gender,
    });

    res.status(200).json({
      message: "created successfully",
      status: 200,
      data: newUser,
    });
  } catch (errors) {
    // res.send("Error Occured", err);
    console.log("error",errors)
    res.status(400).send(errors.message) 
  }
};
module.exports = {
  registerUser,
};
