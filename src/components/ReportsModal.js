import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, { Navigation, Pagination } from 'swiper';

import { ReactComponent as ExpandArrow } from '../assets/icons/general/expandArrow.svg'
import PdfReports from './pdfReports'
SwiperCore.use([Navigation, Pagination]);


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
const Link = styled.a`
    text-decoration: none;
`

const ReportsModal = props =>{
    const {
        modalState,
        medicalHistory,
        setReportsModalState,
        setModalState,
        onApproveClickHandler,
        onDeclineClickHandler
    } = props;

    const [imageReports, setImageReports] = useState([]) 
    const [pdfReports, setPdfReports] = useState([])

    useEffect(() => {
        setImageReports(modalState.reportsList.filter(report => report.extension === "png" || report.extension === "jpg" || report.extension === "jpeg"))
        setPdfReports(modalState.reportsList.filter(report => report.extension === "pdf"))
    }, [])

    return (
        <Container>
        <ModalContainer>
            <HeadingContainer>
                <ModalHospitalName>{modalState.hospitalInfo.name}</ModalHospitalName>
                <ModalDiseaseName>{modalState.disease}</ModalDiseaseName>
            </HeadingContainer>
            <ModalSubHeading>
                Reports : 
            </ModalSubHeading>
            <div style={{width: "100%", height: "300px", textAlign: "center"}}>
            {imageReports.length === 0 && <div style={{marginTop: '100px'}}>"No reports found !"</div>}
            {imageReports.length > 0 && <Swiper
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides
                navigation
                pagination
                >
                {imageReports.map(report => {
                    return (
                        <SwiperSlide>
                            <div style={{height: "300px", display: "flex", justifyContent: "center"}}>
                                <Link href={report.url} target="_blank">
                                    <img height={"300px"} src={report.url}/>
                                </Link>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>} 
            </div>
            
            {pdfReports.length > 0 && <PdfReports reports={pdfReports}/>}
            <ModalFooter>
                <Button 
                    bgcolor='#FFDE00' 
                    style={{
                        marginRight: 'auto', 
                        marginLeft: "25px", 
                        width: '120px', 
                        color: '#404040'
                    }}
                    onClick={() => {
                        setModalState(modalState)
                        setReportsModalState(false);
                    }}
                >View Summary</Button>
                {medicalHistory &&<Button onClick={() => setReportsModalState(false)}>Close</Button>}
                {/* {medicalHistory &&<Button onClick={() => setModalState(false)}>Close</Button>} */}
                {!medicalHistory &&
                    <Button 
                        bgcolor='#6FD141' 
                        onClick={() => {
                            onApproveClickHandler(modalState); 
                            setModalState(false)}
                        }>
                            Approve
                    </Button>
                }
                {!medicalHistory &&
                    <Button 
                        style={{marginLeft:'0px'}} 
                        onClick={() => {
                            onDeclineClickHandler(modalState)
                            setModalState(false);}
                        }>
                            Decline
                    </Button>
                }
            </ModalFooter>
        </ModalContainer>
        </Container>
    )
}

export default ReportsModal