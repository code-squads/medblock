const SERVICE_ID = process.env.SERVICE_ID;
const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const OTP = require('../dbModels/otp')

// const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, AUTH_TOKEN);
const fast2sms = require('fast-two-sms')

exports.sendOTP = async (phone) => {
    phone = parseInt(phone.substring(3))
    var otp = Math.floor(100000 + Math.random() * 9000);
    console.log(`Send OTP ${phone} ${otp}`);
   
    const numberExists = await OTP.findOne({phone:phone})
    if(numberExists) {
        numberExists.otp = otp
        await numberExists.save()
    }
    else {
        const newOTP = new OTP({
            phone: phone,
            otp: otp
        })
        await newOTP.save()
    }
    var options = {
        authorization: process.env.FAST_TWO_SMS_KEY,
        message: `${otp} is your OTP -MedBlock`,
        numbers: [phone]
    }
    try {
        fast2sms.sendMessage(options)
    } catch(error) {
        console.log(error)
    }
}

exports.verifyOTP = async (phone, code) => {
    console.log(`Verify OTP ${phone} ${code}`);
    phone = parseInt(phone.substring(3))
    const otp = await OTP.findOne({phone:phone})
    if(otp) {
        if(parseInt(code) === otp.otp) {
            otp.delete()
            return(true)
        }
        else 
            return(false)
    }
    else {
        return(false)
    }
}


// exports.sendOTP = phone => {
//     return new Promise((resolve, reject) => {
//         twilioClient
//             .verify
//             .services(SERVICE_ID)
//             .verifications
//             .create({
//                 to: phone,
//                 channel: 'sms' 
//             })
//             .then(resolve)
//             .catch(reject);
//     })
// }

// exports.verifyOTP = (phone, code) => {
//     return new Promise((resolve, reject) => {
//         twilioClient
//             .verify
//             .services(SERVICE_ID)
//             .verificationChecks
//             .create({
//                 to: phone,
//                 code
//             })
//             .then(data => {
//                 if(data.status === "approved")
//                     resolve(true);
//                 else
//                     resolve(false);
//             })
//             .catch(reject);
//     })
// }