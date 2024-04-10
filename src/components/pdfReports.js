import styled from "@emotion/styled";
import React from "react";
import PdfIcon from '../assets/icons/general/pdfIcon6.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    width: 90%;
    height: 120px;
    overflow: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
`
const Li = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    color: #505050;
    background-color: #F9FAFB;
    border-radius: 5px;
`
const Icon = styled.img`
    height: 18px;
    margin-left: 10px;
    margin-right: 20px;
`
const Link = styled.a`
    text-decoration: none;
`

const PdfReports = (props) => {
    return (
        <Container>
            {props.reports.map((report, idx) => {
                return (
                    <Link href={report.url} target="_blank" key={report.url+idx}>
                        <Li>
                            <Icon src={PdfIcon}/>
                            {report.name}.{report.extension}
                        </Li>
                    </Link>
                )
            })}
        </Container>
    )
}

export default PdfReports