import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCamera } from "@fortawesome/free-solid-svg-icons";
import { QrReader } from "react-qr-reader";
import QrcodeDecoder from "qrcode-decoder";

import basicInfo from "../assets/illustrations/basicInfo2.png";
import CoreButton from "../components/core/Button";
import { useAuth } from "../services/authorization";
import { universalLogin } from "../apis/medblock";
import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import {
  AppNameContainer,
  AppOveriewIllustration,
  ButtonContainer,
  Container,
  CreateAccountText,
  Heading,
  OrDiv,
  PageName,
  UploadQrCodeButton,
  ScanOrButton,
  ScanOrButtonMobile,
  SubContainer1,
  SubContainer2,
  SubHeading,
  TextFieldContainer,
} from "./Login.styled";

const PatientLogin2 = () => {
  const auth = useAuth();

  const [pk, setPK] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openWebcamMobile, setOpenWebcamMobile] = useState(false);

  const { type } = useParams();
  const AuthorityTypes =
    type === "patient"
      ? AUTHORITY_TYPES.PATIENT
      : type === "hospital"
      ? AUTHORITY_TYPES.HOSPITAL
      : AUTHORITY_TYPES.ADMIN;

  function login() {
    setIsLoggingIn(true);
    universalLogin(pk, AuthorityTypes)
      .then((info) => {
        const successfulLogin = auth.login(pk, AuthorityTypes, info);
        if (successfulLogin)
          console.log(`Login successful with following ${type} info: `, info);
        else console.log("Some err logging in!, ", successfulLogin);
        setIsLoggingIn(false);
      })
      .catch((err) => {
        alert("Invalid private key !!");
        console.log("Login failed :( with following response: ");
        console.log(err);
        setIsLoggingIn(false);
      });
  }

  const onHandlerErrWebcam = (error) => {
    console.log(error);
  };

  const onHandlerResultWebcam = (result) => {
    console.log(result);
    if (result && result.text) {
      setPK(result.text);
      setOpenWebcam(false);
      setOpenWebcamMobile(false);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onFileChangeHandler = async (file) => {
    setOpenWebcam(false);
    setOpenWebcamMobile(false);

    const base64File = await convertBase64(file);

    var qr = new QrcodeDecoder();
    qr.decodeFromImage(base64File).then((res) => {
      console.log(res.data);
      setPK(res.data);
    });
  };

  if (auth.loggedIn) {
    const path = `/${type}Dashboard`;
    console.log(path);
    return <Redirect to={path} />;
  }

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
            containerStyle={{
              width: "70%",
              marginTop: "40px",
              border: "solid black 1px",
            }}
            delay={300}
            onError={onHandlerErrWebcam}
            onResult={onHandlerResultWebcam}
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
            containerStyle={{
              width: "70%",
              marginTop: "40px",
              border: "solid black 1px",
            }}
            delay={300}
            onError={onHandlerErrWebcam}
            onResult={onHandlerResultWebcam}
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
          <UploadQrCodeButton
            onClick={() => {
              setOpenWebcam(false);
              setOpenWebcamMobile(false);
            }}
            onChange={(event) => onFileChangeHandler(event.target.files[0])}
          />
          <ScanOrButton onClick={() => setOpenWebcam(!openWebcam)}>
            {openWebcam ? (
              "Close Camera"
            ) : (
              <>
                Scan QR &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCamera} />
              </>
            )}
          </ScanOrButton>
          <ScanOrButtonMobile
            onClick={() => setOpenWebcamMobile(!openWebcamMobile)}
          >
            {openWebcamMobile ? (
              "Close Camera"
            ) : (
              <>
                Scan QR &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCamera} />
              </>
            )}
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
