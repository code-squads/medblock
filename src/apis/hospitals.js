import MedBlock from '../services/medblock';

const cachedHospitals = {};


export const getHospital = address => new Promise((resolve, reject) => {
    if(!address)
        return reject("Invalid address");

    // Try fetching details from cache store
    if(cachedHospitals[address])
        return resolve(cachedHospitals[address]);

    // Otherwise fetch details from blockchain
    MedBlock.methods
        .getHospitalInfo(address).call()
        .then(hospitalInfo => {
            resolve(hospitalInfo);
        }).catch(err => {
            console.log(`Some error fetching hospital info for address ${address} \n`, err);
            reject(new Error(`Couldn't fetch hospital infor for address ${address}`));
        });
})