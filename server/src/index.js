const express = require("express");
const slashes = require("connect-slashes");
const cors = require("cors");
const mongoose = require("mongoose");

const { sendOTP, verifyOTP } = require("../apis/smsAPI");
const {
  addDeclinedRecord,
  dismissDeclinedRecord,
  getDeclinedRecordList,
} = require("../apis/declineAPI");

const PORT = process.argv[2] || process.env.PORT || 5000;
const CODE_LENGTH = process.env.CODE_LENGTH;

// Setting up the server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(slashes(false));
app.listen(PORT, () =>
  console.log(`Medikeep server is up and running on port ${PORT}`)
);

// Setting the MongoDB
mongoose
  .connect(process.env.MONGODB_SRV_STRING)
  .then((success) => {
    console.log("Successfuly connected to MongoDB !!");
  })
  .catch((err) => {
    console.log("Error in mongoose connection !");
    console.log(err);
  });

// OTP routes
app.post("/apis/sendOTP", (req, res) => {
  const phone = `+91${req.body.phone}`;

  if (!phone)
    return res.status(400).send({
      message: "Wrong phone number :(",
      phone,
      success: false,
      data,
    });

  sendOTP(phone)
    .then((data) => {
      console.log(data);
      console.log(`OTP sent to ${phone}`);
      res.status(200).send({
        message: "OTP is sent successfuly !!",
        phone,
        success: true,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(`Some err sending OTP to ${phone}`);
      res.status(500).send({
        message: "Server error, contact administrator",
        phone,
        success: false,
        error,
      });
    });
});

// Verify Endpoint
app.post("/apis/verifyOTP", (req, res) => {
  const phone = `+91${req.body.phone}`;
  const code = req.body.code;

  if (!phone || code.length != CODE_LENGTH)
    return res.status(400).send({
      message: "Invalid phone number or code :(",
      success: false,
      phone,
      code,
    });

  verifyOTP(phone, code)
    .then((valid) => {
      if (valid) {
        console.log(`OTP approved  for ${phone}`);
        return res.status(200).send({
          message: "OTP is Verified successfuly!!",
          success: true,
        });
      }
      return res.status(203).send({
        message: "Wrong code",
        success: false,
      });
    })
    .catch((error) => {
      console.log(error);
      console.log(
        `Some err verifying OTP ${code} for ${phone}, maybe it is already verified`
      );
      res.status(500).send({
        message: "Server error, contact administrator",
        phone,
        code,
        success: false,
        error,
      });
    });
});

app.post("/apis/getDeclinedRecordList", async (req, res) => {
  const senderHospitalAddress = req.body.senderHospitalAddress;

  if (!senderHospitalAddress)
    return res.status(400).send({
      message: "Insufficient data passed :(",
      success: false,
      senderHospitalAddress,
    });

  const declinedRecordsList = await getDeclinedRecordList(
    senderHospitalAddress
  );

  return res.status(200).send({
    declinedRecordsList,
  });
});

app.post("/apis/newDecline", async (req, res) => {
  const recordDetails = req.body.recordDetails;
  const patientName = req.body.patientName;
  const declineMsg = req.body.declineMsg;

  if (!recordDetails || !patientName || !declineMsg)
    return res.status(400).send({
      message: "Insufficient data passed :(",
      success: false,
      patientName,
      recordDetails,
      declineMsg,
    });

  const success = await addDeclinedRecord(
    recordDetails,
    patientName,
    declineMsg
  );

  if (success)
    return res.status(200).send({
      message: "Successfuly added to the decline Queue",
    });
  return res.status(500).send({
    message: "Couldn't add decline record entry",
  });
});

app.post("/apis/dismissDeclinedRecord", (req, res) => {
  const senderHospitalAddress = req.body.senderHospitalAddress;
  const declinedRecordMongoID = req.body.declinedRecordMongoID;
  const recordDetails = req.body.recordDetails;

  if (!recordDetails || !senderHospitalAddress || !declinedRecordMongoID)
    return res.status(400).send({
      message: "Insufficient data passed :(",
      success: false,
      senderHospitalAddress,
      declinedRecordMongoID,
      recordDetails,
    });

  const success = dismissDeclinedRecord(
    senderHospitalAddress,
    declinedRecordMongoID,
    recordDetails
  );

  if (success)
    return res.status(200).send({
      message: "Successfuly removed the cached declined record",
    });
  return res.status(500).send({
    message: "Couldn't remove declined record entry",
  });
});

app.get("/responses/ping", (req, res) => {
  res.status(200).send("-- ok --");
});

// 404 pages for development
app.get("*", (req, res) => {
  res.status(404).send("API not found :(  <br> ¯\\_(ツ)_/¯");
});
