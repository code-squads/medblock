import styled from "styled-components";
import { Link } from "react-router-dom";

export const AdminDashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #404040;
  font-family: "Inter";
  height: calc(100vh - 56px);
`;

// Left Div :

export const Left = styled.div`
  width: 18%;
  min-height: 100%;
  /* background-color: cyan; */
  border-right: 2px solid #d1d5d8;
`;

export const LeftHead = styled.div`
  margin-top: 2rem;
  margin-left: 1.25rem;
  padding-bottom: 1rem;
  color: #202020;
  font-size: 20px;
  font-weight: 400;
`;

export const Navlink = styled(Link)`
  color: #404040;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

export const NavlinkActive = styled(Link)`
  color: #404040;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 0.9rem;
`;

export const NavMenuList = styled.ul`
  font-size: 16px;
  font-weight: 400;
  margin-top: 20px;
  list-style: none;
  padding-left: 0rem;
  display: flex;
  flex-direction: column;
`;

export const ListItems = styled.li`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const ListItemsActive = styled.li`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-left: 4px solid #387ed1;
  border-radius: 2px;
  margin-left: 0.1rem;
`;

export const Note = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 4rem;
`;

export const NotesDiv = styled.div`
  line-height: 12px;
  display: flex;
  border-left: 2px solid #c93636;
  padding-left: 0.2rem;
`;

export const NoteTitle = styled.text`
  color: #c93636;
  font-size: 10px;
`;
export const NoteDescription = styled.text`
  font-size: 10px;
`;

// Center Div :

export const Center = styled.div`
  position: relative;
  width: 62%;
  min-height: 100%;
  border-right: 2px solid #d1d5d8;
  display: flex;
  flex-direction: column;
`;

export const Row1 = styled.div`
  margin-top: 2rem;
`;

export const Row2 = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

export const Row3 = styled.div``;

export const HospitalSVG = styled.span`
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const UserSVG = styled.span``;

export const SecuritySVG = styled.span`
  margin-top: 1rem;
  margin-right: 2rem;
`;

export const GraphSVG = styled.span`
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const DoctorSVG = styled.span`
  padding-left: 4rem;
`;

// Right Div :

export const Right = styled.div`
  width: 25%;
  min-height: 100%;
  align-content: center;
  /* background-color: cyan; */
`;

export const AdminStyling = styled.div`
  margin-top: 50px;
  padding-bottom: 10px;
`;

export const Name = styled.text`
  color: #202020;
  font-weight: 400;
  font-size: 18px;
`;

export const TitleAdmin = styled.text`
  padding-top: 8px;
  color: #404040;
  font-size: 15px;
  padding-bottom: 10px;
`;

export const AdminCard = styled.div`
  width: 17rem;
  margin-top: 3rem;
  margin-left: 2rem;
  margin-right: 1rem;
  box-shadow: 0px 1px 5px 0px #787878;
  /* display: flex; */
  /* justify-content: center; */
`;

export const AdminHeading = styled.div`
  display: flex;
  align-items: center;
`;

export const AdminCardName = styled.text`
  color: #202020;
  font-weight: 400;
  font-size: 16px;
  margin-top: 8px;
  margin-left: 5px;
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: #151e28;
  color: white;
`;

export const AdminCardDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

export const AdminCardReg = styled.text`
  color: #202020;
  font-weight: 400;
  font-size: 10px;
  display: flex;
`;

export const AdminCardAdd = styled.text`
  color: #202020;
  font-weight: 400;
  font-size: 10px;
  display: flex;
`;

export const AdminCardRow3 = styled.div`
  width: 100%;
  align-items: flex-end;
  text-align: right;
  padding: 15px;
`;

export const FCName = styled.text`
  color: #505050;
  font-weight: 400;
  font-size: 14px;
`;
