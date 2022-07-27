const db = require("../models/index");
const bcrypt = require("bcryptjs");
const tokenService = require("./../services/tokenService");
const {hashUtil,otpGenerator,addMinutes,sendEmail} = require('../utils'); 

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

    res.status(200).sendResponse("created successfully",{ user : newUser, token }  );

  } catch (err) {
    res.status(400).json(err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await hashUtil.compareHash(password, user.password))) {
      const token = await tokenService.generateJWT(user.id);
      res.status(200).sendResponse("Login successfully", { user, token });
    } else {
      res.status(401).sendResponse("Please enter correct email or password");
    }
  } catch (err) {
    res.status(400).sendResponse(null, err);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;

    if(id!=req.user.id){
      res.status(401).sendResponse("Error", "Unauthorized",); 
    }
  if(id==req.user.id){
    const user = await User.findOne({ where: { id } });
    res.status(200).sendResponse("Success",{ user },);
  }
  } catch (err) {
    res.status(400).sendResponse(null,err);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;

  if(id!=req.user.id){
    res.status(401).sendResponse("Error","Unauthorized",); 
  }
  if(id==req.user.id){
  const user = await User.findOne({ where: { id } });

    if (!user) {
      const result = "User not found";
    res.status(404).sendResponse("Error",  result,);
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
      res.status(200).sendResponse("Success", result);
    }
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (id != req.user.id) {
      res.status(401).sendResponse("Error", "Unauthorized");
    }
    if (id == req.user.id) {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        const result = "User not found";
        res.status(404).sendResponse("Error", result);
      }
      if (user) {
        const result = await User.destroy({ where: { id } });
        res.status(200).sendResponse("Success", result);
      }
    }
  } catch (err) {
    res.status(400).sendResponse(null, err);
  }
};
// const generateOtp = async (req,res)=>{
//   try {
//     const {email } = req.body
//   if(!email){
//     res.status(404).json({
//       message: "Please enter a valid Email Id",
//       status: 404,
//       data: null,
//     });
//   }
//   if(email){
//   const user = await User.findOne({ where: { email } });





const forgotPassword = async(req,res) => {
  try {
  
    const { email } = req.body
  const user = await User.findOne({where: {
    email
  }})

  if (!user) {
    return res.status(404).sendResponse("User not found with this email",);
  }

  const userId = user.id
  const otp =  otpGenerator.generateOtp()
  const expireTime = addMinutes.currentDate(10)

  const previousOTP = await OTP.findOne( { userId : userId })
  const userOTP = await OTP.upsert({ id : previousOTP?.id,userId, otp, expireAt: expireTime })

  // send response with OTP
  res.status(200).sendResponse("Success",userOTP,);
  } catch (error) {
    res.status(400).sendResponse("error",error.message,)
  }
};

const resetPassword = async (req, res) => {
  try {
    
  const { otp, newPassword , email } = req.body

  const user = await User.findOne({
      where : { email } ,
      include: [{ model: OTP, as: "otp" }] 
  })

  if (!user) {
   return res.status(404).sendResponse(`User not found with this email `,)
  }

  if(!user.otp || !user.otp.otp){
    return res.status(404).sendResponse('Resend OTP',)
  }

 if( user.otp.expireAt.getTime() < new Date().getTime()){
  return res.status(404).sendResponse(`Otp has been expired please resend OTP`,)
 }

 if(otp !== user.otp.otp){
  return res.status(404).sendResponse('Invalid',)

 }

  //update password
  const hashedPassword = await hashUtil.generateHash(newPassword)
  const updatedUser =  await user.update(
    {password: hashedPassword},
    {where: { id : user.id }}
  )

    user.otp.destroy();
    res.status(200).sendResponse("Password updated successfully", updatedUser);
  } catch (error) {
    res.status(400).sendResponse("error", error.message);
  }
};

const changePassword = async (req,res) => {
try{
  
  const { id : userId } = req.user
  
  const {currentPassword , password } = req.body
  
  const user = await User.findByPk(userId)
  
  if(!await hashUtil.compareHash(currentPassword,user.password)){
    return res.status(400).sendResponse('Old password does not matched',)
  }
  
  const hashedPassword = await hashUtil.generateHash(password)
  const updatedUser =  await user.update( { password : hashedPassword })
  
  if(!updatedUser){
    return res.status(400).sendResponse('Provide valid details',)
  }
  
  return res.status(200).sendResponse('Password changed',)
  
  }catch(err){
    return res.status(500).sendResponse('Something went wrong',)
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
