pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: MIT

library Data{
    // Possible values for gender
    // Corresponding values while integrating with web3 or calling fn via remix:
    //          MALE: 0,     FEMALE: 1,     NONBINARY: 2
    enum Gender { MALE, FEMALE, NONBINARY }

    // Object to store basic information about the admin
    // Added during contract deployment & can't be modified later
    struct AdminData {
        string name;
        string registeredNumber;
        string residentialAddress;
    }

    // Object to store basic information about the patient
    // This can be added/modified only by the admin 
    struct PatientData {
        string fname;
        string lname;
        string phone;
        string residentialAddress;
        uint256 birthdate;
        Gender gender; 
    }
     
    // Object to store basic information about the hospital
    // This can be added/modified only by the admin 
    struct HospitalData {
        string name;
        string Address;
        string phone;

        // License number alloted to hospital by the Govt.
        // For reference purpose
        string govtLicenseNumber;

        // Authority issued by blockchain admin starts from this date
        uint256 authorityIssueDate;

        // Authority issued by blockchain admin ends on this date
        // Hospital must get the audit/verification done & authority renewed by admin 
        uint256 authorityTerminalDate;
    }

    struct Media {
        string title;
        // string description;
        string cid;
    }

    // Object to store medical record information
    // This is supposed to be added by the hospital 
    struct MedicalData {
        // Identifies the hospital responsible for this record
        address senderHospital;

        // Value set to false on adding recorded and then toggled to true when approved by user
        bool approved;

        // Value set to empty string by default & changed to string if declined by the user
        string declineMsg;

        // Public address of the patient kept for convenience (Not used for authorization anywhere)
        address patient;

        // Actual medical data
        string disease;
        string treatment;
        string medication;
        string DrName;

        // Record ID of the hospital specific medical record management system
        // Maintainence of this makes it convenient to track down the medical event 
        string hospitalRecordID;
        
        uint256 diagnoseDate;
        uint256 dischargeDate;      // Set to 0 if patient was not admitted

        Media[] reports;
    }
}