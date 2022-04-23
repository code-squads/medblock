import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import Nbsp from "../utils/nbsp";
import { getInitials } from "../utils/dataUtils";
import { useAuth } from "../services/authorization";

import { getDeclinedRecordList } from "../apis/declinedRecords";

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

import { ReactComponent as Dashboard } from "../assets/icons/hospital/Dashboard.svg";
import { ReactComponent as AddNewRecordLogo } from "../assets/icons/hospital/AddNewRecordBlue.svg";
import { ReactComponent as LogoutLogo } from "../assets/icons/hospital/logouticon.svg";
import { ReactComponent as SettingsLogo } from "../assets/icons/hospital/settingsicon.svg";
import { ReactComponent as HospitalLogo } from "../assets/icons/hospital/hospital.svg";
import { ReactComponent as TickMark } from "../assets/icons/hospital/greentick.svg";
import { ReactComponent as DeclineLogo } from "../assets/icons/hospital/Decline.svg";
import DeclinedRecordsList from "../components/DeclinedRecordsList";
import { Backdrop } from "../pages/PatientDashboard.styled";
import Modal from "../components/ModalDeclinedRecords";

const DeclinedRecords = (props) => {
  const auth = useAuth();
  const hospitalInfo = auth?.entityInfo;

  const [modalState, setModalState] = useState(false);

  const [declinedRecords, setDeclinedRecords] = useState(undefined);

  const [refresh, setRefresh] = useState();

  useEffect(() => {
    if (!auth.wallet || !auth.wallet.address) return;
    getDeclinedRecordList(auth.wallet.address)
      .then(setDeclinedRecords)
      .catch((err) => {
        console.log(err);
        console.log(
          `Some error occured while fetching the declined records for hospital ${auth.wallet.address}`
        );
      });
  }, [auth, refresh]);

  function onRecordDismissed() {
    setRefresh(Number(new Date()));
  }

  console.log(declinedRecords);
  //   const Dummy = [
  //     {
  //         patientName: 'Rupesh',
  //         disease: 'Left hand fracture',
  //         declineMessage: 'Right hand fracture not left',
  //         recordID: '1234',
  //         DrName: "Dr. Johny Liver",
  //         diagnoseDate: "1638942973",
  //         dischargeDate: "0",
  //         disease: "Abdominal Pain",
  //         hospitalRecordID: "021",
  //         medication: "Cyclopam, Unienzyme",
  //         medicationList: ['Cyclopam', ' Unienzyme'],
  //         patient: "0xD33BeE6DaAe523695592858346e35343Be16F6f2",
  //         recordID: 12,
  //         senderHospital: "0xD766DF5CcD4F7C73e0d2dc4d9f9a32616fdD7400",
  //         treatment: "Medications",
  //     }
  // ]

  //Data required on our modal
  // disease
  // recordId
  // dischargeDate,
  // diagnoseDate,
  // DrName,
  // treatment,
  //hospitalRecordID,
  //medicationList,
  //senderHospital

  if (!auth || !hospitalInfo) return <Redirect to="/" />;

  return (
    <HospitalDashboardContainer>
      {modalState && <Backdrop onClick={() => setModalState(false)} />}
      {modalState && (
        <Modal
          hospitalAddress={auth.wallet.address}
          medicalHistory={true}
          modalState={modalState}
          setModalState={setModalState}
          onRecordDismissed={onRecordDismissed}
        />
      )}
      <Left>
        <NavMenuList>
          <ListItems>
            <Navlink to="/hospitalDashboard">
              <div>
                <Dashboard />
              </div>
              <div>
                <Nbsp />
                Dashboard
              </div>
            </Navlink>
          </ListItems>
          <ListItems>
            <Navlink to="/newRecord">
              <div>
                <AddNewRecordLogo />
              </div>
              <div>
                <Nbsp />
                Add New Record
              </div>
            </Navlink>
          </ListItems>
          <ListItemsActive>
            <NavlinkActive to="/declinedRecords">
              <div>
                <DeclineLogo
                  style={{ width: "15px", height: "15px", marginRight: "5px" }}
                />
              </div>
              <div>
                <Nbsp />
                Declined Records
              </div>
            </NavlinkActive>
          </ListItemsActive>
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
        <DeclinedRecordsList
          data={declinedRecords}
          setModalState={(item) =>
            setModalState({
              ...item,
              senderHospital: auth.wallet.address,
            })
          }
        />
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

export default DeclinedRecords;
