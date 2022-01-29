import styled from 'styled-components'

export const ListContainer = styled.ul`
    list-style: none;
    padding: 0px;
    margin: 0px;
    overflow-y: auto; 
    @media (min-width: 600px) {
        height: calc(100% - 120px);                                                                                     
        ::-webkit-scrollbar {
            width: 10px;
            border: #909090 solid 1px;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #FFDE00;
            border-radius: 5px;
        }
    }
`
export const Li = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 14px;
    color: #505050;
    border-bottom: solid #D1D5D8 1px;
    cursor: pointer;
    @media (max-width: 500px) {
        font-size: 11px;
        height: 60px;
    }
`
export const HeadingLi = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    background-color: #F9FAFC;
    color: #505050;
    border-bottom: solid #D1D5D8 1px;
    cursor: pointer;
    @media (max-width: 500px) {
        font-size: 11px;
        height: 50px auto;
    }
`
export const Sr = styled.div`
    width: 5%;
    padding-left: 15px;
    @media (max-width: 500px) {
        height: 100%;
        display: flex;
        padding-left: 0px;
        align-items: center;
        justify-content: center;
        background-color: #F9FAFC;
        border-right: solid 1px #D1D5D8;
    }
`
export const Basic = styled.div`
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
    @media (max-width: 500px) {
        white-space: normal;
        overflow: auto;
        text-overflow: auto;
    }
`
export const Disease = styled(Basic)`
    width: 25%;
    @media (max-width: 500px) {
        display: none;
    }
`
export const DiseaseMobile = styled(Basic)`
    display: flex;
    flex-direction: column;
    width: 35%;
    padding-left: 10px;
    @media (min-width: 500px) {
        display: none;
    }
`
export const HospitalHeading = styled(Basic)`
    width: 25%;
    @media (max-width: 500px) {
        width: 35%;
        padding-top: 0px;
    }
`
export const Hospital = styled(Basic)`
    width: 25%;
    @media (max-width: 500px) {
        width: 35%;
        padding-top: 0px;
        margin-top: -15px;
    }
`
export const Treatment = styled(Basic)`
    width: 20%;
    @media (max-width: 500px) {
        display: none;
    }
`
export const DateHeading = styled(Basic)`
    width: 20%;
    @media (max-width: 500px) {
        width: 20%;
    }
`
export const Date = styled(Basic)`
    width: 20%;
    @media (max-width: 500px) {
        width: 20%;
        margin-top: -15px;
    }
`