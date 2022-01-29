import web3 from './web3';
import medblockABI from '../contracts/MedBlockABI.json';
import {
    medblockAddress,
    contractDeploymentTxLink
} from '../contracts/deploymentDetails'

const MedBlockContract = new web3.eth.Contract(medblockABI, medblockAddress);

console.log("MedBlock contract address: ", medblockAddress);
console.log("MedBlock contract deployment: ", contractDeploymentTxLink);
console.log("MedBlock ABI: \n", medblockABI);
console.log("MedBlock contract: \n", MedBlockContract);


window.MedBlockContract = MedBlockContract;
export default MedBlockContract;