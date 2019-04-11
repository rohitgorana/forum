import React from 'react'
import {connect} from 'react-redux'
import {Steps} from 'antd'

const {Step} = Steps

class Overview extends React.Component{

    
    render(){
        const {meeting, user} = this.props
        const steps = ['pending', 'phase1', 'phase2', 'finished']
        const isAuthor = meeting.author.id === user.id
        return(
            <div style={{margin: 10}}>
                <Steps current={steps.indexOf(meeting.progress)}>
                    <Step title="Pending" description="Get Started" />
                    <Step title={`${isAuthor?'Interviewee': 'Interviewer'} Room`} description={`Play role of an ${isAuthor?'interviewee': 'interviewer'}.`} />
                    <Step title={`${!isAuthor?'Interviewee': 'Interviewer'} Room`} description={`Play role of an ${!isAuthor?'interviewee': 'interviewer'}.`} />
                    <Step title="Finished" description="Meeting finished" />
                </Steps>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state=> ({
    isMobile : state.isMobile,
    meeting: state.meeting,
    user: state.user,

})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)