const mongoose = require("mongoose");

const declinedRecordListSchema = new mongoose.Schema({
  hospitalAddress: {
    type: String,
    required: true,
    unique: true,
  },
  declinedRecords: [
    {
      patientName: String,
      patientAddress: String,
      recordID: Number,
      declineMsg: String,
      disease: String,
      treatment: String,
      medication: String,
      DrName: String,
      hospitalRecordID: String,
      diagnoseDate: String,
      dischargeDate: String,
    },
  ],
});

const DeclinedRecordList = new mongoose.model(
  "declined",
  declinedRecordListSchema
);

module.exports = DeclinedRecordList;
