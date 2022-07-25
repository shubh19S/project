const Joi = require("joi");

// console.log(userValidation.registerUser)
const validate = (validateSchema) => {
  const schema = validateSchema.body;

  return (req, res, next) => {
    const Validation = schema.validate(req.body);

    if (Validation.error) {
      // res.json(Validation.error.details[0].message);
      res.status(400).json({
        message: "error",
        status: 400,
        data: Validation.error.details[0].message
      })
    } else {
      next();
    }
  };
};

module.exports = validate;
