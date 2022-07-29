const db = require("../models/index");
const User = db.user;


const findByEmail = (email) => {
    
    const user = User.findOne({ where:{
        email
    }})

    return user
}

module.exports = {
    findByEmail
}