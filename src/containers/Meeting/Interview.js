import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Row, Col, Card, Progress, Button} from 'antd'
import { fetchInterview } from '../../actions/meeting'
import Skeleton from './Skeleton'
import InterviewControl from './InterviewControl'
import ChatBox from './ChatBox'
import Feedback from './Feedback'

const SectionCard = styled(Card)`
    margin-bottom: 20px !important;
`

const Space = styled.div`
    padding: 0 5px;
    display : inline;
`


class Interview extends React.Component{
    state = {
        loading: true
    }
    componentDidMount(){
        this.props.fetchInterview(this.props.id).then(data =>{
            this.setState({loading: false})
        });
    }

    render(){
        const {meeting, user} = this.props
        return (
            <React.Fragment>
                {
                    this.state.loading? <Skeleton/>:
                    <Row gutter={32}>
                        <Col xs={24} md={15} >
                            <InterviewControl/>
                            <SectionCard title="Partner Info">
                                <div style={{fontSize: 16}}>
                                    <strong> Name : </strong>{meeting.partner.id === user.id? meeting.author.name: meeting.partner.name}
                                </div>
                            </SectionCard>
                            {
                                meeting.interview != undefined && (meeting.interview.interviewer === this.props.user.id) &&
                                <SectionCard title="Case">
                                    <h1>{meeting.case_title}</h1>
                                    <div dangerouslySetInnerHTML= {{__html: meeting.content}}/>
                                </SectionCard>
                            }
                        </Col>
                        <Col xs={24} md={9}>
                            <ChatBox/>                            
                            <SectionCard title="Feedback">
                                <Feedback/>
                            </SectionCard>
                        </Col>
                    </Row>
                    
                }

            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchInterview: (id) => dispatch(fetchInterview(id))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    meeting: state.meeting,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Interview)
