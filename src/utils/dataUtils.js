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

export function cidToURL(cid, fileName, extension){
    if(!cid)
        return "";
    // cid = "Qmao2KAKTMzqbe1syY33pzZFMLZMv3jkh1Hk6pyppdhBkX";
    return `https://black-hollow-buzzard-800.mypinata.cloud/ipfs/${cid}?filename=${fileName}.${extension}`
    // return `https://ipfs.infura.io/ipfs/${cid}?filename=${fileName}.${extension}`;
}

export async function processRecords(allRecords){
    const processedRecords = {
        pendingRecords: [],
        medicalHistory: [],
        declinedRecords: []
    }
    
    for(let i=0; i<allRecords.length; i++){
        const record = allRecords[i];
        const hospitalInfo = await getHospital(record.senderHospital);

        
        const reportsList = record.reports.map(report => {
            const nameParts = report[0].split('.');
            const name = nameParts.slice(0, -1).join('.');
            const extension = nameParts.length === 1 ? "unknown" : nameParts[nameParts.length - 1];
            return { 
                name,
                cid: report[1],
                extension: extension,
                url: cidToURL(report[1], name, extension),
            }
        });

        let processedRecord = {
            ...record,
            recordID: i,
            hospitalInfo,
            medicationList: record.medication.split(','),
            reportsList,
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