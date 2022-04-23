import React from 'react'
import { Heading } from './core'
import { 
    Disease,
    Li,
    ListContainer,
    Sr,
    HeadingLi,
    Name,
    DeclineMessage,
    RecordID
} from './DeclinedRecordsList.styled'

const DeclinedRecordsList = ({data, setModalState}) => {
    return (
        <ListContainer>
            <HeadingLi>
                <Sr></Sr>
                <Name>Name</Name>
                <Disease>Disease</Disease>
                <DeclineMessage>Decline Message</DeclineMessage>
                <RecordID>Record ID</RecordID>
            </HeadingLi>
            {
                data && data.length > 0 ?
                data.map((item, index) => {
                    return (
                        <Li key={item.recordID + " " + index} onClick={() => setModalState(item)}>
                            <Sr>{index+1}.</Sr>
                            <Name>{item.patientName}</Name>
                            <Disease>
                                {item.disease}
                            </Disease>
                            <DeclineMessage>{item.declineMsg}</DeclineMessage>
                            <RecordID>{item.recordID}</RecordID>
                        </Li>
                    )
                })
                :
                <center>
                <Heading fontSize="25px">
                    <br/><br/>
                    Sorry, no records found !!
                </Heading>
                </center>
            }
        </ListContainer>
    )
}

export default DeclinedRecordsList