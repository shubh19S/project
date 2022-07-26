const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
 
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
 
})

const message = (otp) =>{
    return `Dear User, \n\n` 
     + 'OTP for your email verification is : \n\n'
     + `${otp}\n\n`
     + 'This is a auto-generated email. Please do not reply to this email.\n\n'
     + 'Regards\n'
     + 'Anshul Mann\n\n'
}
const sendMail = async ( to,otp)=>{
    console.log(process.env.MAIL_HOST)


    const mailOptions ={
        from:`"Anshul "<anshul@mobikasa.com>`,
        to:to,
        subject:"OTP: For Email Verification",
        text:message(otp)
    }



   const result =  await transporter.sendMail(mailOptions)
  return result
}

module.exports = {
    sendMail
}