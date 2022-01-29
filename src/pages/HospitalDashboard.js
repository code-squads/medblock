import React from "react";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import Nbsp from "../utils/nbsp";

import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import { useAuth } from "../services/authorization";
import { getInitials } from "../utils/dataUtils";

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
  Row1,
  Row2,
  Row3,
  MedicalSVG,
  DiagnosedSVG,
  SecuritySVG,
  GraphSVG,
  DoctorSVG,
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

import { ReactComponent as Dashboardlogo } from "../assets/icons/admin/dashboardicon.svg";
import { ReactComponent as LogoutLogo } from "../assets/icons/admin/logouticon.svg";
import { ReactComponent as UserLogo } from "../assets/icons/admin/usericon.svg";
import { ReactComponent as SettingsLogo } from "../assets/icons/admin/settingsicon.svg";
import { ReactComponent as DeclineLogo } from "../assets/icons/hospital/Decline.svg";

import { ReactComponent as HospitalLogo } from "../assets/icons/hospital/hospital.svg";
import { ReactComponent as TickMark } from "../assets/icons/admin/greentick.svg";

import { ReactComponent as MedStaff } from "../assets/icons/hospital/MedStaff.svg";
import { ReactComponent as Diagnosed } from "../assets/icons/hospital/diagnosed.svg";
import { ReactComponent as Security } from "../assets/icons/admin/security.svg";
import { ReactComponent as Graph } from "../assets/icons/hospital/graph.svg";
import { ReactComponent as Doctor } from "../assets/icons/admin/doctor.svg";

const HospitalDashboard = () => {
  const auth = useAuth();
  const hospitalInfo = auth.entityInfo;

  if (!auth.loggedIn || !auth.entityInfo || !auth.wallet || !auth.authority) {
    auth.logout();
    return <Redirect to="/login/hospital" />;
  }

  if (auth.authority !== AUTHORITY_TYPES.HOSPITAL) return <Redirect to="/" />;

  return (
    <HospitalDashboardContainer>
      <Left>
        <NavMenuList>
          <ListItemsActive>
            {/* <Navlink to="/newRecord">Dashboard</Navlink> */}
            <Navlink to="/hospitalDashboard">
              <div>
                <Dashboardlogo />
              </div>
              <div>
                <Nbsp />
                Dashboard
              </div>
            </Navlink>
          </ListItemsActive>
          <ListItems>
            <NavlinkActive to="/newRecord">
              <div>
                <UserLogo />
              </div>
              <div>
                <Nbsp />
                Add New Record
              </div>
            </NavlinkActive>
          </ListItems>
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
            <Navlink to="#">
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
        <Row1>
          <MedicalSVG>
            <MedStaff />
          </MedicalSVG>
          <DiagnosedSVG>
            <Diagnosed />
          </DiagnosedSVG>
        </Row1>
        <Row2>
          <SecuritySVG>
            <Security />
          </SecuritySVG>
        </Row2>
        <Row3>
          <GraphSVG>
            <Graph />
          </GraphSVG>
          <DoctorSVG>
            <Doctor />
          </DoctorSVG>
        </Row3>
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

export default HospitalDashboard;
