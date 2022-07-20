const Joi = require('joi')



// console.log(userValidation.registerUser)
const validate = (schema) =>{
    return (req,res,next)=>{
    
        const Validation = schema.validate(req.body);
      
        if(Validation.error){
          res.json(Validation.error.details[0].message)
         }else{
          next()
         }
        
      }
}
  

module.exports = validate;
  
  