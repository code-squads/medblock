import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import web3 from '../services/web3';

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import { CoreButton, Heading, ThemeText } from '../components/core'

import { AUTHORITY_TYPES } from '../Constants/authorityTypes'
import { PROGRESS_STATUSES } from '../Constants/progressStatus'

import { isHospitalAlreadRegistered, newHospitalRegistration, sendEth } from "../apis/medblock";
import {sendOTP, verifyOTP } from "../apis/otpVerification";
import { useAuth } from "../services/authorization";
import { generateAddressFile, generateKeyFile } from "../utils/generateKeyFiles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { DashboardIcon, DownloadIcon, NoteSection } from './HospitalRegistration.styled';
import basicIllustration from '../assets/illustrations/basicInfo2.png';
import otpSuccess from '../assets/illustrations/otpSuccess.png';

const HospitalRegistration = () => {
    const auth = useAuth();

    // details | otp | success
    const [progress, setProgress] = useState(PROGRESS_STATUSES.DETAILS);
    
    useEffect(()=>{
        setProgress(PROGRESS_STATUSES.CONFIRM)
    }, [])
;
    console.log(progress === PROGRESS_STATUSES.CONFIRM)
    console.log(auth);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOTP] = useState('');
    const [license, setLicense] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [generatedAccount, setGeneratedAccount] = useState(undefined);

    const [isProcessing, setIsProcessing] = useState(false);
    const [resending, setResending] = useState(false);
    
    async function resendOTP(){
        setResending(true);
        try{
            const success = await sendOTP(phone);
            if(!success)
                alert("Some error sending OTP");
            setResending(false);
        }catch(err){
            console.log(err)
            alert("Something went wrong sending the OTP, try again");
            setResending(false);
        }
    }

    async function goToOTPSection(){
        if(!name || !phone || !license || !address){
            alert("Please fill out all the fields !!");
            return;
        }
        if(!termsAccepted){
            alert("Please accept the terms !!");
            return;
        }

        setIsProcessing(true);
        try{
            const success = await sendOTP(phone);
            if(success)
                setProgress(PROGRESS_STATUSES.OTP);
            else
                alert("Some error sending OTP");
            setIsProcessing(false);
        }catch(err){
            console.log(err)
            alert("Something went wrong sending the OTP, try again");
            setIsProcessing(false);
        }
    }

    async function registerHospital(){
        if(!otp || typeof otp !== 'string' || otp.length !== 6)
            return alert("Enter valid OTP !!");

        setIsProcessing(true);

        try{
            const success = await verifyOTP(phone, otp);
            console.log(success);
            if(!success){
                alert("Wrong OTP!");
                setIsProcessing(false);
                return;
            }
        }catch(err){
            console.log(err)
            alert("Something went wrong verifying the OTP, Try again");
            setIsProcessing(false);
            return;
        }

        let newHospitalAccount = web3.eth.accounts.create(license)
        console.log("New hospital account generated: ", newHospitalAccount);

        let isOccupied = await isHospitalAlreadRegistered(newHospitalAccount.address);
        if(isOccupied){
            setIsProcessing(false);
            return alert("The generated address is occupied by another hospital. Reload & try again");
        }

        try{
            const registeredHospitalTxReceipt = await newHospitalRegistration(
                name, license,
                phone, address,
                newHospitalAccount.address,
                auth.wallet.address
            );
            console.log(registeredHospitalTxReceipt)

            if(registeredHospitalTxReceipt){
                sendEth(auth.wallet.address, newHospitalAccount.address, "0.1");
                console.log('1')
                setGeneratedAccount(newHospitalAccount);
                console.log('2')
                setProgress(PROGRESS_STATUSES.CONFIRM)
                console.log('3')

            }else
                alert("Hospital not registered due to some error");

            console.log('check')
            setIsProcessing(false);
            setProgress(PROGRESS_STATUSES.CONFIRM);
        }catch(err){
            console.log("Some error registering new hospital:", newHospitalAccount.address);
            console.log(err);
        }
    }

    function downloadAddress(){
        if(!name || !generatedAccount || !generatedAccount.privateKey)
            return;
        generateAddressFile(name, generatedAccount.address);
    }

    async function downloadPrivateKey(){
        if(!name || !generatedAccount || !generatedAccount.privateKey)
            return;
        generateKeyFile(name, generatedAccount.privateKey);
    }

    // console.log(auth);
    // if(!auth.loggedIn || !auth.entityInfo || !auth.wallet || !auth.authority){
    //     auth.logout();
    //     return <Redirect to='/login/admin' />
    // }
    // console.log(auth.authority);
    // if(auth.authority !== AUTHORITY_TYPES.ADMIN)
    //     return <Redirect to="/"/>

    return (
        <Container className="py-5">
            <Row>
                <Col lg={5} className="d-none d-lg-block">
                    <img
                        className="w-100"
                        alt="about medikeep"
                        src={basicIllustration}
                        />
                </Col>
                <Col md={0} lg={1}></Col>
                hllo
                <Col md={12} lg={6}>
                    {
                        progress === PROGRESS_STATUSES.DETAILS 
                        ?
                        <center>
                            <Heading className="my-2">
                                Hospital registration
                            </Heading>
                            <br/>
                            <div>
                                <Row style={{paddingRight: "20px", paddingLeft: "10px"}} >
                                    <TextField
                                        required fullWidth
                                        variant="outlined" 
                                        label="Hospital name"
                                        autoComplete="nope"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </Row>
                                <br/>
                                <Row className="px-2">
                                    <Col md={6}>
                                        <Row>
                                            <TextField
                                                required
                                                variant="outlined" 
                                                label="License no."
                                                autoComplete="nope"
                                                value={license}
                                                onChange={e => setLicense(e.target.value)} />
                                        </Row>
                                        <br/>
                                        <Row>
                                            <TextField
                                                required
                                                variant="outlined" 
                                                label="Phone number"
                                                autoComplete="nope"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)} />
                                            <br/>
                                        </Row>
                                        <br/>
                                    </Col>
                                    <Col>
                                        <TextField
                                            required
                                            label="Address"
                                            fullWidth
                                            multiline
                                            rows={5}
                                            autoComplete="nope" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} />
                                    </Col>
                                </Row>
                            <br/><br/>
                            <Checkbox
                                checked={termsAccepted}
                                onChange={e => setTermsAccepted(e.target.checked)} 
                                required /> 
                                Hospital agrees to the Terms and conditions & <br/>
                                All necessary documents are verified
                            </div>
                            <br/>
                            <CoreButton
                                size="lg"
                                disabled={isProcessing}
                                onClick={!isProcessing ? goToOTPSection : null}>
                                {
                                    isProcessing ?
                                    <>
                                        Sending OTP &nbsp;&nbsp;
                                        <FontAwesomeIcon icon={faSpinner} className="fa-spin"  />
                                    </>
                                    : "Proceed to OTP verification"
                                }
                            </CoreButton>
                        </center>
                        : progress === PROGRESS_STATUSES.OTP ?
                        <Row style={{minHeight: "450px"}}>
                            <Col md={8} className="d-flex align-items-center">
                                <div className="d-block w-100">
                                    <ThemeText fontSize="25px">
                                        Confirm OTP
                                    </ThemeText>
                                    <ThemeText fontSize="16px">
                                        sent to +91 {phone}
                                    </ThemeText><br/>

                                    <div className="w-75">
                                        <center>
                                        <TextField
                                            required
                                            fullWidth
                                            className="my-2"
                                            variant="outlined" 
                                            label="OTP"
                                            value={otp}
                                            onChange={e => setOTP(e.target.value)}
                                            autoComplete="nope" /><br/><br/>

                                        <CoreButton
                                            size="lg"
                                            className="w-100 my-2"
                                            disabled={isProcessing}
                                            onClick={!isProcessing ? registerHospital : null}>
                                            {
                                                isProcessing ?
                                                <>
                                                    Verifying OTP&nbsp;&nbsp;
                                                    <FontAwesomeIcon icon={faSpinner}className="fa-spin"  />
                                                </>
                                                : "Verify OTP"
                                            }
                                        </CoreButton>
                                        <ThemeText fontSize="16px" className="custom-text-button" onClick={resendOTP}>
                                            {
                                                resending ?
                                                "sending OTP ...."
                                                : "resend OTP"
                                            }
                                        </ThemeText><br/>
                                        </center>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <img
                                    className="my-4"
                                    style={{width: "90%"}}
                                    alt="about medikeep"
                                    src={otpSuccess}
                                    />
                            </Col>
                        </Row>
                        : progress === PROGRESS_STATUSES.CONFIRM ?
                        <div>
                            <div className="d-flex justify-content-end">
                                <Link to="/adminDashboard" className="text-dark text-decoration-none">
                                    <DashboardIcon />
                                    Go to dashboard
                                </Link>
                            </div>
                            <br/><br/><br/>
                            <div id='receipt-pdf-content'>
                            <Heading fontSize="36px">
                                Hospital successfuly registered !!
                            </Heading><br/>
                            <ThemeText fontSize="25px">
                                { name }
                            </ThemeText>
                            <ThemeText fontSize="18px">
                                { license }
                            </ThemeText><br/><br/>
                            <div className="d-flex justify-content-between">
                                <CoreButton
                                    color="#202020"
                                    background="#FFDE00"
                                    fontSize="16px"
                                    paddingLeftRight="18px"
                                    onClick={downloadPrivateKey}>
                                    Download Private key card
                                    <DownloadIcon />
                                </CoreButton>
                                <CoreButton
                                    color="#202020"
                                    background="#FFDE00"
                                    fontSize="16px"
                                    paddingLeftRight="18px"
                                    onClick={downloadAddress}>
                                    Download address card
                                    <DownloadIcon />
                                </CoreButton>
                            </div>
                            <br/><br/> <br/><br/>
                            <NoteSection>
                                Note:
                            </NoteSection>
                            Address and Private key card will not be accesible later. 
                        </div>
                        </div>
                        : ""
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default HospitalRegistration