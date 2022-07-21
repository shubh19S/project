const Joi = require('joi')



// console.log(userValidation.registerUser)
const validate = (valdateSchema) =>{
    return (req,res,next)=>{

      const { schema } = valdateSchema.body
    
        const Validation = schema.validate(req.body);
      
        if(Validation.error){
          res.json(Validation.error.details[0].message)
         }else{
          next()
         }
        
      }
}
  

module.exports = validate;
  
  