const SERVICE_ID = process.env.SERVICE_ID;
const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, AUTH_TOKEN);

exports.sendOTP = phone => {
    return new Promise((resolve, reject) => {
        twilioClient
            .verify
            .services(SERVICE_ID)
            .verifications
            .create({
                to: phone,
                channel: 'sms' 
            })
            .then(resolve)
            .catch(reject);
    })
}

exports.verifyOTP = (phone, code) => {
    return new Promise((resolve, reject) => {
        twilioClient
            .verify
            .services(SERVICE_ID)
            .verificationChecks
            .create({
                to: phone,
                code
            })
            .then(data => {
                if(data.status === "approved")
                    resolve(true);
                else
                    resolve(false);
            })
            .catch(reject);
    })
}