import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';
import {fetchInvitations, acceptInvitation} from '../../actions/meeting'
import Tabs, {Tab} from '../../components/Tabs'
import MeetingsContainer from './MeetingsContainer'

const Flex = styled.div`
    display: flex;
    align-items: center;
`


class Invitations extends React.Component{
    
    constructor(state){
        super(state)

        this.state = {
            currentTab: 'Today',
            loading: false
        }
    }

    componentDidMount(){
        this.fetchInvitations(this.state.currentTab)
    }

    handleTabChange = (title) =>{
        this.setState({
            currentTab: title
        })

        this.fetchInvitations(title)
    }   


    fetchInvitations = (filter)=>{
        this.setState({loading: true})
        this.props.fetchInvitations(filter.toLowerCase()).then((data)=>{
            this.setState({loading: false})
        })
    }
    
    handleAccept = (id) => {
        return this.props.acceptInvitation(id)
    }

    render(){

        const {invitations} = this.props
        return (
            <div style={{padding: '40px 10px'}}>

                <Tabs current={this.state.currentTab} handleTabChange={this.handleTabChange}>
                    <Tab title="Today">
                       <MeetingsContainer loading={this.state.loading} meetings={invitations.today} eventProps={{type :'invite', onAccept: this.handleAccept}}/>
                    </Tab>
                    <Tab title="Tomorrow">
                        <MeetingsContainer loading={this.state.loading} meetings={invitations.tomorrow} eventProps={{type :'invite', onAccept: this.handleAccept}}/>
                    </Tab>
                    <Tab title="Later">
                        <MeetingsContainer loading={this.state.loading} meetings={invitations.later} eventProps={{type :'invite', onAccept: this.handleAccept}}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchInvitations: (filter) => dispatch(fetchInvitations(filter)),
    acceptInvitation : (id) => dispatch(acceptInvitation(id))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    invitations: state.invitations
})

export default connect(mapStateToProps, mapDispatchToProps)(Invitations)
