const db = require("../models/index");
const bcrypt = require("bcryptjs")

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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password:hashedPassword,
      gender,
    });

    res.status(200).json({
      message: "created successfully",
      status: 200,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json(err.errors[0].message) 
  }
};
const loginUser = async (req, res) => {
  try {
    const {
      userName,
      password
     
    } = req.body;

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.findOne({where:{userName}})
    if(user && (await bcrypt.compare(password,user.password))){

      res.status(200).json({
        message: "created successfully",
        status: 200,
        data: user,
      });
    } else{
      res.status(401).json({
        message: "Please enter correct username or password",
        status: 401,
        data: null
      })
    }

  
  } catch (err) {

    res.status(400).json(err) 

  }
};
module.exports = {
  registerUser,
  loginUser,
};
