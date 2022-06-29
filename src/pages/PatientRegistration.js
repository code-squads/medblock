import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import web3 from "../services/web3";

import {
  Box,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import { CoreButton, Heading, ThemeText } from "../components/core";

import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import { PROGRESS_STATUSES } from "../Constants/progressStatus";

import {
  newPatientRegistration,
  isPatientAlreadyRegistered,
  sendEth,
} from "../apis/medblock";
import { sendOTP, verifyOTP } from "../apis/otpVerification";
import { useAuth } from "../services/authorization";
import { dateToTimestamp, figureOutGender } from "../utils/dataUtils";
import {
  generateAddressFile,
  generateKeyFile,
} from "../utils/generateKeyFiles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import {
  DashboardIcon,
  DownloadIcon,
  NoteSection,
} from "./PatientRegistration.styled";
import basicIllustration from "../assets/illustrations/Overview.png";
import otpSuccess from "../assets/illustrations/otpSuccess.png";

const PatientRegistration = () => {
  const auth = useAuth();

  // details | otp | success
  const [progress, setProgress] = useState(PROGRESS_STATUSES.DETAILS);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [generatedAccount, setGeneratedAccount] = useState(undefined);

  const [isProcessing, setIsProcessing] = useState(false);
  const [resending, setResending] = useState(false);

  async function resendOTP() {
    setResending(true);
    try {
      const success = await sendOTP(phone);
      if (!success) alert("Some error sending OTP");
      setResending(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong sending the OTP, try again");
      setResending(false);
    }
  }

  async function goToOTPSection() {
    if (!fname || !lname || !phone || !dob || !address) {
      alert("Please fill out all the fields !!");
      return;
    }
    if (!termsAccepted) {
      alert("Please accept the terms !!");
      return;
    }

    setIsProcessing(true);
    try {
      const success = await sendOTP(phone);
      if (success) setProgress(PROGRESS_STATUSES.OTP);
      else alert("Some error sending OTP");
      setIsProcessing(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong sending the OTP, try again");
      setIsProcessing(false);
    }
  }

  async function registerPatient(event) {
    if (!otp || typeof otp !== "string" || otp.length !== 6)
      return alert("Enter valid OTP !!");

    setIsProcessing(true);

    try {
      const success = await verifyOTP(phone, otp);
      console.log(success);
      if (!success) {
        alert("Wrong OTP!");
        setIsProcessing(false);
        return;
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong verifying the OTP, Try again");
      setIsProcessing(false);
      return;
    }

    let newPatientAccount = web3.eth.accounts.create(phone + fname + lname);
    console.log("New patient account generated: ", newPatientAccount);

    let isOccupied = await isPatientAlreadyRegistered(
      newPatientAccount.address
    );
    if (isOccupied) {
      setIsProcessing(false);
      return alert(
        "The generated address is occupied by another patient. Reload & try again"
      );
    }

    try {
      // let dobTimestamp = dob / 1000;
      let dobTimestamp = dateToTimestamp(dob);
      console.log(dobTimestamp);
      const registeredPatientTxReceipt = await newPatientRegistration(
        fname,
        lname,
        phone,
        address,
        newPatientAccount.address,
        dobTimestamp,
        gender,
        auth.wallet.address
      );
      if (registeredPatientTxReceipt) {
        sendEth(auth.wallet.address, newPatientAccount.address, "0.01");
        setGeneratedAccount(newPatientAccount);
        setProgress(PROGRESS_STATUSES.SUCCESS);
      } else {
        console.log("Patient not registered due to some error");
      }
    } catch (err) {
      console.log(
        "Some error registering new hospital:",
        newPatientAccount.address
      );
      console.log(err);
    }

    setIsProcessing(false);
  }

  function downloadAddress() {
    if (!fname || !lname || !generatedAccount || !generatedAccount.privateKey)
      return;
    generateAddressFile(fname + "-" + lname, generatedAccount.address);
  }

  async function downloadPrivateKey() {
    if (!fname || !lname || !generatedAccount || !generatedAccount.privateKey)
      return;
    generateKeyFile(fname + "-" + lname, generatedAccount.privateKey);
  }

  if (!auth.loggedIn || !auth.entityInfo || !auth.wallet || !auth.authority) {
    auth.logout();
    return <Redirect to="/login/admin" />;
  }

  if (auth.authority !== AUTHORITY_TYPES.ADMIN) return <Redirect to="/" />;

  return (
    <Container className="pt-4">
      <Row>
        <Col lg={5} className="d-none d-lg-block">
          <img className="w-100" alt="about medBlock" src={basicIllustration} />
        </Col>
        <Col md={0} lg={1}></Col>
        <Col md={12} lg={6}>
          {progress === PROGRESS_STATUSES.DETAILS ? (
            <center>
              <Heading className="my-1" fontSize="27px">
                Patient registration
              </Heading>
              <br />
              <Box component="form">
                <div>
                  <Row>
                    <Col>
                      <TextField
                        required
                        fullWidth
                        autoComplete="nope"
                        variant="outlined"
                        label="First name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Last name"
                        autoComplete="nope"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col
                      md={6}
                      style={{ paddingLeft: "22px", paddingRight: "22px" }}
                    >
                      <Row>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Date of birth"
                            disableHighlightToday
                            renderInput={(params) => <TextField {...params} />}
                            value={dob}
                            maxDate={new Date()}
                            openTo="year"
                            views={["year", "month", "day"]}
                            onChange={setDob}
                          />
                        </LocalizationProvider>
                      </Row>
                      <br />
                      <Row>
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Gender"
                          >
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                            <MenuItem value={2}>Non Binary</MenuItem>
                          </Select>
                        </FormControl>
                      </Row>
                      <br />
                      <Row>
                        <TextField
                          required
                          variant="outlined"
                          label="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="nope"
                        />
                        <br />
                        <br />
                        <br />
                      </Row>
                    </Col>
                    <Col>
                      <TextField
                        label="Address"
                        fullWidth
                        multiline
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={8}
                        autoComplete="nope"
                      />
                    </Col>
                  </Row>
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                  Patient agrees to the Terms and conditions & <br />
                  All necessary documents are verified
                </div>
              </Box>
              <br />
              <CoreButton
                size="lg"
                disabled={isProcessing}
                onClick={!isProcessing ? goToOTPSection : null}
              >
                {isProcessing ? (
                  <>
                    Sending OTP &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                  </>
                ) : (
                  "Proceed to OTP verification"
                )}
              </CoreButton>
            </center>
          ) : progress === PROGRESS_STATUSES.OTP ? (
            <Row style={{ minHeight: "450px" }}>
              <Col md={8} className="d-flex align-items-center">
                <div className="d-block w-100">
                  <ThemeText fontSize="25px">Confirm OTP</ThemeText>
                  <ThemeText fontSize="16px">sent to +91 {phone}</ThemeText>
                  <br />

                  <div className="w-75">
                    <center>
                      <TextField
                        required
                        fullWidth
                        className="my-2"
                        variant="outlined"
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        autoComplete="nope"
                      />
                      <br />
                      <br />

                      <CoreButton
                        size="lg"
                        className="w-100 my-2"
                        disabled={isProcessing}
                        onClick={!isProcessing ? registerPatient : null}
                      >
                        {isProcessing ? (
                          <>
                            Verifying OTP &nbsp;&nbsp;
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="fa-spin"
                            />
                          </>
                        ) : (
                          "Verify OTP"
                        )}
                      </CoreButton>
                      <ThemeText
                        fontSize="16px"
                        className="custom-text-button"
                        onClick={resendOTP}
                      >
                        {resending ? "sending OTP ...." : "resend OTP"}
                      </ThemeText>
                      <br />
                    </center>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <img
                  className="my-4"
                  style={{ width: "90%" }}
                  alt="about medBlock"
                  src={otpSuccess}
                />
              </Col>
            </Row>
          ) : progress === PROGRESS_STATUSES.SUCCESS ? (
            <div>
              <div className="d-flex justify-content-end">
                <Link
                  to="/adminDashboard"
                  className="text-dark text-decoration-none"
                >
                  <DashboardIcon />
                  Go to dashboard
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div id="receipt-pdf-content">
                <Heading fontSize="36px">
                  Patient successfuly registered !!
                </Heading>
                <br />
                <Heading fontSize="25px">
                  {fname} {lname}
                </Heading>
                <Heading fontSize="18px">{figureOutGender(gender)}</Heading>
                <br />
                <br />
                <div className="d-flex justify-content-between">
                  <CoreButton
                    color="#202020"
                    background="#FFDE00"
                    fontSize="16px"
                    paddingLeftRight="18px"
                    onClick={downloadPrivateKey}
                  >
                    Download Private key card
                    <DownloadIcon />
                  </CoreButton>
                  <CoreButton
                    color="#202020"
                    background="#FFDE00"
                    fontSize="16px"
                    paddingLeftRight="18px"
                    onClick={downloadAddress}
                  >
                    Download address card
                    <DownloadIcon />
                  </CoreButton>
                </div>
                <br />
                <br /> <br />
                <br />
                <NoteSection>Note:</NoteSection>
                Address and Private key card will not be accesible later.
              </div>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PatientRegistration;
