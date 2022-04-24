import React, { useState } from 'react'
import styled from 'styled-components'

import { dismissDeclinedRecord } from '../apis/declinedRecords';
import { dateFromTimestamp } from '../utils/dataUtils'
import { ReactComponent as ExpandArrow } from '../assets/icons/general/expandArrow.svg'

export const Container = styled.div`
    display: flex;
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0; 
    left: 0; 
    bottom: 0; 
    right: 0;
`
export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: auto;
    width: 450px;
    height: auto;
    z-index: 4;
    font-size: 'Inter';
    background-color: #FFFFFF;
    border-radius: 3px;
    cursor: pointer;
    @media (max-width: 500px) {
        width: 90%;
    }
`
export const HeadingContainer = styled.div`
    height: 70px;
    background-color: #273748;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 25px;
`
export const ModalHospitalName = styled.div`
    font-weight: 400;
    font-size: 20px;
`
export const ModalDiseaseName = styled.div`
    font-weight: 400;
    font-size: 14px;
`
export const DropdownContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: ${props => props.open? 90: 33}px;
    overflow: hidden;
    -webkit-transition: height 300ms ease-in-out;
    -moz-transition: height 300ms ease-in-out;
    -o-transition: height 300ms ease-in-out;
    transition: height 300ms ease-in-out;
`
export const ModalSubHeading = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #505050;
    margin-left: 25px;
    margin-top: 10px;
`
export const DownArrow = styled(ExpandArrow)`
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;
    transform: rotate(${props => props.open? 180: 0}deg);
`
export const ModalContent = styled.div`
    font-size: 13px;
    color: #505050;
    margin-left: 50px;
`
export const ModalFooter = styled.div`
    display: flex;
    height: 50px;
    margin-top: auto;
    background-color: #F9FAFB;
    border-top: solid #D1D5D8 1px;
    margin-top: 10px;
`
export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-right: 10px;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color:${props => props.bgcolor ? props.bgcolor : '#C93636'};
    color: white;
    font-size: 12px;
    &:hover{
      filter: brightness(97%);
    }
`

const Modal = props =>{
    const {
        modalState,
        setModalState,
        medicalHistory,
        hospitalAddress,
        onRecordDismissed
    } = props;

    const [treatmentState, setTreatmentState] = useState(false)
    const [medicationState, setMedicationState] = useState(false)

    const onDismissRecordClickHandler = async () => {
        const confirmation = window.confirm("Do you really want to dismiss this record ? \nIt won't be visible but still would be accessible.");
        if(!confirmation)
            return;
        console.log(hospitalAddress, modalState._id, modalState);
        await dismissDeclinedRecord(hospitalAddress, modalState._id, modalState);
        setModalState(false);
        onRecordDismissed();
    }

    console.log(modalState);
    const medicationList = modalState.medication ? modalState.medication.split(',') : [];

    return (
        <Container>
        <ModalContainer>
            <HeadingContainer>
                <ModalHospitalName>Sanjeevani Hospital</ModalHospitalName>
                <ModalDiseaseName>{modalState.disease}</ModalDiseaseName>
            </HeadingContainer>
            <ModalSubHeading>
                Patient Name : {modalState.patientName}
            </ModalSubHeading>
            <ModalSubHeading>
                Record ID : {modalState.recordID}
            </ModalSubHeading>
                {
                    modalState.dischargeDate === '0' ?
                    <ModalSubHeading>
                        Diagnosis/treatment on { dateFromTimestamp(modalState.diagnoseDate) }
                    </ModalSubHeading>
                    :
                    <ModalSubHeading>
                        Admitted on { dateFromTimestamp(modalState.diagnoseDate) }
                        <br/>
                        Discharged on { dateFromTimestamp(modalState.dischargeDate) }
                    </ModalSubHeading>
                }
            <ModalSubHeading>
                Operating Doctor : {modalState.DrName}
            </ModalSubHeading>
            <DropdownContainer open={treatmentState}>
                <ModalSubHeading>
                    Treatment 
                    <DownArrow 
                        src="./Expand Arrow.svg"
                        style={{marginLeft: '35px'}}
                        open={treatmentState}
                        onClick={() => setTreatmentState(!treatmentState)}
                    />
                </ModalSubHeading>
                <ModalContent>
                    {modalState.treatment}
                    <br/>
                    In-Hospital record ID: {modalState.hospitalRecordID}
                </ModalContent>
            </DropdownContainer>
            <DropdownContainer open={medicationState}>
                <ModalSubHeading>
                    Medication
                    <DownArrow 
                        src="./Expand Arrow.svg"
                        style={{marginLeft: '29px'}}
                        open={medicationState}
                        onClick={() => setMedicationState(!medicationState)}
                    />
                </ModalSubHeading>
                <ModalContent>
                    <ol style={{margin:"0px", marginLeft: "20px", padding:"0px"}}>
                        {
                            medicationList.map((item, idx) => {
                                return (
                                    <li key={item + idx}>
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ol>
                </ModalContent>
            </DropdownContainer>
            <ModalSubHeading>
                Patient's blockchain address : {modalState.patientAddress}
            </ModalSubHeading>
            <ModalFooter>
                { medicalHistory &&<Button onClick={() => setModalState(false)}>Close</Button> }
                <Button 
                    style={{marginLeft:'0px', width: '120px'}} 
                    onClick={onDismissRecordClickHandler}
                >
                    Dismiss Record
                </Button>
            </ModalFooter>
        </ModalContainer>
        </Container>
    )
}

export default Modal