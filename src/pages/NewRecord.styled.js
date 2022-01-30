import styled from "styled-components";
import { CoreButton } from "../components/core";

export const Confirm = styled.div`
  margin-top: 4rem;
  margin-left: 1rem;
`;

export const ConfirmHeading = styled.text`
  /* font-family: "Roboto"; */
  font-size: 24px;
  font-weight: 500;
  color: #000000;
`;

export const HeadingDiv = styled.div`
  margin-left: 1rem;
  padding-bottom: 0.5rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  margin-top: 0.5rem;
  margin-right: 1rem;
  border: 2px solid #d9d9d9;
  /* height: 30rem; */
  width: auto;
`;

export const PatientCol = styled.div`
  /* display: flex; */
  width: 42%;
  margin-top: 1rem;
  margin-left: 1rem;
`;

export const MedicalCol = styled.div`
  /* display: flex; */
  margin-left: 1rem;
  margin-top: 1rem;
  width: 58%;
  margin-right: 2rem;
  padding-bottom: 4rem;
`;

export const SubHeading = styled.div`
  margin-left: 1rem;
  font-size: 20px;
  line-height: 2.5rem;
  font-weight: 500;
  color: #000000;
  border-bottom: 1px solid #000000;
  stroke-opacity: 50%;
  border-spacing: 10px;
  width: 75%;
`;

export const SubHeadingMedical = styled.div`
  margin-left: 1rem;
  font-size: 20px;
  line-height: 2.5rem;
  font-weight: 500;
  color: #000000;
  border-bottom: 1px solid #000000;
  stroke-opacity: 50%;
  border-spacing: 10px;
  width: 75%;
`;

export const DetailsText = styled.text`
  font-size: 20px;
  font-weight: 400;
  color: #000000;
`;

export const DetailsDiv = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const EachDetail = styled.div`
  display: flex;
  flex-direction: row;
  /* padding-top: 0.5rem; */
  /* justify-content: space-around; */
`;

export const LeftDetails = styled.div`
  width: 2rem;
  margin-left: 1rem;
  /* display: flex; */
`;

export const LeftDetailsMedical = styled.div`
  width: 10rem;
  margin-left: 1rem;
  /* display: flex; */
`;

export const RightDetails = styled.div`
  /* display: flex; */
  align-self: flex-end;
  margin-left: 5rem;
`;

export const RightDetailsMedical = styled.div`
  /* display: flex; */
  align-self: flex-end;
  margin-left: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 1.5rem;
`;

export const Heading = styled.div`
  font-size: 24px;
  margin: auto;
  margin-top: 55px;
  margin-bottom: 0;
`;

export const InputContainer = styled.div`
  margin: auto;
  margin-top: 25px;
  margin-bottom: 5px;
  width: 80%;
  height: 55%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const InputSubContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RecieptHeading = styled.div`
  font-size: 28px;
  /* line-height: 2.5rem; */
  font-weight: 400;
  color: #404040;
  margin-top: 4rem;
  padding-bottom: 1rem;
`;

export const Reciept = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

export const RecieptContainer = styled.div`
  margin-top: 1rem;
  margin-left: 5rem;
  margin-right: 5rem;
  border: 1px solid #404040;
`;

export const RecieptDetails = styled.div`
  border-right: 1px solid #404040;
  height: 15rem;
  width: 60%;
`;

export const ReceiptDetailHead = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 2.5rem;
  color: #000000;
  border-bottom: 1px solid #000000;
  margin-left: 2rem;
  margin-top: 0.5rem;
  width: 20rem;
`;

export const ReceiptDetailsBody = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  font-size: 20px;
  font-weight: 400;
  color: #000000;
`;

export const RecieptLeftDetail = styled.div`
  margin-left: 1rem;
  width: 7.5rem;
`;

export const RecieptRightDetail = styled.div``;

export const RecieptQR = styled.div`
  margin-top: 0.5rem;
  width: 40%;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
`;

export const RecieptQrHead = styled.div`
  font-size: 18px;
  font-weight: 400;
  /* line-height: 2.5rem; */
  color: #000000;
  margin-left: 2rem;
  margin-right: 1rem;
`;

export const RecieptQrLogo = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`;

export const RecieptButton = styled(CoreButton)`
  /* font-size: 16px; */
  align-self: center;
  margin-top: 1rem;
  /* width: 45%; */
`;