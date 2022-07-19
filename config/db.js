const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  port:process.env.DB_PORT,
  dialect: 'mysql'
});
const checkAuth =async()=>{
 try {
    await sequelize.authenticate()
    console.log("auth success")
   
 } catch (err) {
    console.log('Error occured ', err)
    
 }
}

checkAuth()
module.exports = sequelize