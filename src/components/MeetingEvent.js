import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Card, Button, Divider, Icon} from 'antd'
import {Link} from 'react-router-dom'
import Avatar from '../images/avatar.png'
import moment from 'moment'

const Picture = styled.img`
  max-height: 120px;
  border-radius: 5px;
`

export class MeetingEvent extends Component {
  state = {
    accepted : false
  }

  handleAccept = () => {
    this.props.onAccept(this.props.data.id).then(data => {
      if(data.code === 1){
        this.setState({accepted : true})
      }
    })
  }

  render() {
    const {data, type} = this.props
    
    return (
      <Card bodyStyle={{padding: 10}} style={{marginBottom: 10}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

          {data.partner && <div style={{padding: '10px 20px'}}>
            <div style={{fontSize: 20}}>
              <span>{data.partner.name}</span>
            </div>
            <div>
              <Icon type="safety-certificate" />
              <span style={{marginLeft: 5}}>{data.partner.experience}</span>
            </div>
            <div style={{marginTop: 10}}>
              {
                type === 'meet'?
                (data.progress !== 'finished'? <Button type="dashed"><Link to={`/meeting/${data.id}`}>Meeting Room</Link></Button>:null)
                : <Button type={this.state.accepted?"primary":"dashed"} onClick={this.handleAccept}>{this.state.accepted? 'Accepted': 'Accept'}</Button>
              }
            </div>

          </div>}

          <div style={{padding: '10px 20px'}}>
            <div style={{fontSize: 20}}>
              <span>{data.case_title}</span>
            </div>
            <div>
              <Icon type="reconciliation" />
              <span style={{marginLeft: 5}}>{data.difficulty}</span>
            </div>
            <div>
              <Icon type="calendar" />
              <span style={{marginLeft: 5}}>{moment.utc(data.time).local().format('DD MMM YYYY hh:MM A')}</span>
            </div>
            <div>
              <Icon type="clock-circle" />
              <span style={{marginLeft: 5}}>90 Minutes</span>
            </div>
          </div>


    
    
          {
            this.props.isMobile? null:
            <div style={{float: 'right'}}>
              <Picture src={data.partner?data.partner.picture: Avatar}/>
            </div>
          }
        </div>
 
      </Card>
    )
  }
}

MeetingEvent.defaultProps ={
  type: 'meet',
  onAccept: (id) => {console.log(id)}
}

export default MeetingEvent

