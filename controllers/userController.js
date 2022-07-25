const db = require("../models/index");
const bcrypt = require("bcryptjs");
const tokenService = require("./../services/tokenService");
const {hashUtil,otpGenerator,addMinutes} = require('../utils'); 
const nodemailer = require('nodemailer')

const User = db.user;
const Otp = db.otp

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

    const hashedPassword = await hashUtil.generateHash(password, 10);

    const newUser = await User.create({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      gender,
    });

    const token = await tokenService.generateJWT(newUser.id);

    const sanitizeUser = {...newUser.dataValues}
    delete sanitizeUser.password

    res.status(200).json({
      message: "created successfully",
      status: 200,
      data: sanitizeUser,
      token,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });

    if (user && (await hashUtil.compareHash(password, user.password))) {
      const token = await tokenService.generateJWT(user.Id);

      res.status(200).json({
        message: "Login successfully",
        status: 200,
        data: user,
        token,
      });
    } else {
      res.status(401).json({
        message: "Please enter correct username or password",
        status: 401,
        data: null,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;

    if(id!=req.user.id){
      res.status(401).json({
        message: "Error",
        status: 401,
        data: "Unauthorized",
      }); 
    }
  if(id==req.user.id){
    const user = await User.findOne({ where: { id } });
    res.status(200).json({
      message: "Success",
      status: 200,
      data: user,
    });
  }
 
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;

  if(id!=req.user.id){
    res.status(401).json({
      message: "Error",
      status: 401,
      data: "Unauthorized",
    }); 
  }
  if(id==req.user.id){
  const user = await User.findOne({ where: { id } });

  if (!user) {
    const result = "User not found";
    res.status(404).json({
      message: "Error",
      status: 404,
      data: result,
    });
  }
  if (user) {
    const { firstName, lastName, phoneNumber, gender } = req.body;

    const result = await User.update(
      {
        firstName,
        lastName,
        phoneNumber,
        gender,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: "Success",
      status: 200,
      data: result,
    });
    }
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if(id!=req.user.id){
      res.status(401).json({
        message: "Error",
        status: 401,
        data: "Unauthorized",
      }); 
    }
    if(id==req.user.id){
    const user = await User.findOne({ where: { id } });
    


    if (!user) {
      const result = "User not found";
      res.status(404).json({
        message: "Error",
        status: 404,
        data: result,
      });
    }
    if (user) {
      const result = await User.destroy({ where: { id } });
      res.status(200).json({
        message: "Success",
        status: 200,
        data: result,
      });
    }
  }
  } catch (err) {
    res.status(400).json(err);
  }
  
};
const generateOtp = async (req,res)=>{
  const {email } = req.body 
  const user = await User.findOne({ where: { email } });
  if(!user ){
    res.status(404).json({
      message: "Please enter a valid Email Id",
      status: 404,
      data: null,
    });
  }
  if(user){
    console.log(user.id)
    const otp = otpGenerator.generateOtp()
    const expireAt= addMinutes.currentDate(10)
    const newOtp = await Otp.create({
      userId:user.id,
      otp,
      expireAt

    });
    res.json(newOtp)

    // const transporter = nodemailer.createTransport({
    //   host:'gmail',
    //   port:465,
    //   secure:true,
    // })


  }


}
const resetPassword =async (req,res)=>{
  
}
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  generateOtp
};
