import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {Card, Input} from 'antd'
import { fetchMessages, postMessage} from '../../actions/meeting'

const SectionCard = styled(Card)`
    margin-bottom: 20px !important;
`

const styles = {
  messageContainer :{
    minHeight: 300, 
    maxHeight: 300, 
    background: '#f3f3f3', 
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflowY: 'scroll'
  }
}

function Message(props){
  const float = props.align === 'left'? 'left' : 'right';
  const color = props.align === 'left' ? '#ffe37c' : '#b2dbf9';
  return (
    <div style={{margin: 5}}>
      <div style={{padding: '10px', borderRadius: 10 ,background: color,maxWidth: '80%', float}}>
        {props.text}
      </div>
    </div>
  )
}

export class ChatBox extends Component {
  state = {
    newtext : '',
    busy : false
  }
  componentDidMount(){
    setInterval(()=>{
      if(!this.state.busy){
        this.props.fetchMessages()
      }

    }, 2000)
  }

  componentDidUpdate(){
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  handleChange = (e) => {
    this.setState({
      newtext : e.target.value
    })
  }

  handleSubmitMessage = (e) =>{
    this.setState({busy: true})
    this.props.postMessage(e.target.value).then(data => {
      this.setState({busy: false})
    })

    
    this.setState({
      newtext: ''
    })
  }

  render() {
    const {isMobile, user} = this.props
    return (
        <SectionCard title="Chat">
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{}}>
                <div className="messagesContainer" style={styles.messageContainer} ref={el => {this.messageList  = el}}>
                  {this.props.messages.map(message => <Message key={message.id} text={message.message} align={message.user_id === user.id? 'right': 'left'}/>)}
                </div>            
              </div>
              <div className="messageInput">
                <Input placeholder="Message" onPressEnter={this.handleSubmitMessage} value={this.state.newtext} onChange={this.handleChange}/>
              </div>
            </div>
        </SectionCard>
    )
  }
}

const mapStateToProps = (state) => ({
  isMobile : state.isMobile,
  messages: state.meeting.interview.messages,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMessages : (last) => dispatch(fetchMessages(last)),
  postMessage: (message) => dispatch(postMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
