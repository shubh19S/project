const Joi = require('joi')


const registerUser = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Others').required()
  }),
};
const updateUser = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    gender: Joi.string().valid('Male', 'Female', 'Others')
  }),
};

const changePassword = {
   body : Joi.object().keys({
    currentPassword : Joi.string().required(),
    password : Joi.string().required().not(Joi.ref('currentPassword'))
    .messages({'any.invalid':'Old password and new password cannot be same'})
   })
  }

const login = {
  body : Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    })
}

const forgotPassword = {
  body : Joi.object().keys({
    email: Joi.string().required().email(),
    })
}

const resetPassword = {
  body : Joi.object().keys({
    email: Joi.string().required().email(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required()
    })
}


module.exports = {
    registerUser,
    updateUser,
    changePassword,
    login,
    forgotPassword,
    resetPassword
}