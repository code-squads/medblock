import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import List from '../components/List'
import Modal from '../components/Modal'

import Loader from "../components/Loader"

import { getRecordHistory, approveRecord, declineRecord } from "../apis/medblock"
import { addDeclinedRecord } from "../apis/declinedRecords"
import { AUTHORITY_TYPES } from "../Constants/authorityTypes"
import { useAuth } from "../services/authorization";
import {
    figureOutGender,
    getInitials,
    dateFromTimestamp,
    calculateAge,
    processRecords
} from "../utils/dataUtils";

import {
    Container,
    SubContainer,
    PatientNameContainer,
    PatientDetailsContainer,
    PatientAddressContainer,
    Cirlce,
    PatientName,
    ShowingSearchResultContainer,
    ShowingSearchResultText,
    ShowingSearchResultText2,
    RefreshButton,
    SubContainer2,
    PatientDetailsSub,
    PatientAddressSub,
    DownArrow,
    ToggleContainer,
    Toggle,
    PatientAddress,
    Note,
    ShowingSearchResultContainerMobile,
    ToggleContainerMobile,
    PatientGender,
    PatientDetailsGender,
    Backdrop,
} from './PatientDashboard.styled'
import ReportsModal from '../components/ReportsModal'

const PatientDashboard = () => {
    const auth = useAuth();
    const PatientDetails = auth.entityInfo;
    const patientBlockchainAddress = auth.wallet?.address;

    const [MedicalHistory, setMedicalHistory] = useState([]);
    const [PendingRequests, setPendingRequests] = useState([]);
    // const [declinedRecords, setDeclinedRecords] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [refresh, setRefresh] = useState(Number(new Date()));

    const [showAddress, setShowAddress] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [reportsModalState, setReportsModalState] = useState(false)

    // true = medicalHistory, false = pendingHistory
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        if (!patientBlockchainAddress)
            return;
        console.log("Fetching all records");
        setIsLoading(true);
        getRecordHistory(patientBlockchainAddress)
            .then(rawRecords => {
                processRecords(rawRecords)
                    .then(processedRecords => {
                        setIsLoading(false);
                        setMedicalHistory(processedRecords.medicalHistory)
                        setPendingRequests(processedRecords.pendingRecords)
                    })
                    .catch(err => {
                        console.log("Some error fetching records", err);
                    });
            }).catch(err => {
                console.log("Some error fetching records", err);
            })
    }, [refresh, patientBlockchainAddress]);

    const onApproveClickHandler = (item) => {
        approveRecord(patientBlockchainAddress, item).then(() => {
            console.log("Successfully approved record!");
            setToggle(true);
        }).catch(err => {
            alert("Some err occured while approving record :(\nReload & try again");
            console.log(err);
        })
    }

    const onDeclineClickHandler = (item) => {
        setModalState(false);
        console.log(item);
        const declineMsg = window.prompt("Enter decline message:", "invalid data");

        declineRecord(item.patient, item, declineMsg).then(() => {
            console.log("Successfully declined record!");
            addDeclinedRecord(item, `${PatientDetails.fname} ${PatientDetails.lname}`, declineMsg)
                .then(() => {
                    console.log("Successfully cached declined record!");
                }).catch(err => {
                    alert("Some err occured while caching declined record :(\nReload & try again");
                    console.log(err);
                });
        }).catch(err => {
            alert("Some err occured while declining record :(\nReload & try again");
            console.log(err);
        })
    }

    if(!auth.loggedIn || !auth.entityInfo || !auth.wallet || !auth.authority){
        auth.logout();
        return <Redirect to='/login/patient' />
    }

    if (auth.authority !== AUTHORITY_TYPES.PATIENT)
        return <Redirect to='/' />

    return (
        <Container>
            {modalState &&<Backdrop onClick={() => setModalState(false)}/>}
            {reportsModalState &&<Backdrop onClick={() => setReportsModalState(false)}/>}
            {reportsModalState && 
                <ReportsModal
                    modalState={reportsModalState}
                    medicalHistory={toggle}
                    setReportsModalState={setReportsModalState}
                    setModalState={setModalState}
                    onApproveClickHandler={onApproveClickHandler}
                    onDeclineClickHandler={onDeclineClickHandler}
                />
            }
            {modalState &&
                <Modal
                    medicalHistory={toggle}
                    modalState={modalState}
                    setModalState={setModalState}
                    onApproveClickHandler={onApproveClickHandler}
                    onDeclineClickHandler={onDeclineClickHandler}
                    setReportsModalState={setReportsModalState}
                />
            }
            <SubContainer>
                <PatientNameContainer>
                    <Cirlce>
                        {getInitials(PatientDetails.fname)}
                    </Cirlce>
                    <PatientName>
                        {PatientDetails.fname} {PatientDetails.lname}
                    </PatientName>
                    <PatientGender>
                        {figureOutGender(PatientDetails.gender)}
                    </PatientGender>
                </PatientNameContainer>
                <PatientDetailsContainer>
                    <PatientDetailsSub>
                        DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
                        {dateFromTimestamp(PatientDetails.birthdate)}
                    </PatientDetailsSub>
                    <PatientDetailsSub>
                        {calculateAge(PatientDetails.birthdate)}
                    </PatientDetailsSub>
                    <PatientDetailsGender>
                        Gender&nbsp;: {figureOutGender(PatientDetails.gender)}
                    </PatientDetailsGender>
                    <PatientDetailsSub>
                        Phone&nbsp;&nbsp;&nbsp;: +91 {PatientDetails.phone}
                    </PatientDetailsSub>
                </PatientDetailsContainer>
                <PatientAddressContainer open={showAddress}>
                    <PatientAddressSub>
                        Address
                        <DownArrow
                            open={showAddress}
                            onClick={() => setShowAddress(!showAddress)} />
                    </PatientAddressSub>
                    {showAddress &&
                        <PatientAddress>
                            {PatientDetails.residentialAddress}
                        </PatientAddress>
                    }
                </PatientAddressContainer>
                <ToggleContainer>
                    <Toggle selected={toggle} onClick={() => setToggle(true)}>Medical History</Toggle>
                    <Toggle selected={!toggle} onClick={() => setToggle(false)}>Pending Requests</Toggle>
                </ToggleContainer>
            </SubContainer>

            {/* Mobile UI */}


            <ShowingSearchResultContainerMobile>
                <ShowingSearchResultText>
                    {
                        toggle ?
                            MedicalHistory.length === 0 ?
                                "No records to show"
                                : MedicalHistory.length === 1 ?
                                    "Showing 1 result"
                                    :
                                    `Showing result 1 - ${MedicalHistory.length}  out of ${MedicalHistory.length} results`
                            :
                            PendingRequests.length === 0 ?
                                "No records to show"
                                : PendingRequests.length === 1 ?
                                    "Showing 1 result"
                                    :
                                    `Showing result 1 - ${PendingRequests.length}  out of ${PendingRequests.length} results`
                    }
                </ShowingSearchResultText>
                <ShowingSearchResultText2>
                    last updated at 4:30 PM IST
                    <RefreshButton onClick={e => setRefresh(Number(new Date()))}>
                        Refresh
                    </RefreshButton>
                </ShowingSearchResultText2>
            </ShowingSearchResultContainerMobile>


            {/* Mobile UI */}

            {isLoading ? <Loader /> :
                <SubContainer2>

                    <ShowingSearchResultContainer>
                        <ShowingSearchResultText>
                            {
                                toggle ?
                                    MedicalHistory.length === 0 ?
                                        "No records to show"
                                        : MedicalHistory.length === 1 ?
                                            "Showing 1 result"
                                            :
                                            `Showing result 1 - ${MedicalHistory.length}  out of ${MedicalHistory.length} results`
                                    :
                                    PendingRequests.length === 0 ?
                                        "No records to show"
                                        : PendingRequests.length === 1 ?
                                            "Showing 1 result"
                                            :
                                            `Showing result 1 - ${PendingRequests.length}  out of ${PendingRequests.length} results`
                            }
                        </ShowingSearchResultText>
                        <ShowingSearchResultText2>
                            last updated at 4:30 PM IST
                            <RefreshButton onClick={e => setRefresh(Number(new Date()))}>
                                Refresh
                            </RefreshButton>
                        </ShowingSearchResultText2>
                    </ShowingSearchResultContainer>
                    <List data={toggle ? MedicalHistory : PendingRequests} setModalState={setModalState} />
                    <Note>Click the record to view the details</Note>
                </SubContainer2>
            }

            {/* Mobile UI */}
            <ToggleContainerMobile>
                <Toggle selected={toggle} onClick={() => setToggle(true)}>Medical History</Toggle>
                <Toggle selected={!toggle} onClick={() => setToggle(false)}>Pending Requests</Toggle>
            </ToggleContainerMobile>
            {/* Mobile UI */}
        </Container>
    )
}

export default PatientDashboard
