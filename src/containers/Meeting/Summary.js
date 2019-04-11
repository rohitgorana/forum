import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Row, Col, Card, Button, Divider, Icon} from 'antd'
import { proceedMeeting } from '../../actions/meeting'
import moment from 'moment'


const Picture = styled.img`
  max-height: 140px;
  border: 1px solid #ddd;
`
const Space = styled.div`
    padding: 0 5px;
    display : inline;
`

class Summary extends React.Component{

    handleStart = () =>{
        this.props.proceedMeeting(this.props.meeting.meeting_id)
    }

    render(){

        const {isMobile, meeting, user} = this.props
        const partner = meeting.author.id === user.id? meeting.partner: meeting.author
        return (
            <React.Fragment>
                <Row type='flex' justify='center'>
                    <h1 style={{fontSize: '2.3em', color: '#666'}}>Meeting is not yet started!</h1>
                </Row>
                <div style={{padding: 40, margin: '20px 0'}}>
                    <Row>
                        <Col offset={isMobile?0:3} xs={24} md={12} >
                            <div style={{marginBottom: 20}}>
                                <h2 style={{fontSize: '1.8em', color: '#666'}}>{meeting.case_title}</h2>
                                <div style={{margin: '10px 0'}}>
                                    <div>
                                        <Icon type="reconciliation" />
                                        <span style={{marginLeft: 5}}>{meeting.difficulty}</span>
                                    </div>
                                    <div>
                                        <Icon type="calendar" />
                                        <span style={{marginLeft: 5}}>{moment.utc(meeting.time).local().format('DD MMM YYYY hh:MM A')}</span>
                                    </div>
                                    <div>
                                        <Icon type="clock-circle" />
                                        <span style={{marginLeft: 5}}>90 Minutes</span>
                                    </div>
                                </div>
                                <Button type='primary' onClick={this.handleStart}>Start Meeting</Button>

                            </div>
                        </Col>

                        <Col xs={24} md={9}>
                            <div style={{display: 'flex'}}>
                                <Picture src={partner.picture}/>
                                <div style={{ marginLeft: 20, fontSize: 16}}>
                                <div style={{fontSize: 20}}>
                                    <span>{partner.name}</span>
                                </div>
                                <div>
                                    <Icon type="safety-certificate" />
                                    <span style={{marginLeft: 5}}>{partner.experience}</span>
                                </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    proceedMeeting : (id) => dispatch(proceedMeeting(id))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    meeting: state.meeting,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
