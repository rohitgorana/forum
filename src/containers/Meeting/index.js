import React from 'react'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Skeleton from './Skeleton'
import { fetchMeetingInfo } from '../../actions/meeting'
import Overview from './Overview'
import GetStarted from './GetStarted'
import Summary from './Summary'
import Interview from './Interview'


class Meeting extends React.Component{
    state ={
        loading: true,
    }

    componentDidMount(){
        this.props.fetchMeetingInfo(this.props.match.params.id).then(data => {
            if(data.code === 1){
                this.setState({loading: false})
            }
        })
    }

    render(){

        const {isMobile, meeting} = this.props
        return (
            <React.Fragment>
                <Header/>
                <div style={{display:'flex', 'justifyContent': 'center', alignItems: 'center', padding: '40px 0', background: '#f7f7f7', minHeight: 150}}>
                    <div style={{width: isMobile?'100%': '80%'}}>
                        {!this.state.loading && <Overview/>}
                    </div>
                </div>
                <div style={{display:'flex', 'justifyContent': 'center', padding: '40px 0'}}>
                    <div style={{width: isMobile?'100%': '80%'}}>
                        {this.state.loading? <Skeleton/>:
                            <div>
                                {meeting.progress === 'pending' && <GetStarted/>}
                                {meeting.progress === 'phase1' && <Interview id={meeting.phase1}/>}
                                {meeting.progress === 'phase2' && <Interview id={meeting.phase2}/>}
                                {meeting.progress === 'finished' && <Interview id={meeting.phase2}/>}
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchMeetingInfo : (id) =>  dispatch(fetchMeetingInfo(id))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    meeting: state.meeting,
})

export default connect(mapStateToProps, mapDispatchToProps)(Meeting)
