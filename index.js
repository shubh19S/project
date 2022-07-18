const express = require('express')
const dotenv = require('dotenv')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
dotenv.config

const app = express()


app.use('api/v1/user',userRoutes)

db
    .sync()
    .then(result=>console.log('sync success'))
    .catch(err=>console.log('sync error ', err.message))

const PORT = process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})