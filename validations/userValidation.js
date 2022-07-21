const Joi = require('joi')


// const registerUser = {
//   body: Joi.object().keys({

//     userName: Joi.string().required(),
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//     phoneNumber: Joi.string().required(),
//     gender: Joi.string().valid('Male', 'Female', 'Others').required()
//   }),
// };

const test = {
  body: Joi.object().keys({
    email:Joi.string().email().required(),
    phone:Joi.string().required(),
    birthday:Joi.date().max('1-1-2004').iso()
  }),
};




module.exports = {
    // registerUser,
    test
}