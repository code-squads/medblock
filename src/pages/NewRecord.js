import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Preview, print } from "react-html2pdf";

import { ModalUpload, Backdrop } from "../components/ModalUpload";

import { CoreButton } from "../components/core";
import KeyInputs from "../components/KeyInputs";

import { getPatientPersonalInfo, addNewRecord } from "../apis/medblock";
import { PROGRESS_STATUSES } from "../Constants/progressStatus";
import Nbsp from "../utils/nbsp";
import {
  dateFromTimestamp,
  dateToTimestamp,
  calculateAge,
  figureOutGender,
  getInitials,
} from "../utils/dataUtils";
import { useAuth } from "../services/authorization";

import {
  HospitalDashboardContainer,
  Left,
  Right,
  Center,
  Navlink,
  NavlinkActive,
  NavMenuList,
  ListItems,
  ListItemsActive,
  Name,
  TitleHosp,
  HospitalStyling,
  HopitalCard,
  HospitalCardName,
  Circle,
  HospCardReg,
  HospCardAdd,
  HospCardHeading,
  HospCardDetails,
  HospCardRow3,
  FCName,
  Note,
  NotesDiv,
  NoteTitle,
  NoteDescription,
} from "./HospitalDashboard.styled";

import {
  ConfirmHeading,
  Heading,
  HeadingDiv,
  Confirm,
  Details,
  PatientCol,
  MedicalCol,
  SubHeading,
  SubHeadingMedical,
  DetailsDiv,
  DetailsText,
  LeftDetails,
  LeftDetailsMedical,
  RightDetails,
  RightDetailsMedical,
  EachDetail,
  Buttons,
  InputContainer,
  InputSubContainer,
  RecieptHeading,
  Reciept,
  RecieptDetails,
  ReceiptDetailHead,
  ReceiptDetailsBody,
  RecieptQR,
  RecieptQrHead,
  RecieptQrLogo,
  RecieptContainer,
  RecieptLeftDetail,
  RecieptRightDetail,
  RecieptButton,
} from "./NewRecord.styled";

// import { ReactComponent as Dashboardlogo } from "../assets/icons/hospital/dashboardicon.svg";
import { ReactComponent as Dashboard } from "../assets/icons/hospital/Dashboard.svg";
import { ReactComponent as AddNewRecordLogo } from "../assets/icons/hospital/AddNewRecordBlue.svg";
import { ReactComponent as LogoutLogo } from "../assets/icons/hospital/logouticon.svg";
// import { ReactComponent as UserLogo } from "../assets/icons/hospital/usericon.svg";
import { ReactComponent as SettingsLogo } from "../assets/icons/hospital/settingsicon.svg";
import { ReactComponent as HospitalLogo } from "../assets/icons/hospital/hospital.svg";
import { ReactComponent as TickMark } from "../assets/icons/hospital/greentick.svg";
import { ReactComponent as BackArrow } from "../assets/icons/general/backArrow.svg";
import { ReactComponent as UploadLogo } from "../assets/icons/hospital/upload.svg";
import { ReactComponent as GreenTick } from "../assets/icons/admin/greentick.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/admin/homeicon.svg";
import { ReactComponent as PrintIcon } from "../assets/icons/admin/printicon.svg";
import { ReactComponent as DeclineLogo } from "../assets/icons/hospital/Decline.svg";

