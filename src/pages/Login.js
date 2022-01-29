import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCamera } from "@fortawesome/free-solid-svg-icons";
import QrReader from "react-qr-reader";

import basicInfo from "../assets/illustrations/basicInfo2.png";
import CoreButton from "../components/core/Button";
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

const PatientLogin2 = () => {
  const [pk, setPK] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openWebcamMobile, setOpenWebcamMobile] = useState(false);

  const { type } = useParams();
  function login() {
    setIsLoggingIn(true);
  }

  const onHandlerErrWebcam = (error) => {
    console.log(error);
  };

  const onHandlerResultWebcam = (result) => {
    if (result) {
      setPK(result);
      setOpenWebcam(false);
      setOpenWebcamMobile(false);
    }
  };

  return (
    <Container>
      <SubContainer1>
        <AppNameContainer>
          <img src={basicInfo} alt="Medblock" />
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
        <PageName>
          {type === "patient"
            ? "Patient"
            : type === "hospital"
            ? "Hospital"
            : "Admin"}{" "}
          Login
        </PageName>
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
              label="Private Key"
              required
              fullWidth
              autoComplete="nope"
              value={pk}
              onChange={(e) => setPK(e.target.value)}
            />
          </TextFieldContainer>
        )}
        {!openWebcamMobile && <OrDiv>Or</OrDiv>}
        <ButtonContainer>
          <ScanOrButton onClick={() => setOpenWebcam(!openWebcam)}>
            {
              openWebcam ? 
              "Close Camera" : 
              <>
                Scan QR &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCamera} />
              </>
            }
          </ScanOrButton>
          <ScanOrButtonMobile
            onClick={() => setOpenWebcamMobile(!openWebcamMobile)}
          >
            {
              openWebcamMobile ? 
              "Close Camera" : 
              <>
                Scan QR &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCamera} />
              </>
            }
          </ScanOrButtonMobile>
        </ButtonContainer>
        <CoreButton
          disabled={isLoggingIn}
          style={{ marginTop: "80px" }}
          onClick={!isLoggingIn ? login : null}
        >
          {isLoggingIn ? (
            <>
              Trying to login. &nbsp;&nbsp;
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </>
          ) : (
            "Login"
          )}
        </CoreButton>
        <CreateAccountText>
          New user? visit nearest center to register yourself
        </CreateAccountText>
      </SubContainer2>
    </Container>
  );
};

export default PatientLogin2;
