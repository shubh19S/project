const otpGenerator = require('otp-generator')
function generateOtp(){
const otp =  otpGenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false ,upperCaseAlphabets:false});

return otp
}

module.exports = {
    generateOtp
}            