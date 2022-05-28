import React, { useEffect, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { getPatientPersonalInfo, getRecordHistory } from '../apis/medblock'
import Modal from '../components/Modal'
import {
  figureOutGender,
  getInitials,
  dateFromTimestamp,
  calculateAge,
  processRecords
} from "../utils/dataUtils";
import List from '../components/List'

import Loader from "../components/Loader"

import ExpandArrow from '../assets/icons/general/expandArrow.svg';

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
  PatientAddress,
  Note,
  ShowingSearchResultContainerMobile,
  PatientGender,
  PatientDetailsGender,
  Backdrop,
  ToggleContainer,
  ToggleContainerMobile,
  Toggle
} from './PatientDashboard.styled'

const AnyRecordDisplay = () => {

  const location = useLocation()
  const patientBlockchainAddress = location.state ? location.state.patientBlockchainAddress : undefined;

  const [isLoading, setIsLoading] = useState(false);

  const [refresh, setRefresh] = useState(Number(new Date()));
  const [MedicalHistory, setMedicalHistory] = useState([])
  const [patientDetails, setPatientDetails] = useState([])
  const [showAddress, setShowAddress] = useState(false)
  const [modalState, setModalState] = useState(false)

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
            // setPendingRequests(processedRecords.pendingRecords)
          })
          .catch(err => {
            console.log("Some error fetching records", err);
          });
      }).catch(err => {
        console.log("Some error fetching records", err);
      })
    getPatientPersonalInfo(patientBlockchainAddress)
      .then(res => {
        setPatientDetails(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [refresh, patientBlockchainAddress]);

  if (!patientBlockchainAddress)
    return <Redirect to="/dashboard" />
  return (
    <Container>
      {modalState && <Backdrop onClick={() => setModalState(false)} />}
      {modalState && (
        <Modal
          medicalHistory={true}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
      <SubContainer>
        <PatientNameContainer>
          <Cirlce>{getInitials(`${patientDetails}`)}</Cirlce>
          <PatientName>
            {patientDetails.fname} {patientDetails.lname}
          </PatientName>
          <PatientGender>
            {figureOutGender(patientDetails.gender)}
          </PatientGender>
        </PatientNameContainer>
        <PatientDetailsContainer>
          <PatientDetailsSub>
            DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
            {dateFromTimestamp(patientDetails.birthdate)}
          </PatientDetailsSub>
          <PatientDetailsSub>
            {calculateAge(patientDetails.birthdate)}
          </PatientDetailsSub>
          <PatientDetailsGender>
            Gender&nbsp;: {figureOutGender(patientDetails.gender)}
          </PatientDetailsGender>
          <PatientDetailsSub>
            Phone&nbsp;&nbsp;&nbsp;: +91 {patientDetails.phone}
          </PatientDetailsSub>
        </PatientDetailsContainer>
        <PatientAddressContainer open={showAddress}>
          <PatientAddressSub>
            Address
            <DownArrow
              src={ExpandArrow}
              open={showAddress}
              onClick={() => setShowAddress(!showAddress)}
            />
          </PatientAddressSub>
          {showAddress && (
            <PatientAddress>
              {patientDetails.residentialAddress}
            </PatientAddress>
          )}
        </PatientAddressContainer>
        <ToggleContainer style={{ marginTop: 'auto' }}>
          <Toggle style={{ width: '100%' }} selected={true}>
            Medical History
          </Toggle>
        </ToggleContainer>
      </SubContainer>

      {/* Mobile UI */}
      <ShowingSearchResultContainerMobile>
        <ShowingSearchResultText>
          {MedicalHistory.length === 0
            ? "No records to show"
            : MedicalHistory.length === 1
              ? "Showing 1 result"
              : `Showing result 1 - ${MedicalHistory.length} out of ${MedicalHistory.length} results`}
        </ShowingSearchResultText>
        <ShowingSearchResultText2>
          last updated at 4:30 PM IST
          <RefreshButton
            onClick={e => setRefresh(Number(new Date()))}
          >
            Refresh
          </RefreshButton>
        </ShowingSearchResultText2>
      </ShowingSearchResultContainerMobile>
      {/* Mobile UI */}


      {isLoading ? <Loader /> :
        <SubContainer2>
          <ShowingSearchResultContainer>
            <ShowingSearchResultText>
              {MedicalHistory.length === 0
                ? "No records to show"
                : MedicalHistory.length === 1
                  ? "Showing 1 result"
                  : `Showing result 1 - ${MedicalHistory.length} out of ${MedicalHistory.length} results`}
            </ShowingSearchResultText>
            <ShowingSearchResultText2>
              last updated at 4:30 PM IST
              <RefreshButton
                onClick={e => setRefresh(Number(new Date()))}
              >
                Refresh
              </RefreshButton>
            </ShowingSearchResultText2>
          </ShowingSearchResultContainer>
          <List
            data={MedicalHistory}
            setModalState={setModalState}
          />
          <Note>Click the record to view the details</Note>
        </SubContainer2>
      }

      {/* Mobile UI */}
      <ToggleContainerMobile style={{ marginTop: 'auto' }}>
        <Toggle style={{ width: '100%' }} selected={true}>
          Medical History
        </Toggle>
      </ToggleContainerMobile>
      {/* Mobile UI */}
    </Container>
  );
}

export default AnyRecordDisplay