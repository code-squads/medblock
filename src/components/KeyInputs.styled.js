import styled from "styled-components";
import AppOverview from "../assets/illustrations/appOverview.png";
import { CoreButton } from "./core";

export const Container = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
  display: block;
  /* display: flex; */
  /* flex-direction: row; */
`;
export const SubContainer1 = styled.div`
  width: 95%;
  display: block;
  align-items: center;
  /* flex-direction: column; */
  /* @media (max-width: 1000px) {
    display: none;
} */
`;
export const AppNameContainer = styled.div`
  position: relative;
  font-family: "Inter";
  margin-top: 50px;
`;
export const Heading = styled.span`
  position: absolute;
  margin: auto;
  top: 10px;
  left: 15px;
  right: 0;
  text-align: center;
  font-size: 28px;
  font-weight: 400px;
  color: #404040;
`;
export const SubHeading = styled.span`
  position: absolute;
  top: 45px;
  left: 15px;
  right: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #606060;
`;
export const AppOveriewIllustration = styled.img.attrs({
  src: `${AppOverview}`,
})`
  margin-top: auto;
  margin-bottom: 65px;
`;
export const SubContainer2 = styled.div`
  width: 95%;
  display: block;
  /* flex-direction: column; */
  align-items: center;
  font-family: "Inter";
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const PageName = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: #404040;
  margin-top: 70px;
`;
export const TextFieldContainer = styled.div`
  width: 70%;
  max-width: 500px;
  margin-top: 100px;
  @media (max-width: 600px) {
    width: 85%;
  }
`;
export const OrDiv = styled.div`
  margin-top: 30px;
`;
export const ButtonContainer = styled.div`
  width: 70%;
  max-width: 500px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
    row-gap: 30px;
    width: 80%;
  }
`;

export const ScanOrButton = styled(CoreButton)`
  color: #202020;
  background-color: #ffde00;
  font-size: 16px;
  width: 45%;
  @media (max-width: 1000px) {
    /* width: 100%; */
    display: none;
  }
`;
export const ScanOrButtonMobile = styled(CoreButton)`
  color: #202020;
  background-color: #ffde00;
  font-size: 16px;
  width: 45%;
  @media (min-width: 1000px) {
    display: none;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
export const CreateAccountText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #606060;
  margin-top: 12px;
`;
