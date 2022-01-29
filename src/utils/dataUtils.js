import { getHospital } from '../apis/hospitals';
window.gethosp = getHospital;

export const genders = ["Male", "Female", "Non-binary"];
export const figureOutGender = idx => genders[idx];

export const getInitials = name => name.substring(0,1);

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;
export const calculateAge = birthTimestamp => {
    let DOB = new Date(birthTimestamp * 1000);

    let millisecondsBetweenDOBAnd1970 = Date.parse(DOB);
    let millisecondsBetweenNowAnd1970 = Date.now();
    let ageInMilliseconds = millisecondsBetweenNowAnd1970-millisecondsBetweenDOBAnd1970;
    let milliseconds = ageInMilliseconds;
    let year = day*365;
    let years = Math.round(milliseconds/year);

    return years + " years old";
}

export const dateToTimestamp = dateObj => Number(dateObj / 1000).toFixed();

export const dateFromTimestamp = timestamp => {
    let date = new Date(timestamp*1000);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}


export async function processRecords(allRecords){
    const processedRecords = {
        pendingRecords: [],
        medicalHistory: [],
        declinedRecords: []
    }
    
    for(let i=0; i<allRecords.length; i++){
        let record = allRecords[i];
        let hospitalInfo = await getHospital(record.senderHospital);
        let processedRecord = {
            ...record,
            recordID: i,
            hospitalInfo,
            medicationList: record.medication.split(',')
        };

        if(record.approved)
            processedRecords.medicalHistory.push(processedRecord);
        else if(record.declineMsg !== '')
            processedRecords.declinedRecords.push(processedRecord);
        else
            processedRecords.pendingRecords.push(processedRecord);
    }
    
    console.log("Processed records:\n", processedRecords);
    return(processedRecords);
}