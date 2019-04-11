import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import {Card, Divider, Empty} from 'antd'
import {fetchCases} from '../../actions/cases'
import {fetchMeetings} from '../../actions/meeting'
import MeetingForm from './MeetingForm'
import Tabs, {Tab} from '../../components/Tabs'
import MeetingsContainer from './MeetingsContainer'

const Flex = styled.div`
    display: flex;
    align-items: center;
`


class Meetings extends React.Component{
    
    constructor(state){
        super(state)

        this.state = {
            currentTab: 'Upcomming',
            loading: false
        }
    }

    componentDidMount(){
        this.fetchMeetings(this.state.currentTab)
    }

    handleTabChange = (title) =>{
        this.setState({
            currentTab: title
        })

        this.fetchMeetings(title)
    }   


    fetchMeetings = (filter)=>{
        this.setState({loading: true})
        this.props.fetchMeetings(filter.toLowerCase()).then((data)=>{
            this.setState({loading: false})
        })
    }                                                 

    render(){

        const {cases, meetings} = this.props
        return (
            <div style={{padding: '40px 10px'}}>
                <Flex>
                    <h2>Propose a meeting</h2>
                </Flex>
                <Card style={{ width: '100%' }}>
                    <MeetingForm/>
                </Card>
                <Divider/>
                <Tabs current={this.state.currentTab} handleTabChange={this.handleTabChange}>
                    <Tab title="Upcomming">
                       <MeetingsContainer loading={this.state.loading} meetings={meetings.upcomming}/>
                    </Tab>
                    <Tab title="Completed">
                        <MeetingsContainer loading={this.state.loading} meetings={meetings.completed}/>
                    </Tab>
                    <Tab title="Unattended">
                        <MeetingsContainer loading={this.state.loading} meetings={meetings.unattended}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchCases : () => {dispatch(fetchCases())},
    fetchMeetings: (filter) => dispatch(fetchMeetings(filter))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    cases: state.cases,
    meetings: state.meetings
})

export default connect(mapStateToProps, mapDispatchToProps)(Meetings)