const NewRecord = (props) => {
  const auth = useAuth();

  //    key | add | confirm | receept
  const [progress, setProgress] = useState(PROGRESS_STATUSES.PATIENT_ADDRESS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalState, setModalState] = useState(false);

  const hospitalInfo = auth.entityInfo;

  const [disease, setDisease] = useState("");
  const [treatment, setTreatment] = useState("");
  const [medication, setMedication] = useState("");
  const [drname, setDrname] = useState("Dr. ");
  const [hospitaRecordlID, setHospitaRecordlID] = useState("");
  const [diagnoseDate, setDiagnoseDate] = useState(new Date());
  const [wasAdmitted, setWasAdmitted] = useState(false);
  const [dischargeDate, setDischargeDate] = useState(new Date());
  const [uploadedFiles, setuploadedFiles] = useState([]);

  const [finalPatientAddress, setFinalPatientAddress] = useState(undefined);
  const [basicPatientInfo, setBasicPatientInfo] = useState({
    name: "John Doe",
    dob: "15/4/2002",
    dobTimeStamp: "1638985823",
    gender: "Male",
  });

  function uploadClickHandler() {
    setModalState(true);
  }

  function uploadFileHandler(files) {
    // const fileToUpload = { ...files };
    setuploadedFiles(files);
    // console.log(fileToUpload);
  }

  function closeModal() {
    setModalState(false);
  }

  async function processKeyToDetails(patientAddress) {
    setIsProcessing(true);
    try {
      const patientInfo = await getPatientPersonalInfo(patientAddress);
      console.log(`Patient address: ${patientAddress}, Info: \n`, patientInfo);
      setBasicPatientInfo({
        name: patientInfo.fname + " " + patientInfo.lname,
        dob: dateFromTimestamp(patientInfo.birthdate),
        dobTimeStamp: patientInfo.birthdate,
        gender: figureOutGender(patientInfo.gender),
      });
      setIsProcessing(false);
      setFinalPatientAddress(patientAddress);
      setProgress(PROGRESS_STATUSES.RECORD_DETAILS);
    } catch (err) {
      alert("Patient details not found :( \nVerify the address!");
      console.log(err);
      setIsProcessing(false);
      return;
    }
  }

  function goBackToDetails() {
    setIsProcessing(false);
    setProgress(PROGRESS_STATUSES.RECORD_DETAILS);
  }

  function validateInformation() {
    if (!treatment || !medication) {
      alert("Please fill out all the fields !!");
      return;
    }
    console.log("new record details:");
    console.log({
      finalPatientAddress,
      disease,
      treatment,
      medication,
      drname,
      hospitaRecordlID,
      wasAdmitted,
      diagnoseDate,
      dischargeDate,
      uploadedFiles,
    });
    setProgress(PROGRESS_STATUSES.CONFIRM);
  }

  async function sendNewRecord() {
    setIsProcessing(true);
    try {
      const response = await addNewRecord(
        finalPatientAddress,
        disease,
        treatment,
        medication,
        drname,
        hospitaRecordlID,
        wasAdmitted,
        diagnoseDate,
        dischargeDate,
        uploadedFiles,
        auth.wallet.address
      );
      console.log(response);
      setIsProcessing(false);
      if (response) setProgress(PROGRESS_STATUSES.RECIEPT);
    } catch (err) {
      alert("Some error occured during adding new record !!");
      console.log(err);
      setIsProcessing(false);
      return;
    }
  }

  async function printReceipt() {
    print("recordReceipt", "newRecordReceipt");
  }

  if (!auth.loggedIn) return <Redirect to="/login/hospital" />;
  return (
    <HospitalDashboardContainer>
      {modalState && <Backdrop onClick={() => setModalState(false)} />}
      {modalState && (
        <ModalUpload
          closeModal={closeModal}
          // uploadedFiles={Object.values(uploadedFiles)}
          uploadedFiles={uploadedFiles}
          uploadFileHandler={uploadFileHandler}
        />
      )}
      <Left>
        <NavMenuList>
          <ListItems>
            {/* <Navlink to="/newRecord">Dashboard</Navlink> */}
            <Navlink to="/hospitalDashboard">
              <div>
                {/* <Dashboardlogo /> */}
                <Dashboard />
              </div>
              <div>
                <Nbsp />
                Dashboard
              </div>
            </Navlink>
          </ListItems>
          <ListItemsActive>
            <NavlinkActive to="/newRecord">
              <div>
                {/* <UserLogo /> */}
                <AddNewRecordLogo />
              </div>
              <div>
                <Nbsp />
                Add New Record
              </div>
            </NavlinkActive>
          </ListItemsActive>
          <ListItems>
            <Navlink to="/declinedRecords">
              <div>
                <DeclineLogo
                  style={{ width: "15px", height: "15px", marginRight: "5px" }}
                />
              </div>
              <div>
                <Nbsp />
                Declined Records
              </div>
            </Navlink>
          </ListItems>
          <ListItems>
            <Navlink onClick={auth.logout} to="">
              <div>
                <LogoutLogo />
              </div>
              <div>
                {" "}
                <Nbsp />
                Logout
              </div>
            </Navlink>
          </ListItems>
          <ListItems>
            <Navlink to="">
              <div>
                <SettingsLogo />
              </div>
              <div>
                <Nbsp />
                Settings
              </div>
            </Navlink>
          </ListItems>
        </NavMenuList>
        <Note>
          <NotesDiv>
            <NoteTitle>
              Note
              <Nbsp />:
              <Nbsp />
            </NoteTitle>
            <NoteDescription>
              Admin must strictly verify the revelant doucments during the
              registration process
            </NoteDescription>
          </NotesDiv>
        </Note>
      </Left>

      <Center>
        {progress === PROGRESS_STATUSES.PATIENT_ADDRESS ? (
          <KeyInputs
            submitInput={processKeyToDetails}
            isProcessingInput={isProcessing}
          />
        ) : progress === PROGRESS_STATUSES.RECORD_DETAILS ? (
          <>
            <Heading>New record details</Heading>
            <InputContainer>
              <InputSubContainer>
                <TextField
                  label="Name"
                  disabled
                  value={basicPatientInfo.name}
                />
                <TextField
                  label="Diease"
                  required
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                />
                <TextField
                  label="Dr. Name"
                  required
                  value={drname}
                  onChange={(e) => setDrname(e.target.value)}
                />
                <TextField
                  label="Hospital Record ID"
                  required
                  value={hospitaRecordlID}
                  onChange={(e) => setHospitaRecordlID(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={diagnoseDate}
                    onChange={setDiagnoseDate}
                    maxDate={new Date()}
                    required
                    label="Diagnose date"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </InputSubContainer>
              <InputSubContainer>
                <TextField label="DOB" disabled value={basicPatientInfo.dob} />
                <TextField
                  label="Treatment"
                  required
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                />
                <TextField
                  label="Medication"
                  required
                  multiline
                  rows={2}
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                />
                <div>
                  Was Patient Admited ?
                  <Checkbox
                    required
                    checked={wasAdmitted}
                    onChange={(e) => setWasAdmitted(e.target.checked)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={dischargeDate}
                      onChange={setDischargeDate}
                      maxDate={new Date()}
                      disabled={!wasAdmitted}
                      required
                      label="Discharge date"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <br />
                  {/* <input
                    type="file"
                    multiple
                    label="Upload file"
                    accept="image/x-png,image/jpg,image/jpeg,image/png,.pdf"
                    onChange={(e) => {
                      setuploadedFiles(e.target.files);
                      console.log(e.target.files);
                    }}
                  /> */}
                </div>
              </InputSubContainer>
            </InputContainer>
            <Buttons>
              <CoreButton
                onClick={uploadClickHandler} //change to open upload modal
                // style={{ width: "150px", margin: "auto" }}
                background="#387ED1"
              >
                <UploadLogo /> Upload reports
              </CoreButton>
              <CoreButton
                disabled={isProcessing}
                onClick={!isProcessing ? validateInformation : null}
                // style={{ width: "150px", margin: "auto" }}
                background="#38D147"
              >
                {isProcessing ? "Processing..." : "Proceed"}
              </CoreButton>
            </Buttons>
          </>
        ) : progress === PROGRESS_STATUSES.CONFIRM ? (
          <>
            <Confirm>
              <HeadingDiv>
                <ConfirmHeading>Confirm Details : </ConfirmHeading>
              </HeadingDiv>
              <Details>
                <PatientCol>
                  <SubHeading>Patient Details:</SubHeading>
                  <DetailsDiv>
                    <EachDetail>
                      <LeftDetails>
                        <DetailsText>Name</DetailsText>
                      </LeftDetails>
                      <RightDetails>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {basicPatientInfo.name}
                        </DetailsText>
                      </RightDetails>
                    </EachDetail>
                    <EachDetail>
                      <LeftDetails>
                        <DetailsText>Age</DetailsText>
                      </LeftDetails>
                      <RightDetails>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {calculateAge(basicPatientInfo.dobTimeStamp)}
                        </DetailsText>
                      </RightDetails>
                    </EachDetail>
                    <EachDetail>
                      <LeftDetails>
                        <DetailsText>Gender</DetailsText>
                      </LeftDetails>
                      <RightDetails>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {basicPatientInfo.gender}
                        </DetailsText>
                      </RightDetails>
                    </EachDetail>
                  </DetailsDiv>
                </PatientCol>
                <MedicalCol>
                  <SubHeadingMedical>Medical Details:</SubHeadingMedical>
                  <DetailsDiv>
                    <EachDetail>
                      <LeftDetailsMedical>
                        <DetailsText>Disease</DetailsText>
                      </LeftDetailsMedical>
                      <RightDetailsMedical>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {disease}
                        </DetailsText>
                      </RightDetailsMedical>
                    </EachDetail>
                    <EachDetail>
                      <LeftDetailsMedical>
                        <DetailsText>Treatment</DetailsText>
                      </LeftDetailsMedical>
                      <RightDetailsMedical>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {treatment}
                        </DetailsText>
                      </RightDetailsMedical>
                    </EachDetail>
                    <EachDetail>
                      <LeftDetailsMedical>
                        <DetailsText>Medication</DetailsText>
                      </LeftDetailsMedical>
                      <RightDetailsMedical>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {medication}
                        </DetailsText>
                      </RightDetailsMedical>
                    </EachDetail>
                    <EachDetail>
                      <LeftDetailsMedical>
                        <DetailsText>Doctor Name</DetailsText>
                      </LeftDetailsMedical>
                      <RightDetailsMedical>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {drname}
                        </DetailsText>
                      </RightDetailsMedical>
                    </EachDetail>
                    {uploadedFiles.length > 0 &&
                      <EachDetail>
                        <LeftDetailsMedical>
                          <DetailsText>Reports</DetailsText>
                        </LeftDetailsMedical>
                        <RightDetailsMedical>
                          <DetailsText>
                            :<Nbsp />
                            <Nbsp />
                            {uploadedFiles.length}{uploadedFiles.length === 1 ? ' file uploaded' : ' files uploaded'}
                          </DetailsText>
                        </RightDetailsMedical>
                      </EachDetail>
                    }
                    <EachDetail>
                      <LeftDetailsMedical>
                        <DetailsText>Diagnosed Date</DetailsText>
                      </LeftDetailsMedical>
                      <RightDetailsMedical>
                        <DetailsText>
                          :<Nbsp />
                          <Nbsp />
                          {dateFromTimestamp(dateToTimestamp(diagnoseDate))}
                        </DetailsText>
                      </RightDetailsMedical>
                    </EachDetail>
                    {wasAdmitted && (
                      <EachDetail>
                        <LeftDetailsMedical>
                          <DetailsText>Discharge Date</DetailsText>
                        </LeftDetailsMedical>
                        <RightDetailsMedical>
                          <DetailsText>
                            :<Nbsp />
                            <Nbsp />
                            {dateFromTimestamp(dateToTimestamp(dischargeDate))}
                          </DetailsText>
                        </RightDetailsMedical>
                      </EachDetail>
                    )}
                  </DetailsDiv>
                </MedicalCol>
              </Details>
              <Buttons>
                <CoreButton
                  onClick={goBackToDetails}
                  disabled={isProcessing}
                  background="#F23F3F"
                >
                  <BackArrow /> &nbsp; Change
                </CoreButton>
                <CoreButton
                  disabled={isProcessing}
                  onClick={!isProcessing ? sendNewRecord : null}
                  background="#38D147"
                >
                  {isProcessing ? "Processing ...." : "Confirm"}
                </CoreButton>
              </Buttons>
            </Confirm>
          </>
        ) : progress === PROGRESS_STATUSES.RECIEPT ? (
          <div>
            <Preview id="newRecordReceipt">
              <center>
                <RecieptHeading>
                  New Record Successfully Created
                  <Nbsp />
                  <GreenTick />
                </RecieptHeading>
              </center>
              <RecieptContainer>
                <Reciept>
                  <RecieptDetails>
                    <ReceiptDetailHead>Details</ReceiptDetailHead>
                    <ReceiptDetailsBody>
                      <EachDetail>
                        <RecieptLeftDetail>Name</RecieptLeftDetail>
                        <RecieptRightDetail>
                          :<Nbsp />
                          <Nbsp />
                          {basicPatientInfo.name}
                        </RecieptRightDetail>
                      </EachDetail>
                      <EachDetail>
                        <RecieptLeftDetail>Diagnosis</RecieptLeftDetail>
                        <RecieptRightDetail>
                          :<Nbsp />
                          <Nbsp />
                          {disease}
                        </RecieptRightDetail>
                      </EachDetail>
                      <EachDetail>
                        <RecieptLeftDetail>Doctor</RecieptLeftDetail>
                        <RecieptRightDetail>
                          :<Nbsp />
                          <Nbsp />
                          {drname}
                        </RecieptRightDetail>
                      </EachDetail>
                    </ReceiptDetailsBody>
                  </RecieptDetails>
                  <RecieptQR>
                    <center>
                      <RecieptQrHead>
                        Scan this QR code to view the record
                      </RecieptQrHead>
                      <RecieptQrLogo>
                        <QRCode size={100} value="123" fgColor="#101010" />
                      </RecieptQrLogo>
                    </center>
                  </RecieptQR>
                </Reciept>
              </RecieptContainer>
            </Preview>
            <Buttons>
              <RecieptButton
                onClick={printReceipt}
                background="#ffde00"
                color="#202020"
              >
                Print Reciept
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <PrintIcon />
              </RecieptButton>
              <RecieptButton
                onClick={(e) => props.history.push("/dashboard")}
                background="#ffde00"
                color="#202020"
              >
                Go to Dashboard
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <Nbsp />
                <HomeIcon />
              </RecieptButton>
            </Buttons>
          </div>
        ) : (
          "Something went wrong !!"
        )}
      </Center>
      <Right>
        <div>
          <center>
            <HospitalStyling>
              <HospitalLogo />
            </HospitalStyling>
          </center>
        </div>
        <div>
          <center>
            <Name>{hospitalInfo.name}</Name>
            <br />
            <TitleHosp>
              Hospital <TickMark />
            </TitleHosp>
            <br />
            <QRCode size={100} value={auth.wallet.address} fgColor="#101010" />
          </center>
        </div>
        <center>
          <HopitalCard>
            <HospCardHeading>
              <Circle>{getInitials(hospitalInfo.name)}</Circle>
              <HospitalCardName>{hospitalInfo.name}</HospitalCardName>
            </HospCardHeading>
            <HospCardDetails>
              <HospCardReg>
                <div>
                  Reg No.
                  <Nbsp />:
                  <Nbsp />
                </div>
                <div>
                  <Nbsp />
                  {hospitalInfo.govtLicenseNumber}
                </div>
              </HospCardReg>
              <HospCardAdd>
                <div>
                  Address
                  <Nbsp />:
                  <Nbsp />
                </div>
                <div>{hospitalInfo.Address}</div>
              </HospCardAdd>
            </HospCardDetails>
            <HospCardRow3>
              <FCName>FC Card</FCName>
            </HospCardRow3>
          </HopitalCard>
        </center>
      </Right>
    </HospitalDashboardContainer>
  );
};

export default NewRecord;
