import styled from "styled-components";
import MedBlockLogo from "../assets/LandingPage/MedBlockLogo.svg";
import Hamburger from "../assets/LandingPage/Hamburger.svg";
import DoctorNurse from "../assets/LandingPage/DoctorAndNurse.svg";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: white;
  font-family: "Inter";
  cursor: pointer;
`;
export const Logo = styled.img.attrs({
  src: `${MedBlockLogo}`,
})`
  height: 45px;
  margin-left: 43px;
  margin-top: -10px;
  @media (max-width: 700px) {
    height: 35px;
    margin-left: 20px;
  }
`;
export const AppName = styled.div`
  font-family: "Inter";
  font-size: 28px;
  font-weight: 500;
  color: #404040;
  margin-left: 13px;
  @media (max-width: 700px) {
    font-size: 20px;
    margin-left: 10px;
  }
`;
export const Home = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  color: #404040;
  margin-left: auto;
  margin-right: 50px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const About = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #404040;
  margin-right: 50px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const BlueLine = styled.div`
  width: 30px;
  height: 2px;
  background-color: #387ed1;
  margin: auto;
`;
export const Login = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #404040;
  margin-right: 70px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
  opacity: 0.25;
  z-index: 2;
  background-color: #000000;
`;
export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 23px;
  align-self: baseline;
  margin-top: 18px;
  overflow: hidden;
  z-index: 3;
  height: ${(props) => (props.open ? 131 : 21)}px;
  -webkit-transition: height 400ms ease-in-out;
  -moz-transition: height 400ms ease-in-out;
  -o-transition: height 400ms ease-in-out;
  transition: height 400ms ease-in-out;
  @media (min-width: 700px) {
    display: none;
  }
`;
export const Menu = styled.img.attrs({
  src: `${Hamburger}`,
})`
  width: 21px;
  margin-left: auto;
  z-index: 3;
  @media (min-width: 700px) {
    display: none;
  }
`;
export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 110px;
  height: 45px;
  margin-top: 20px;
  background-color: white;
  border: solid rgba(99, 99, 99, 0.2) 1px;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  word-wrap: break-word;
  @media (min-width: 700px) {
    display: none;
  }
`;
export const DropdownItem = styled.div`
  font-family: "Inter";
  font-size: 16px;
  font-weight: 400;
  color: #404040;
  padding-left: 10px;
`;
export const SubContainer1 = styled.div`
  height: calc(100vh - 56px);
  font-family: "Inter";
  @media (max-width: 700px) {
    height: auto;
  }
`;
export const SubContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  height: 55%;
  width: 100%;
  @media (max-width: 700px) {
    height: auto;
    flex-direction: column;
  }
`;
export const SubContainer3 = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Slogan = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #404040;
  line-height: 39px;
  margin-top: 70px;
  margin-left: 78px;
  @media (max-width: 700px) {
    margin-left: 23px;
    margin-top: 30px;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
  }
`;
export const Slogan2 = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #404040;
  line-height: 17px;
  margin-top: 10px;
  margin-left: 78px;
  @media (max-width: 700px) {
    margin-left: 23px;
    margin-top: 10px;
    font-size: 12px;
    line-height: 14px;
  }
`;
export const ButtonContainer = styled.div`
  width: 300px;
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 60px;
  margin-left: 78px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const GetStartedButton = styled.button`
  background-color: transparent;
  outline: none;
  color: #202020;
  border: solid #505050 1px;
  border-radius: 3px;
  width: 130px;
  height: 36px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const SubContainerMobile = styled.div`
  height: 160px;
  display: flex;
  flex-direction: row;
  @media (min-width: 700px) {
    display: none;
  }
`;
export const ButtonContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 23px;
  margin-top: 30px;
  font-size: 12px;
  width: 96px;
  height: 62px;
`;
export const GetStartedButtonMobile = styled.button`
  background-color: transparent;
  outline: none;
  color: #202020;
  border: solid #505050 1px;
  border-radius: 3px;
  width: 96px;
  height: 26px;
`;
export const DoctorNurseIllustration = styled.img.attrs({
  src: `${DoctorNurse}`,
})`
  margin-top: 60px;
  margin-bottom: 85px;
  margin-left: auto;
  margin-right: 70px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const DoctorNurseIllustrationMobile = styled.img.attrs({
  src: `${DoctorNurse}`,
})`
  margin-left: auto;
  margin-right: 30px;
  width: 200px;
`;
export const SubContainer4 = styled.div`
  height: 45%;
  @media (max-width: 700px) {
    height: auto;
  }
`;
export const SubContainer5 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 90%;
  width: 100%;
  background-color: #f9f9f9;
  @media (max-width: 700px) {
    flex-direction: column;
    height: 650px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;
export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  height: 70%;
  @media (max-width: 700px) {
    width: 50%;
    height: 180px;
  }
`;
export const Image = styled.img`
  width: 140px;
`;
export const SpecialityText = styled.div`
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  color: #303030;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;
export const LoginText = styled.div`
  text-align: center;
  font-size: 28px;
  font-weight: 400;
  color: #303030;
  @media (max-width: 700px) {
    font-size: 22px;
    font-weight: 500;
    margin-top: 20px;
  }
`;
export const LoginFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 240px;
  width: 100%;
  margin-top: 50px;
  padding-left: 3%;
  padding-right: 3%;
  box-sizing: border-box;
  margin-bottom: 50px;
  @media (max-width: 700px) {
    margin-bottom: 0px;
    width: 100%;
    flex-wrap: wrap;
    row-gap: 25px;
    height: auto;
    margin-top: 20px;
    padding-left: 4%;
    padding-right: 4%;
    margin-bottom: 30px;
  }
`;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: #f5f5f5;
  border: solid #e5dede 0.5px;
  border-radius: 10px;
  :hover {
    background-color: #ffe956;
  }
  @media (max-width: 700px) {
    width: 43%;
    height: 150px;
  }
  cursor: pointer;
`;
export const LoginImage = styled.img`
  width: 140px;
  @media (max-width: 700px) {
    width: 90px;
  }
`;
export const LoginButton = styled.button`
  background-color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 70%;
  font-size: 18px;
  color: #303030;
  @media (max-width: 700px) {
    font-size: 14px;
    width: 80%;
  }
`;
export const Footer = styled.div`
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #0a2351;
  color: white;
  @media (max-width: 700px) {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
`;
