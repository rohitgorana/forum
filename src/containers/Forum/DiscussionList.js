import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Avatar, List, Icon} from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {TextButton} from '../../components/Design'
import {voteDiscussion} from '../../actions/discussion'
const DiscussionTitle = styled.h4`
    font-size: 17px;
    font-weight: 700;
    color: #666;
`


export class DiscussionList extends Component {

  handleVote = (id, vote) => {
    this.props.voteDiscussion(id, vote, this.props.filter)
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        size='large'
        dataSource={this.props.data}
        renderItem={item => (
        <List.Item
            key={item.id}  
        >
            <List.Item.Meta
            avatar={<Avatar size={55} src={item.picture} />}
            title={<a href={`/discussion/${item.id}`}><DiscussionTitle>{item.title}</DiscussionTitle></a>}
            description={
                <div style={{display: 'flex', color: '#999', fontSize: 17}}>
                  <div style={{fontWeight: 700}}>
                    {item.score}
                  </div>
                  <div className='design-flex' style={{marginLeft: 10}}>
                    <TextButton activeColor='#7AC70C' active={item.vote === 'up'}><Icon type="caret-up" onClick={() => {this.handleVote(item.id, 'upvote')}}/></TextButton>
                    <TextButton activeColor="#D33131" active={item.vote === 'down'}><Icon type="caret-down" onClick={() => {this.handleVote(item.id, 'downvote')}}/></TextButton>
                  </div>
                  <div style={{marginLeft: 10, fontSize: 13}}>
                    {moment.utc(item.time).local().fromNow()}
                  </div>
                  <div style={{marginLeft: 10, fontSize: 13}}>
                    by <Link to={`/${item.username}`}>{item.name}</Link>
                  </div>
                
                </div>
            }
            />
        </List.Item>
        )}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  voteDiscussion: (id, vote, origin) => dispatch(voteDiscussion(id, vote, origin))
})

export default connect(null, mapDispatchToProps)( DiscussionList)
