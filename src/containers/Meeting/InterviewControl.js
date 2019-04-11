import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import {Row, Card, Progress, Button} from 'antd'
import {resumeInterview, pauseInterview, finishInterview, updateInterview, syncInterviewTimer} from '../../actions/meeting'

const SectionCard = styled(Card)`
    margin-bottom: 20px !important;
`
const Space = styled.div`
    padding: 0 5px;
    display : inline;
`

class InterviewControl extends Component {

    constructor(props){
        super(props)

        if(this.props.interview.state === 'going'){
            this.startTicking()
        }

    }

    startTicking = () => {
        this.timer = setInterval(()=>{
            this.props.updateInterview({
                elapsed : parseInt(this.props.interview.elapsed) +1
            })
        }, 1000)

        this.syncTimer = setInterval(() => {
            this.props.syncInterviewTimer()
        }, 5000)
    }

    stopTicking = () => {
        clearInterval(this.timer)
        clearInterval(this.syncTimer)
    }

    resume = () =>{
        this.props.resumeInterview()
        this.startTicking()
    }

    pause = () => {
        this.props.pauseInterview()
        this.stopTicking()
    }

    finish = () => {
        this.props.finishInterview()
        this.stopTicking()
    }

    render() {

        const {meeting, interview} = this.props
        const time = interview.elapsed
        return (
            <SectionCard title="Meeting Details">

                <Row type="flex" justify="space-between">
                    <strong>Start Time</strong>
                    <span>{moment.utc(meeting.time).local().format('DD MMM YYYY hh:MM A')}</span>
                </Row>
                <div style={{marginBottom: 15, marginTop: 10}}>
                    <Progress percent={parseInt((time/(45*60))*100)}/>
                    <span>{`${parseInt(time/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${parseInt(time%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`}</span>
                </div>
                <Row type="flex" justify="space-between">
                    <div>
                        { interview.state == 'pending' && <Button type="primary" onClick={this.resume}>Start Meeting</Button>  }
                        { interview.state == 'paused' && <Button type="primary" onClick={this.resume} >Resume</Button>  }
                        { interview.state == 'going' && <Button type="primary" onClick={this.pause} >Pause</Button>  }
                        
                    </div>
                    <div>
                        { interview.state != 'pending' && interview.state != 'finished' && <Button type="primary" onClick={this.finish}>Finish Meeting</Button>  }
                    </div>
                </Row>


            </SectionCard>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    resumeInterview : () => dispatch(resumeInterview()),
    pauseInterview : () => dispatch(pauseInterview()),
    finishInterview : () => dispatch(finishInterview()),
    syncInterviewTimer : () => dispatch(syncInterviewTimer()),
    updateInterview : (data) => dispatch(updateInterview(data)),
})

const mapStateToProps = state => ({
    meeting: state.meeting,
    interview : state.meeting.interview
})

export default connect(mapStateToProps, mapDispatchToProps)(InterviewControl)
