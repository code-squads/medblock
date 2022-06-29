import web3 from "../services/web3";
import MedBlock from "../services/medblock";
import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import { isValidPrivateKey, isValidAddress } from "../utils/keyValidator";
import { figureOutGender, dateToTimestamp, cidToURL } from "../utils/dataUtils";
import { linkFromTxHash } from "../Constants/txExplorer";
import { uploadFilesToIPFS } from "./ipfs";

// Login
export async function universalLogin(pk, authorityType) {
  return new Promise((resolve, reject) => {
    if (!authorityType) return reject("Authority type required for login !!!");

    if (!isValidPrivateKey(pk)) return reject("Invalid private key:" + pk);

    let newWallet = web3.eth.accounts.privateKeyToAccount(pk);

    switch (authorityType) {
      case AUTHORITY_TYPES.ADMIN:
        MedBlock.methods
          .admin()
          .call()
          .then((res) => {
            if (res !== newWallet.address) {
              console.log("invalid private key for admin login !!");
              return reject(res);
            }
            getAdminInfo().then(resolve).catch(reject);
          })
          .catch((err) => {
            console.log("Some error logging in:", err);
            reject(err);
          });
        break;
      case AUTHORITY_TYPES.HOSPITAL:
        getHospitalInfo(newWallet.address).then(resolve).catch(reject);
        break;
      case AUTHORITY_TYPES.PATIENT:
        getPatientPersonalInfo(newWallet.address).then(resolve).catch(reject);
        break;
      default:
        reject("Invalid authority type requested !!");
    }
  });
}

// Promise resolves to the admin address
export async function getAdminAddress() {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .admin()
      .call()
      .then((adminAddress) => {
        console.log("Admin address:", adminAddress);
        resolve(adminAddress);
      })
      .catch((err) => {
        console.log(err);
        reject(new Error("Couldn't fetch admin address due to some reason"));
      });
  });
}

// Promise resolves to an object containing admin info
export function getAdminInfo() {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .getAdminInfo()
      .call()
      .then(resolve)
      .catch((err) => {
        console.log("Some error getting admin info:", err);
        reject(err);
      });
  });
}

// Promise resolves to an array of records for the given patient's address
export async function getRecordHistory(patientAddress) {
  return new Promise((resolve, reject) => {
    if (!patientAddress) return reject(new Error("Invalid patient address"));

    MedBlock.methods
      .getAllRecords(patientAddress)
      .call()
      .then((res) => {
        console.log(`Record history for ${patientAddress}: \n`, res);
        resolve(res);
      })
      .catch((err) => {
        console.log("Some error obtaining record history! \n", err);
        reject(
          new Error(
            `Couldn't fetch record history for patientAddress: ${patientAddress}`
          )
        );
      });
  });
}

// Promise resolves to a record object for the given recordID
export async function getRecord(patientAddress, recordID) {
  return new Promise((resolve, reject) => {
    if (!patientAddress) return reject(new Error("Invalid patient address"));

    if (!recordID && recordID !== 0)
      return reject(new Error("Invalid record number / ID"));

    const recordIDNumeric = Number(recordID);
    console.log(`Fetching record no. ${recordIDNumeric}`);

    MedBlock.methods
      .getRecord(patientAddress, recordIDNumeric)
      .call()
      .then((record) => {
        const recordObj = { ...record, recordID: recordIDNumeric };
        console.log("Record details:\n", recordObj);
        resolve(recordObj);
      })
      .catch((err) => {
        console.log(
          `Some error fetching record no. ${recordIDNumeric} \n`,
          err
        );
        reject(new Error(`Couldn't fetch record no. ${recordIDNumeric}`));
      });
  });
}

