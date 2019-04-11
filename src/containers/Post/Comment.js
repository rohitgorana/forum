import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row, Col, Avatar, Icon} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {TextButton} from '../../components/Design'
import CommentBox from './CommentBox'
import CommentsList from './CommentsList'
import { voteComment, deleteComment} from '../../actions/discussion'
export class Comment extends Component {

    state ={
        showReplyBox : false,
        showEditBox: false
    }

    toggleReplyBox = () => {
        this.setState({showReplyBox: !this.state.showReplyBox})
    }

    toggleEditBox = () => {
        this.setState({showEditBox: !this.state.showEditBox})
    }

    handleUpvote = () => {
        this.props.voteComment(this.props.comment.id, 'upvote')
    }

    handleDownvote = () => {
        this.props.voteComment(this.props.comment.id, 'downvote')
    }

    handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this post?')){
            this.props.deleteComment(this.props.comment.id)
        }
    }

  render() {
      const {comment} = this.props
    return (
      <div style={{marginBottom: 20, borderTop: '2px solid #e5e5e5'}}>
        <Row style={{marginTop: 30}}>
            <Col span={4}>
                <div style={{}}>
                    <Avatar size={64} src={comment.picture}/>
                </div>
            </Col>
            <Col span={20}>                                    
                <div style={{}}>
                    <div style={{color: '#1cb0f6', fontWeight: 700, fontSize: 15}}>
                    <Link to={`/${comment.username}`}>{comment.name}</Link>
                    </div>
                    {this.state.showEditBox? 
                        <CommentBox type='edit' onCancel={this.toggleEditBox} defaultValue={comment.post} commentId={comment.id}/>:
                        <div style={{color: '#4c4c4c', fontWeight: 500, fontSize: 17, marginTop: 10}}>
                            {comment.post}
                        </div>
                    }
                    <Row type='flex' style={{marginTop: 10, color: '#999', fontSize: 17,fontWeight: 700}}>
                        <div style={{display: 'flex', alignItems: 'center', }}>
                            <div>
                                {comment.score}
                            </div>
                            <div className='design-flex' style={{marginLeft: 10}}>
                                <TextButton activeColor='#7AC70C' active={comment.vote === 'up'}><Icon type="caret-up" onClick={this.handleUpvote}/></TextButton>
                                <TextButton activeColor="#D33131" active={comment.vote === 'down'}><Icon type="caret-down" onClick={this.handleDownvote}/></TextButton>
                            </div>
                            <div style={{marginLeft: 10, fontSize: 13, fontWeight: 500}}>
                                {moment.utc(comment.time).local().fromNow()}
                            </div>
                        </div>
                        <div style={{display: 'flex', marginLeft: 20}}>
                            <TextButton onClick={this.toggleReplyBox}>REPLY</TextButton>
                            {comment.user_id === this.props.user.id && <>
                                <TextButton onClick={this.toggleEditBox}>EDIT</TextButton>
                                <TextButton onClick={this.handleDelete}>DELETE</TextButton>
                            </>}
                        </div>

                    </Row>
                    {this.state.showReplyBox && <div style={{marginBottom: 20}}>
                        <CommentBox onCancel={this.toggleReplyBox} parent={comment.id}/>
                    </div>}
                    <CommentsList comments={comment.replies}/>
                </div>
            </Col>
    
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    isMobile : state.isMobile,
    user: state.user
  })
  
  const mapDispatchToProps = dispatch =>  ({
    voteComment: (id, vote) => dispatch(voteComment(id, vote)),
    deleteComment: id => dispatch(deleteComment(id))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comment)
