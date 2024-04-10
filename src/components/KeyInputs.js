import React, { useState } from "react";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { QrReader } from "react-qr-reader";

import CoreButton from "../components/core/Button";
import { isValidAddress } from "../utils/keyValidator";

import {
  ButtonContainer,
  Container,
  CreateAccountText,
  OrDiv,
  PageName,
  ScanOrButton,
  ScanOrButtonMobile,
  SubContainer1,
  SubContainer2,
  TextFieldContainer,
} from "./KeyInputs.styled";

const KeyInputs = (props) => {
  const { submitInput, isProcessingInput } = props;

  const [key, setKey] = useState("");
  const [openWebcam, setOpenWebcam] = useState(false);
  const [openWebcamMobile, setOpenWebcamMobile] = useState(false);

  const processInput = (e) => {
    if (!isValidAddress(key)) {
      alert("Invalid address entered");
      return;
    }
    submitInput(key);
  };

  const onHandlerErrWebcam = (error) => {
    console.log(error);
  };

  const onHandlerResultWebcam = (result) => {
    if (result && result.text) {
      setKey(result.text);
      setOpenWebcam(false);
      setOpenWebcamMobile(false);
    }
  };

  return (
    <Container>
      <center>
        <SubContainer1>
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
          <PageName> Patient address </PageName>
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
                label="Patient's address"
                required
                fullWidth
                autoComplete="nope"
                value={key}
                onChange={(e) => setKey(e.target.value)}
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
            disabled={isProcessingInput}
            style={{ marginTop: "80px" }}
            onClick={!isProcessingInput ? processInput : null}
          >
            {isProcessingInput ? (
              <>
                Processing &nbsp;&nbsp;
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              </>
            ) : (
              "Proceed"
            )}
          </CoreButton>
          <br />
          <CreateAccountText>
            New user? visit nearest center to register yourself
          </CreateAccountText>
        </SubContainer2>
      </center>
    </Container>
  );
};

export default KeyInputs;
