import styled from 'styled-components'
import { ReactComponent as ExpandArrow } from '../assets/icons/general/expandArrow.svg'

export const Container = styled.div`
    background-color: transparent;
    border: 1px solid #D1D5D8;
    border-radius: 3px;
    height: 85vh;
    width: 95%;
    margin: auto;
    margin-top: 2%;
    display: flex;
    flex-direction: row;
    font-family: 'Inter';
    @media (max-width: 500px) {
        margin-top: 20px;
        width: 100%;
        height: calc(100vh - 76px);
        flex-direction: column;
        border: none;
    }
`
export const SubContainer = styled.div`
    height: 100%;
    width: 320px;
    border-right: 1px solid #D1D5D8;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
        margin: auto;
        margin-top: 0px;
        margin-bottom: 0px;
        width: 90%;
        height: auto;
        border: 1px solid #D1D5D8;
        padding-bottom: 10px;
    }
`
export const PatientNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #D1D5D8;
    @media (max-width: 500px) {
        height: 45px;
        border: none;
    }
`
export const Cirlce = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-left: 18px;
    border-radius: 50%;
    background-color: #151E28;
    color: white;
`
export const PatientName = styled.div`
    color: #505050;
    font-weight: 500;
    font-size: 20px;
    margin-left: 10px;
`
export const PatientGender = styled.div`
    color: #505050;
    font-weight: 500;
    font-size: 15px;
    margin-left: auto;
    margin-right: 15px;
    @media (min-width: 500px){
        display: none;
    }
`
export const PatientDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 135px;
    border-bottom: 1px solid #D1D5D8;
    color: #505050;
    @media (max-width: 500px) {
        height: 70px;
        border: none;
    }
`
export const PatientDetailsSub = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    padding-left: 18px;
    @media (max-width: 500px) {
        padding-left: 20px;
        font-size: 12px;
    }
`
export const PatientDetailsGender = styled(PatientDetailsSub)`
    @media (max-width:500px) {
        display: none;
    }
`
export const PatientAddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #505050;
    height: ${props => props.open? 120 : 45}px;
    -webkit-transition: height 300ms ease-in-out;
    -moz-transition: height 300ms ease-in-out;
    -o-transition: height 300ms ease-in-out;
    transition: height 300ms ease-in-out;
    border-bottom: 1px solid #D1D5D8;
    @media (max-width: 500px) {
        height: ${props => props.open? 60 : 20}px;
        border: none;
        -webkit-transition: none;
        -moz-transition: none;
        -o-transition: none;
        transition: none;
    }
`
export const PatientAddressSub = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    padding-left: 18px;
    @media (max-width: 500px) {
        font-size: 12px;
        padding-left: 20px;
        height: 20px;
    }
`
export const PatientAddress = styled.div`
    height: 105px;
    font-size: 14px;
    padding-left: 18px;
    @media (max-width: 500px) {
        padding-left: 20px;
        padding-right: 20px;
        font-size: 12px;
        height: 40px;
    }
`
export const DownArrow = styled(ExpandArrow)`
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;
    transform: rotate(${props => props.open? 180: 0}deg);
`
export const ViewPublicRecords = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 85%;
    height: 45px;
    margin-bottom: 30px;
    background-color: #FFDE00;
    font-size: 14px;
    cursor: pointer;
    @media (max-width: 500px) {
        display: none;
    }
`
export const ToggleContainer = styled.div`
    display: flex;
    margin: auto;
    width: 85%;
    height: 45px;
    margin-bottom: 30px;
    background-color: transparent;
    border: solid #D1D5D8 1px;
    @media (max-width: 500px) {
        display: none;
    }
`
export const ToggleContainerMobile = styled.div`
    display: flex;
    margin: auto;
    width: 100%;
    height: 45px;
    background-color: transparent;
    border: solid #D1D5D8 1px;
    margin-bottom: 10px;
    @media (min-width: 500px) {
        display: none;
    }
`
export const Toggle = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.selected? '#151E28' : 'transparent'};
    color: ${props => props.selected? 'white' : '#151E28'};
    cursor: pointer;
`

export const SubContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 320px);
    height: 100%;
    /* overflow-y: scroll; */
    @media (max-width: 500px) {
        width: 90%;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        border: solid 1px #D1D5D8;
    }
`
export const ShowingSearchResultContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #D1D5D8;
    @media (max-width: 500px) {
        display: none;
    }
`
export const ShowingSearchResultContainerMobile = styled.div`
    width: 90%;
    height: 60px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 500px) {
        display: none;
    }
`
export const ShowingSearchResultText = styled.div`
    font-size: 14px;
    color: #505050;
    margin-left: 15px;
    @media (max-width: 500px) {
        margin-left: 0px;
    }
`
export const ShowingSearchResultText2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 10px;
    color: #505050;
    margin-left: 15px;
    @media (max-width: 500px) {
        margin-left: 0px;
    }
`
export const RefreshButton = styled.button`
    background-color: transparent;
    color: #404040;
    border: solid 1px #E5E5E5;
    border-radius: 3px;
    font-size: 12px;
    margin-left: auto;
    margin-right: 20px;
    @media (max-width: 500px) {
        margin-right: 0px;
        font-size: 10px;
    }
`
export const Note = styled.div`
    margin-top: auto;
    margin-bottom: 17px;
    margin-left: 17px;
    font-size: 10px;
    color: #505050;
    @media (max-width: 500px) {
        margin-top: 10px;
        margin-left: 20px;
        margin-bottom: 10px;
    }
`
export const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top:0px;
    left: 0px;
    opacity: 0.25;
    z-index: 3;
    background-color: #000000;
`