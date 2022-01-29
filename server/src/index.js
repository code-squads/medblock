const express = require('express');
const slashes = require('connect-slashes');
const cors = require('cors');

const { sendOTP, verifyOTP } = require('../apis/smsAPI');

const PORT = process.argv[2] || process.env.PORT || 5000;
const CODE_LENGTH = process.env.CODE_LENGTH;

// Setting up the server
const app = express();
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(slashes(false));
app.listen(PORT, () => console.log(`Medblock server is up and running on port ${PORT}`));

// OTP routes
app.post('/apis/sendOTP', (req, res) => {
    const phone = `+91${req.body.phone}`;

    if(!phone)
        return res.status(400).send({
            message: "Wrong phone number :(",
            phone,
            success: false
        })
    
    sendOTP(phone)
        .then(data => {
            console.log(data);
            console.log(`OTP sent to ${phone}`);
            res.status(200).send({
                message: "OTP is sent successfuly !!",
                phone,
                success: true,
                data
            })
        }) 
        .catch(err => {
            console.log(err);
            console.log(`Some err sending OTP to ${phone}`);
            res.status(500).send({
                message: "Server error, contact administrator",
                phone,
                success: false,
                err
            })
        })
});


// Verify Endpoint
app.post('/apis/verifyOTP', (req, res) => {
    const phone = `+91${req.body.phone}`;
    const code = req.body.code;

    if(!phone || code.length != CODE_LENGTH)
        return res.status(400).send({
            message: "Invalid phone number or code :(",
            success: false,
            phone,
            code
        })

        verifyOTP(phone, code)
            .then(valid => {
                if(valid){
                    console.log(`OTP approved  for ${phone}`);
                    return res.status(200).send({
                        message: "OTP is Verified successfuly!!",
                        success: true
                    });
                }
                return  res.status(203).send({
                    message: "Wrong code",
                    success: false
                });
            }) 
            .catch(error => {
                console.log(error);
                console.log(`Some err verifying OTP ${code} for ${phone}, maybe it is already verified`);
                res.status(500).send({
                    message: "Server error, contact administrator",
                    phone,
                    code,
                    success: false,
                    error
                })
            })
});


app.get('/responses/ping', (req, res)=>{
    res.status(200).send('-- ok --');
});

// 404 pages for development
app.get('*', (req, res)=>{
    res.status(404).send("API not found :(  <br> ¯\\_(ツ)_/¯");
});