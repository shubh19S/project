const db = require("../models/index");
const bcrypt = require("bcryptjs")
const tokenService = require('./../services/tokenService')

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

    const hashedPassword = await bcrypt.hash(password,10)


    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password:hashedPassword,
      gender,
    });

    const token = await tokenService.generateJWT(newUser.id)

    res.status(200).json({
      message: "created successfully",
      status: 200,
      data: newUser,
      token
    });
  } catch (err) {
    res.status(400).json(err) 
  }


};
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    

    const user = await User.findOne({where:{userName}})
    
    if(user && (await bcrypt.compare(password,user.password))){

    const token = await tokenService.generateJWT(userId)

    res.status(200).json({
        message: "Login successfully",
        status: 200,
        data: user,
        token
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
