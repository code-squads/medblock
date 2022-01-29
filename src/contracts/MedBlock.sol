pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: MIT

import "./Data.sol";
import "./AdminAuthorized.sol";

// Inherit abilities of admin authorization from above contract
contract MedBlock is AdminAuthorized {
    // Store a single object where
    // Each patient's address corresponds to the Data.PatientData
    // eg.   0xab32......2c   =>   Data.PatientData{.....}
    mapping(address => Data.PatientData) registeredUsers;

    // Store a single object where
    // Each authorized hospital's address corresponds to the Data.HospitalData
    // eg.   0xc43d......d8   =>   Data.HospitalData{.....}
    mapping(address => Data.HospitalData) authorizedHospitals;

    // Store a list/array of records for each patient separately
    // eg.   0xab32......2c   =>   [MedicalData{.....}, MedicalData{.....}, ... MedicalData{.....}]
   mapping(address => Data.MedicalData[]) userRecords;

    // Stores the basic information of admin when contract it is deployed
    Data.AdminData adminInfo;
    constructor(
        string memory adminName,
        string memory adminRegisteredNumber,
        string memory adminResidentialAddress
    ){
        adminInfo = Data.AdminData({
            name: adminName,
            registeredNumber: adminRegisteredNumber,
            residentialAddress: adminResidentialAddress
        });
    }

    // Function for Hospital registration, only permitted to admin
    function hospitalRegistration(
        address hospitalAddress,
        string memory name,
        string memory residentialAddress,
        string memory phone,
        string memory govtLicenseNumber,
        uint256 authorityIssueDate,
        uint256 authorityTerminalDate
    ) onlyAdmin public returns (bool){
        require(authorizedHospitals[hospitalAddress].authorityIssueDate == 0, "Authorized hospital data already available");
        Data.HospitalData memory newAuthorizedHospital = Data.HospitalData({
            name: name,
            Address: residentialAddress,
            phone: phone,
            govtLicenseNumber: govtLicenseNumber,
            authorityIssueDate: authorityIssueDate,
            authorityTerminalDate: authorityTerminalDate
        });
        authorizedHospitals[hospitalAddress] = newAuthorizedHospital;
        return true;
    }

    // Function to modify hospital data, only permitted to admin
    function modifyHospitalData(
        address hospitalAddress,
        string memory name,
        string memory residentialAddress,
        string memory phone,
        string memory govtLicenseNumber,
        uint256 authorityIssueDate,
        uint256 authorityTerminalDate
    ) onlyAdmin public returns (bool){
        require(authorizedHospitals[hospitalAddress].authorityIssueDate > 0, "Hospital is not registered/authorized");
        Data.HospitalData storage targetHospital = authorizedHospitals[hospitalAddress];
        targetHospital.name = name;
        targetHospital.Address = residentialAddress;
        targetHospital.phone = phone;
        targetHospital.govtLicenseNumber = govtLicenseNumber;
        targetHospital.authorityIssueDate = authorityIssueDate;
        targetHospital.authorityTerminalDate = authorityTerminalDate;
        return true;
    }
    
    // Function for User registration, only permitted to admin
    function userRegistration(
        address patientAddress,
        string memory fname,
        string memory lname,
        string memory phone,
        string memory residentialAddress,
        uint256 birthdate,
        Data.Gender gender
    ) onlyAdmin public returns (bool){
        require(registeredUsers[patientAddress].birthdate == 0, "User already registered");
        Data.PatientData memory newRegisteredUser = Data.PatientData({
            fname: fname,
            lname: lname,
            phone: phone,
            residentialAddress: residentialAddress,
            birthdate: birthdate,
            gender: gender
        });
        registeredUsers[patientAddress] = newRegisteredUser;
        return true;
    }

    // Function to modify user data, only permitted to admin
    function modifyUserData(
        address patientAddress,
        string memory fname,
        string memory lname,
        string memory phone,
        string memory residentialAddress,
        uint256 birthdate,
        Data.Gender gender
    ) onlyAdmin public returns (bool){
        require(registeredUsers[patientAddress].birthdate > 0, "User is not registered");
        Data.PatientData storage targetUser = registeredUsers[patientAddress];
        targetUser.fname = fname;
        targetUser.lname = lname;
        targetUser.phone = phone;
        targetUser.residentialAddress = residentialAddress;
        targetUser.birthdate = birthdate;
        targetUser.gender = gender;
        return true;
    }

    // Get information about specific registered user
    function getAdminInfo() public view returns (Data.AdminData memory){
        return adminInfo;
    }

    // Get information about specific authorized hospitals
    function getHospitalInfo(address hospitalAddress) public view returns (Data.HospitalData memory){
        return authorizedHospitals[hospitalAddress];
    }

    // Get information about specific registered user
    function getUserInfo(address patientAddress) public view returns (Data.PatientData memory){
        return registeredUsers[patientAddress];
    }

    // Get specified record for a particular person
    function getRecord(address person, uint256 idx) public view returns (Data.MedicalData memory){
        return userRecords[person][idx];
    }

    // Get all records for a particular person
    function getAllRecords(address person) public view returns (Data.MedicalData[] memory) {
        return userRecords[person];
    }

    // Function to add record for the hospitals
    function addRecord(
        address patient,
        string memory disease,
        string memory treatment,
        string memory medication,
        string memory DrName,
        string memory hospitalRecordID,
        uint256 diagnoseDate,
        uint256 dischargeDate
    ) public returns (uint256) {
        Data.MedicalData memory newRecord = Data.MedicalData({
            senderHospital: msg.sender,
            approved: false,
            declineMsg: '',
            patient: patient,
            disease: disease,
            treatment: treatment,
            medication: medication,
            DrName: DrName,
            hospitalRecordID: hospitalRecordID,
            diagnoseDate: diagnoseDate,
            dischargeDate: dischargeDate
        });
        userRecords[patient].push(newRecord);

        // Not necessarily required, as it can be derived from getAllRecords
        return userRecords[patient].length - 1;
    }

    // Function to approve record to the profile, done by the user
    // 'msg.sender' in this function ensures that the user can approve only own records
    function approveRecord(uint256 recordID) public returns (bool){
        // Check if the specified record exists
        uint256 recordsLength = userRecords[msg.sender].length;
        require(recordID >= 0, "Attempt to access record at negative index");
        require(recordID < recordsLength, "Attempt to access Invalid record");

        // Obtain specified medical record
        Data.MedicalData storage targetMedicalRecord = userRecords[msg.sender][recordID];

        // Verify that the specified medical record isn't already declined
        require(bytes(targetMedicalRecord.declineMsg).length == 0, "Record already declined !");
        
        // Verify that the specified medical record isn't already approved
        require(targetMedicalRecord.approved == false, "Record already approved!");
        
        // Approve record
        targetMedicalRecord.approved = true;
        return true;
    }

    // Function to decline record added to the profile, done by the user
    // 'msg.sender' in this function ensures that the user can approve only own records
    function declineRecord(uint256 recordID, string memory declineMsg) public returns (bool){
        // Check if the specified record exists
        uint256 recordsLength = userRecords[msg.sender].length;
        require(recordID >= 0, "Attempt to access record at negative index");
        require(recordID < recordsLength, "Attempt to access Invalid record");

        // Obtain specified medical record
        Data.MedicalData storage targetMedicalRecord = userRecords[msg.sender][recordID];

        // Verify that the specified medical record isn't already approved
        require(targetMedicalRecord.approved == false, "Record already approved!");
        
        // Verify that the specified medical record isn't already declined
        require(bytes(targetMedicalRecord.declineMsg).length == 0, "Record already declined !");

        // Decline record
        targetMedicalRecord.declineMsg = declineMsg;
        return true;
    }

    // Possible feature
    //    mapping(aadhar => [address, address]) aadharToAccountLogin;
}