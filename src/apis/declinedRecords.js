import  customAxios from '../services/customAxios';

export const getDeclinedRecordList = async (senderHospitalAddress) => {
    const response = await customAxios.post('/apis/getDeclinedRecordList', { senderHospitalAddress })
    return response.data.declinedRecordsList.declinedRecords;
}

export const addDeclinedRecord = async (recordDetails, patientName, declineMsg) => {
    const response = await customAxios.post('/apis/newDecline', {
        recordDetails,
        patientName,
        declineMsg
    });
    console.log(response);
    if(response.status === 400 || response.status === 500)
        return false;
}


export const dismissDeclinedRecord = async (senderHospitalAddress, declinedRecordMongoID, recordDetails) => {
    const response = await customAxios.post('/apis/dismissDeclinedRecord', {
        senderHospitalAddress,
        declinedRecordMongoID,
        recordDetails
    });
    console.log(response);
    if(response.status === 400 || response.status === 500)
        return false;
}