// Adds new record record for given patient and resolves to a response from ethereum
export async function addNewRecord(
  patientBlockchainAddress,
  disease,
  treatment,
  medication,
  drName,
  hospitalRecordID,
  wasAdmitted,
  diagnoseDateObj,
  dischargeDateObj,
  uploadedFiles,
  senderHospitalAddress
) {
  const diagnoseDateString = dateToTimestamp(diagnoseDateObj);
  const dischargeDateString = wasAdmitted
    ? dateToTimestamp(dischargeDateObj)
    : 0;

  const confirmation = window.confirm(
    "Do you really want to add this record ? \nThis can't be undone..."
  );
  if (!confirmation) return false;

  // const { recordID } = recordDetails;

  // if(!recordID && recordID !== 0)
  //     return new Error("Invalid record number / ID");

  const results = await uploadFilesToIPFS(uploadedFiles);
  console.log("file upload result:", results);

  const cids = results.map(result => result.path);
  console.log("View files on IPFS:");
  results.forEach(result => console.log(cidToURL(result.path)));

  const fileNames = results.map(result => result.name);

  console.log("New record details: ", {
    patientBlockchainAddress,
    disease,
    treatment,
    medication,
    drName,
    hospitalRecordID,
    diagnoseDateString,
    dischargeDateString,
    cids,
    titles: fileNames
  });

  const tx = MedBlock.methods.addRecord(
    patientBlockchainAddress,
    disease,
    treatment,
    medication,
    drName,
    hospitalRecordID,
    diagnoseDateString,
    dischargeDateString,
    cids,
    fileNames,
  );
  console.log("New record transaction: ", tx);

  const gasPrice = await web3.eth.getGasPrice();
  const gas = (await tx.estimateGas({ from: senderHospitalAddress })) + 20000;
  console.log(gas, gasPrice);

  // const nonce = await web3.eth.getTransactionCount(accountAddress);
  // console.log(nonce);

  try {
    const receipt = await tx.send({
      from: senderHospitalAddress,
      gas,
      gasPrice,
    });
    console.log(receipt);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(
      `View the transaction here: `,
      linkFromTxHash(receipt.transactionHash)
    );
    return receipt;
  } catch (err) {
    console.log(
      "Some error sending record approval transaction from account:",
      senderHospitalAddress
    );
    console.log(err);
  }
}

// Links the specified account and record and resolves to a response from ethereum
export async function approveRecord(accountAddress, recordDetails) {
  const confirmation = window.confirm(
    "Do you really want to approve this record ? \nThis can't be undone..."
  );
  if (!confirmation) return;

  const { recordID } = recordDetails;

  if (!recordID && recordID !== 0)
    return new Error("Invalid record number / ID");

  const recordIDNumeric = Number(recordID);
  console.log(
    `Approving record no. ${recordIDNumeric} of account:`,
    accountAddress
  );

  const tx = MedBlock.methods.approveRecord(recordIDNumeric);
  console.log("Transaction: ", tx);

  const gasPrice = await web3.eth.getGasPrice();
  const gas = (await tx.estimateGas({ from: accountAddress })) + 20000;
  console.log(gas, gasPrice);

  // const nonce = await web3.eth.getTransactionCount(accountAddress);
  // console.log(nonce);

  tx.send({
    from: accountAddress,
    gas,
    gasPrice,
  })
    .then((receipt) => {
      console.log(receipt);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(
        `View the transaction here: `,
        linkFromTxHash(receipt.transactionHash)
      );
    })
    .catch((err) => {
      console.log(
        "Some error sending record approval transaction from account:",
        accountAddress
      );
      console.log(err);
    });
}

// Links the specified account and record and resolves to a response from ethereum
export async function declineRecord(accountAddress, recordDetails, declineMsg) {
  const confirmation = window.confirm(
    "Do you really want to decline this record ? \nThis can't be undone..."
  );
  if (!confirmation) return;

  const { recordID } = recordDetails;

  if (!recordID && recordID !== 0)
    return new Error("Invalid record number / ID");

  const recordIDNumeric = Number(recordID);
  console.log(
    `Declining record no. ${recordIDNumeric} of account:`,
    accountAddress
  );

  const tx = MedBlock.methods.declineRecord(recordIDNumeric, declineMsg);
  console.log("Transaction: ", tx);

  const gasPrice = await web3.eth.getGasPrice();
  const gas = (await tx.estimateGas({ from: accountAddress })) + 20000;
  console.log(gas, gasPrice);

  // const nonce = await web3.eth.getTransactionCount(accountAddress);
  // console.log(nonce);

  tx.send({
    from: accountAddress,
    gas,
    gasPrice,
  })
    .then((receipt) => {
      console.log(receipt);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(
        `View the transaction here:`,
        linkFromTxHash(receipt.transactionHash)
      );
    })
    .catch((err) => {
      console.log(
        "Some error sending record approval transaction from account:",
        accountAddress
      );
      console.log(err);
    });
}

