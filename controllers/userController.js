const db = require("../models/index");
const bcrypt = require("bcryptjs");
const tokenService = require("./../services/tokenService");
const { hashUtil, otpGenerator, addMinutes } = require('../utils') 

const User = db.user;
const OTP = db.otp;

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

    res.status(200).json({
      message: "created successfully",
      status: 200,
      data: newUser,
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
      const token = await tokenService.generateJWT(user.id);

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

const forgotPassword = async(req,res) => {
  try {
    const { email } = req.body
  const user = await User.findOne({where: {
    email
  }})

  if (!user) {
    res.status(404).json({
      message: "User not found with this email",
      status: 404,
      data: null,
    });
  }

  const userId = user.id
  const otp =  otpGenerator.generateOtp()
  const expireTime = addMinutes.currentDate(10)

  const previousOTP = await OTP.findOne( { userId : userId })
  const userOTP = await OTP.upsert({ id : previousOTP?.id,userId, otp, expireAt: expireTime })

  // send response with OTP
  res.status(200).json({
    message: "Success",
    status: 200,
    data: userOTP,
  });
  } catch (error) {
    res.status(400).json({
      message: "error",
      status: 400,
      data: error.message,
    })
  }
}



const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword , email } = req.body

  const user = await User.findOne({
      where : { email } ,
      include: [{ model: OTP, as: "otp" }] 
  })

  if (!user) {
   return res.status(404).json({ 
    message: `User not found with this email `,
    statusCode : this.statusCode
   })
  }

  if(!user.otp || !user.otp.otp){
    return res.status(404).json({ 
      message: 'Resend OTP',
      statusCode : res.statusCode
    })
  }

 if( user.otp.expireAt.getTime() < new Date().getTime()){
  return res.status(404).json({ 
    message: `Otp has been expired please resend OTP`,
    statusCode : this.statusCode
   })
 }

 if(otp !== user.otp.otp){
  return res.status(404).json({ 
    message: 'Invalid',
    statusCode : this.statusCode
   })

 }

  //update password
  const hashedPassword = await hashUtil.generateHash(newPassword)
  const updatedUser =  await User.update(
    {password: hashedPassword},
    {where: { id : user.id }}
  )

  res.status(200).json({
    message: "Password updated successfully",
    status: 200,
    data: updatedUser,
  })
  } catch (error) {
    res.status(400).json({
      message: "error",
      status: 400,
      data: error.message,
    })
  }
}



const changePassword = async (req,res)=>{
  try{
  
  const { id : userId } = req.user
  
  const {currentPassword , password } = req.body
  
  const user = await User.findByPk(userId)
  
  if(!await hashUtil.compareHash(currentPassword,user.password)){
  
  return res.status(400).json({
      message : 'Old password does not matched',
      statusCode : res.statusCode,
    })
  }
  
  const hashedPassword = await hashUtil.generateHash(password)
  const updatedUser =  await user.update( { password : hashedPassword })
  
  if(!updatedUser){
    return res.status(400).json({
      message : 'Provide valid details',
      statusCode : res.statusCode,
    })
  }
  
  return res.status(200).json({
    message : 'Password changed',
    statusCode : res.statusCode,
  })
  
  }catch(err){
    return res.status(500).json({
      message : 'Something went wrong',
      statusCode : res.statusCode
    })
  }
  }

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  forgotPassword,
  changePassword,
  resetPassword
};
