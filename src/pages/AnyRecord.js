import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCamera } from "@fortawesome/free-solid-svg-icons";
import { QrReader } from "react-qr-reader";
import QrcodeDecoder from "qrcode-decoder";

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
  UploadQrCodeButton,
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
    console.log("Scan res", result);
    if (result && result.text) {
      setAddress(result.text);
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
      setAddress(res.data);
    });
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
