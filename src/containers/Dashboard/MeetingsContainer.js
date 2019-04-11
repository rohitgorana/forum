import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import {Empty, Icon} from 'antd'
import MeetingEvent from '../../components/MeetingEvent'



class MeetingsContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }



    render(){
        const {meetings} = this.props
        const Loading = <div style={{display:'flex', padding: 20, justifyContent: 'center'}}>
            <Icon type="loading" />
        </div>

        return (
            <div style={{padding: '40px 0'}}>
                {this.props.loading? Loading: meetings.length > 0?null: <Empty/>}
                
                {meetings.map((meeting) => {
                    return <MeetingEvent {...this.props.eventProps} key={meeting.id} data={meeting} isMobile={this.props.isMobile}/>
                })}
                
            </div>
        )
    }

}

MeetingsContainer.defaultProps = {
    eventProps : {

    }
}

const mapDispatchToProps = () =>({

})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingsContainer)
