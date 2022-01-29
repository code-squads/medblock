import React from "react";
import { Redirect } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";

import { useAuth } from "../services/authorization";
import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import { getInitials } from "../utils/dataUtils";
import Nbsp from "../utils/nbsp";

import {
  AdminDashboardContainer,
  Left,
  LeftHead,
  Center,
  Right,
  Row1,
  Row2,
  Row3,
  HospitalSVG,
  UserSVG,
  SecuritySVG,
  GraphSVG,
  DoctorSVG,
  Navlink,
  NavlinkActive,
  NavMenuList,
  ListItems,
  ListItemsActive,
  Note,
  NotesDiv,
  NoteTitle,
  NoteDescription,
  AdminStyling,
  TitleAdmin,
  Name,
  AdminCard,
  AdminHeading,
  AdminCardName,
  Circle,
  AdminCardDetails,
  AdminCardReg,
  AdminCardAdd,
  AdminCardRow3,
  FCName,
} from "./AdminDashboard.styled";

import { ReactComponent as Dashboardlogo } from "../assets/icons/admin/dashboardicon.svg";
import { ReactComponent as LogoutLogo } from "../assets/icons/admin/logouticon.svg";
import { ReactComponent as UserLogo } from "../assets/icons/admin/usericon.svg";
import { ReactComponent as SettingsLogo } from "../assets/icons/admin/settingsicon.svg";
import { ReactComponent as HospitalLogo } from "../assets/icons/admin/AddHospicon.svg";
import { ReactComponent as WaivingEmoji } from "../assets/icons/admin/waivinghand.svg";

import { ReactComponent as AdminLogo } from "../assets/icons/admin/AdminProfile.svg";
import { ReactComponent as TickMark } from "../assets/icons/admin/greentick.svg";

import { ReactComponent as HospRegs } from "../assets/icons/admin/RegHospitals.svg";
import { ReactComponent as UserRegs } from "../assets/icons/admin/RegUsers.svg";
import { ReactComponent as Security } from "../assets/icons/admin/security.svg";
import { ReactComponent as Graph } from "../assets/icons/admin/Graph.svg";
import { ReactComponent as Doctor } from "../assets/icons/admin/doctor.svg";

const AdminDashboard = () => {
  const auth = useAuth();
  const adminInfo = auth.entityInfo;
  console.log(adminInfo);

  if (!auth.loggedIn) return <Redirect to="/login/admin" />;

  if (auth.authority !== AUTHORITY_TYPES.ADMIN) return <Redirect to="/" />;

  return (
    <AdminDashboardContainer>
      <Left>
        <LeftHead>
          Hi, admin
          <Nbsp />
          <WaivingEmoji />
          <Nbsp />
          {/* Admin name */}
        </LeftHead>
        <NavMenuList>
          <ListItemsActive>
            {/* <Navlink to="/newRecord">Dashboard</Navlink> */}
            <NavlinkActive to="/adminDashboard">
              <div>
                <Dashboardlogo />
                <Nbsp />
              </div>
              <div>
                <Nbsp />
                Dashboard
              </div>
            </NavlinkActive>
          </ListItemsActive>
          <ListItems>
            <Navlink to="/newPatient">
              <div>
                <UserLogo />
                <Nbsp />
              </div>
              <div>
                <Nbsp />
                User Registration
              </div>
            </Navlink>
          </ListItems>
          <ListItems>
            <Navlink to="/newHospital">
              <div>
                <HospitalLogo />
                <Nbsp />
              </div>
              <div>
                <Nbsp />
                Hospital Registration
              </div>
            </Navlink>
          </ListItems>
          <ListItems>
            <Navlink onClick={auth.logout} to="">
              <div>
                <LogoutLogo />
                <Nbsp />
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
                <Nbsp />
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
          <HospitalSVG>
            <HospRegs />
          </HospitalSVG>
          <UserSVG>
            <UserRegs />
          </UserSVG>
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
            <AdminStyling>
              <AdminLogo />
            </AdminStyling>
          </center>
        </div>
        <div>
          <center>
            <Name>{adminInfo.name}</Name>
            <br />
            <TitleAdmin>
              Admin <TickMark />
            </TitleAdmin>
            <br />
            <QRCode size={100} value={auth.wallet.address} fgColor="#101010" />
          </center>
        </div>
        <center>
          <AdminCard>
            <AdminHeading>
              <Circle>{getInitials(adminInfo.name)}</Circle>
              <AdminCardName>{adminInfo.name}</AdminCardName>
            </AdminHeading>
            <AdminCardDetails>
              <AdminCardReg>
                <div>
                  Reg No.
                  <Nbsp />:
                  <Nbsp />
                </div>
                <div>
                  <Nbsp />
                  {adminInfo.registeredNumber}
                </div>
              </AdminCardReg>
              <AdminCardAdd>
                <div>
                  Address
                  <Nbsp />:
                  <Nbsp />
                </div>
                <div>{adminInfo.residentialAddress}</div>
              </AdminCardAdd>
            </AdminCardDetails>
            <AdminCardRow3>
              <FCName>FC Card</FCName>
            </AdminCardRow3>
          </AdminCard>
        </center>
      </Right>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