export async function newHospitalRegistration(
  name,
  license,
  phone,
  address,
  hospitalBlockchainAddress,
  adminAddress
) {
  if (!name || !license || !phone || !address || !hospitalBlockchainAddress)
    return console.log("Required parameters not provided!");

  const confirmation = window.confirm(
    "Do you really want to register hospital: \n" + name
  );
  if (!confirmation) return;

  if (!isValidAddress(hospitalBlockchainAddress))
    return new Error("Invalid blockchain address !!");

  let issueDate = new Date();
  let endDate = issueDate;

  issueDate = issueDate / 1000;
  endDate.setFullYear(endDate.getFullYear() + 1);
  endDate = endDate / 1000;

  let authorityIssueDate = Number(issueDate.toFixed());
  let authorityTerminalDate = Number(endDate.toFixed());

  const tx = MedBlock.methods.hospitalRegistration(
    hospitalBlockchainAddress,
    name,
    address,
    phone,
    license,
    authorityIssueDate,
    authorityTerminalDate
  );

  console.log("Transaction: ", tx);

  const gasPrice = await web3.eth.getGasPrice();
  const gas = (await tx.estimateGas({ from: adminAddress })) + 20000;
  console.log(gas, gasPrice);

  let receipt = await tx.send({
    from: adminAddress,
    gas,
    gasPrice,
  });
  console.log("Transaction receipt:", receipt);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(
    `View the transaction here: `,
    linkFromTxHash(receipt.transactionHash)
  );
  return receipt;
}

export async function newPatientRegistration(
  fname,
  lname,
  phone,
  residentialAddress,
  patientBlockchainAddress,
  birthdate,
  gender,
  adminAddress
) {
  if (
    !fname ||
    !lname ||
    !birthdate ||
    !phone ||
    !residentialAddress ||
    !patientBlockchainAddress ||
    !figureOutGender(gender)
  )
    return console.log("Required parameters not provided!");

  const confirmation = window.confirm(
    "Do you really want to register patient: \n" + fname + " " + lname
  );
  if (!confirmation) return;

  if (!isValidAddress(patientBlockchainAddress))
    return new Error("Invalid blockchain address !!");

  const tx = MedBlock.methods.userRegistration(
    patientBlockchainAddress,
    fname,
    lname,
    phone,
    residentialAddress,
    birthdate,
    gender
  );

  console.log("Transaction: ", tx);

  const gasPrice = await web3.eth.getGasPrice();
  const gas = (await tx.estimateGas({ from: adminAddress })) + 20000;
  console.log(gas, gasPrice);

  let receipt = await tx.send({
    from: adminAddress,
    gas,
    gasPrice,
  });
  console.log("Transaction receipt:", receipt);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(
    `View the transaction here: `,
    linkFromTxHash(receipt.transactionHash)
  );
  return receipt;
}

export function isHospitalAlreadRegistered(hospitalBlockchainAddress) {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .getHospitalInfo(hospitalBlockchainAddress)
      .call()
      .then((res) => {
        resolve(res.authorityIssueDate !== "0");
      })
      .catch((err) => {
        console.log("Some error getting hospital info:", err);
        reject(err);
      });
  });
}
export function isPatientAlreadyRegistered(patientBlockchainAddress) {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .getUserInfo(patientBlockchainAddress)
      .call()
      .then((res) => {
        resolve(res.birthdate !== "0");
      })
      .catch((err) => {
        console.log("Some error getting user info:", err);
        reject(err);
      });
  });
}

export function getHospitalInfo(hospitalBlockchainAddress) {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .getHospitalInfo(hospitalBlockchainAddress)
      .call()
      .then((res) => {
        if (res.authorityIssueDate === "0") {
          console.log("Invalid hospital address for hospital info !!");
          return reject(res);
        }
        resolve(res);
      })
      .catch((err) => {
        console.log("Some error getting hospital info:", err);
        reject(err);
      });
  });
}

export function getPatientPersonalInfo(patientBlockchainAddress) {
  return new Promise((resolve, reject) => {
    MedBlock.methods
      .getUserInfo(patientBlockchainAddress)
      .call()
      .then((res) => {
        if (res.birthdate === "0") {
          console.log("Invalid patient address for patient info !!");
          return reject(res);
        }
        resolve(res);
      })
      .catch((err) => {
        console.log("Some error getting patient personal info:", err);
        reject(err);
      });
  });
}

export async function sendEth(fromAddress, toAddress, amountEth = "0.01") {
  const gasPrice = await web3.eth.getGasPrice();
  const tx = await web3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei(amountEth, "ether"),
    gas: 3000000,
    gasPrice,
  });
  console.log("Eth transfer tx:\n", tx);
  return tx;
}
