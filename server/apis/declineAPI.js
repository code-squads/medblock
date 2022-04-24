const DeclineRecordList = require("../dbModels/DeclinedRecord");

exports.getDeclinedRecordList = async (hospitalAddress) => {
  let recordList = await DeclineRecordList.findOne({ hospitalAddress });
  if (!recordList) {
    console.log(
      `Declined record list not found for ${hospitalAddress}, hence creating one`
    );
    recordList = new DeclineRecordList({
      hospitalAddress,
      declinedRecords: [],
    });
    await recordList.save();
  }
  return recordList;
};

exports.addDeclinedRecord = async (recordDetails, patientName, declineMsg) => {
  const hospitalAddress = recordDetails.senderHospital;
  console.log(
    `Record rejected by patient: ${patientName}(${recordDetails.patient}), Record ID: ${recordDetails.recordID}, It was added by ${hospitalAddress}\n Decline message: ${declineMsg}`
  );

  let recordList = await DeclineRecordList.findOne({ hospitalAddress });
  if (!recordList) {
    console.log(
      `Declined record list not found for ${hospitalAddress}, hence creating one`
    );
    recordList = new DeclineRecordList({
      hospitalAddress,
      declinedRecords: [],
    });
    await recordList.save();
  }

  recordList.declinedRecords.push({
    patientName,
    patientAddress: recordDetails.patient,
    recordID: recordDetails.recordID,
    declineMsg,
    disease: recordDetails.disease,
    treatment: recordDetails.treatment,
    medication: recordDetails.medication,
    DrName: recordDetails.DrName,
    hospitalRecordID: recordDetails.hospitalRecordID,
    diagnoseDate: recordDetails.diagnoseDate,
    dischargeDate: recordDetails.dischargeDate,
  });
  await recordList.save();
  console.log(recordList);

  return true;
};

exports.dismissDeclinedRecord = async (
  hospitalAddress,
  declinedRecordMongoID,
  recordDetails
) => {
  console.log(
    `Dismissed declined, Record ID: ${recordDetails.recordID}, It was added by ${hospitalAddress}\n`
  );

  let recordList = await DeclineRecordList.findOne({ hospitalAddress });
  if (!recordList) {
    console.log(
      `Declined record list not found for ${hospitalAddress}, hence creating one`
    );
    recordList = new DeclineRecordList({
      hospitalAddress,
      declinedRecords: [],
    });
    await recordList.save();
  }

  recordList.declinedRecords.pull({
    _id: declinedRecordMongoID,
  });
  console.log(recordList);
  await recordList.save();

  return true;
};
