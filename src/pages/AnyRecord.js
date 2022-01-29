import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import QrReader from "react-qr-reader";

import basicInfo from "../assets/illustrations/basicInfo2.png";
import KeyImage from "../assets/icons/general/Key.png";
import CoreButton from "../components/core/Button";
import { isValidAddress } from "../utils/keyValidator";
import { getPatientPersonalInfo } from "../apis/medblock";
import {
  AppNameContainer,
  AppOveriewIllustration,
  ButtonContainer,
  Container,
  CreateAccountText,
  Heading,
  OrDiv,
  PageName,
  ScanOrButton,
  ScanOrButtonMobile,
  SubContainer1,
  SubContainer2,
  SubHeading,
  TextFieldContainer,
} from "./Login.styled";
import styled from "styled-components";

const HeadingConatiner = styled.div`
  width: 70%;
  margin-top: 60px;
  font-size: 24px;
  color: #404040;
  @media (max-width: 600px) {
    width: 85%;
    font-size: 20px;
  }
`;

const AnyRecord = () => {
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openWebcamMobile, setOpenWebcamMobile] = useState(false);

  function onShowClickHandler() {
    setIsProcessing(true);
    const isPkValid = isValidAddress(address);
    if (isPkValid) {
      getPatientPersonalInfo(address)
        .then((res) => {
          history.push({
            pathname: "/anyRecordDisplay",
            state: {
              patientBlockchainAddress: address,
            },
          });
        })
        .catch((err) => {
          alert("Patient address entered is wrong");
        });
      return;
    }
    alert("Sorry, that's not a valid patient Address !");
    setIsProcessing(false);
  }

  const onHandlerErrWebcam = (error) => {
    console.log(error);
  };

  const onHandlerResultWebcam = (result) => {
    if (result) {
      setAddress(result);
      setOpenWebcam(false);
      setOpenWebcamMobile(false);
    }
  };

  return (
    <Container>
      <SubContainer1>
        <AppNameContainer>
          <img src={basicInfo} alt="About medblock" />
          <Heading>Decentralized platform</Heading>
          <SubHeading>to store your medical history</SubHeading>
        </AppNameContainer>
        {!openWebcam && <AppOveriewIllustration />}
        {openWebcam && (
          <QrReader
            style={{
              width: "50%",
              marginTop: "40px",
              border: "solid black 1px",
            }}
            delay={300}
            onError={onHandlerErrWebcam}
            onScan={onHandlerResultWebcam}
          />
        )}
      </SubContainer1>
      <SubContainer2>
        <HeadingConatiner>
          View anyone’s record with their
          <PageName style={{ marginTop: "0px", fontSize: "36px" }}>
            Address
            <img
              style={{ width: "35px", marginTop: "-10px" }}
              src={KeyImage}
              alt="Key"
            />
          </PageName>
        </HeadingConatiner>
        {openWebcamMobile && (
          <QrReader
            style={{
              width: "60%",
              marginTop: "40px",
              border: "solid black 1px",
            }}
            delay={300}
            onError={onHandlerErrWebcam}
            onScan={onHandlerResultWebcam}
          />
        )}
        {!openWebcamMobile && (
          <TextFieldContainer>
            <TextField
              label="Address"
              required
              fullWidth
              autoComplete="nope"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </TextFieldContainer>
        )}
        {!openWebcamMobile && <OrDiv>Or</OrDiv>}
        <ButtonContainer>
          <ScanOrButton onClick={() => setOpenWebcam(!openWebcam)}>
            {openWebcam ? "Close Camera" : "Scan QR"}
          </ScanOrButton>
          <ScanOrButtonMobile
            onClick={() => setOpenWebcamMobile(!openWebcamMobile)}
          >
            {openWebcamMobile ? "Close Camera" : "Scan QR"}
          </ScanOrButtonMobile>
        </ButtonContainer>
        <CoreButton
          disabled={isProcessing}
          style={{ marginTop: "80px" }}
          onClick={!isProcessing ? onShowClickHandler : null}
        >
          {isProcessing ? (
            <>
              Processing..... &nbsp;&nbsp;
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </>
          ) : (
            "Show"
          )}
        </CoreButton>
        <CreateAccountText>
          New user? visit nearest center to register yourself
        </CreateAccountText>
      </SubContainer2>
    </Container>
  );
};

export default AnyRecord;
