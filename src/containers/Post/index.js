import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row, Col, Icon, Input, Avatar} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Header from '../../components/Header'
import NewPostForm from '../../components/NewPostForm'
import {TextButton, PopButton} from '../../components/Design'
import { fetchDiscussionPost, voteDiscussion, deleteDiscussion, followDiscussion, unfollowDiscussion} from '../../actions/discussion'
import CommentBox from './CommentBox'
import Comment from './Comment'

export class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            editBoxVisible: false
        }
    }

    componentDidMount(){
        this.props.fetchDiscussionPost(this.props.match.params.id).then(data => {
            if(data.code === 1){
                this.setState({loading: false})
            }
        })
    }

    handleUpvote = () => {
        this.props.voteDiscussion(this.props.discussion.id, 'upvote')
    }

    handleDownvote = () => {
        this.props.voteDiscussion(this.props.discussion.id, 'downvote')
    }

    toggleEditBox = () => {
        this.setState({editBoxVisible: !this.state.editBoxVisible})
    }

    handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this post?')){
            this.props.deleteDiscussion(this.props.discussion.id)
        }
    }

    handleFollow = () => {
        if(!this.props.discussion.following){
            this.props.followDiscussion()
        } else{
            this.props.unfollowDiscussion()
        }
    }

  render() {
    const {isMobile, discussion, user} = this.props
    
    return (
        <div>
            <Header/>
            <div style={{display:'flex', 'justifyContent': 'center', background: '#fdfdfd', padding: '40px 10px', fontFamily: 'din-round, sans-serif'}}>
                    <div style={{width: isMobile?'100%':'70%'}}>
                        <Row gutter={64}>
                            <Col xs={24} sm={24} md={17} lg={17}>
                                {this.state.loading? null: 
                                <>
                                    {this.state.editBoxVisible? <NewPostForm onCancel={this.toggleEditBox} type='edit' post={discussion}/>:
                                    <>
                                        <Row type="flex" justify='end' style={{marginBottom: 20}}>
                                            <PopButton onClick={this.handleFollow} type={discussion.following?'white': 'primary'}>{discussion.following?'Unfollow Discussion':'Follow Discussion'}</PopButton>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <div style={{}}>
                                                    <Avatar size={64} src={discussion.picture}/>
                                                </div>
                                            </Col>
                                            <Col span={20}>                                    
                                                <div style={{}}>
                                                    <h2 style={{color: '#4c4c4c', fontWeight: 700, fontSize: 24}}>{discussion.title}</h2>
                                                    <div style={{color: '#1cb0f6', fontWeight: 700, fontSize: 15}}>
                                                        <Link to={`/${discussion.username}`}>{discussion.name}</Link>
                                                    </div>
                                                    <div style={{color: '#4c4c4c', fontWeight: 500, fontSize: 17, marginTop: 30}}>
                                                        {discussion.post}
                                                    </div>
                                                    <Row type='flex' justify='space-between' style={{color: '#999', fontSize: 17, marginTop: 30, fontWeight: 700}}>
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <div>
                                                                {discussion.score}
                                                            </div>
                                                            <div style={{display: 'flex', marginLeft: 10}}>
                                                                <TextButton activeColor='#7AC70C' active={discussion.vote === 'up'}><Icon type="caret-up" onClick={this.handleUpvote}/></TextButton>
                                                                <TextButton activeColor="#D33131" active={discussion.vote === 'down'}><Icon type="caret-down" onClick={this.handleDownvote}/></TextButton>
                                                            </div>
                                                            <div style={{marginLeft: 10, fontSize: 13, fontWeight: 500}}>
                                                                {moment.utc(discussion.time).local().fromNow()}
                                                            </div>
                                                        </div>
                                                        <div style={{display: 'flex'}}>
                                                            {discussion.user_id === this.props.user.id && <>
                                                                <TextButton onClick={this.toggleEditBox}>EDIT</TextButton>
                                                                <TextButton onClick={this.handleDelete}>DELETE</TextButton>
                                                            </>}
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                        
                                        </Row>
                                        
                                        <Row style={{marginTop: 30}}>
                                            <Col span={4}>
                                                <div style={{}}>
                                                    <Avatar size={64} src={user.picture}/>
                                                </div>
                                            </Col>
                                            <Col span={20}>                                    
                                                <div style={{}}>
                                                    <CommentBox/>
                                                </div>
                                            </Col>
                                    
                                        </Row>

                                        <Row style={{marginTop: 30}}>
                                            <div style={{display: 'flex'}}>
                                                <h2 style={{color: '#4c4c4c', fontWeight: 700, fontSize: 24}}>{discussion.comments_count+ ` Comment${discussion.comments.length > 1? 's':''}`} </h2>
                                            </div>
                                            {
                                                discussion.comments.map(comment => (
                                                    <Comment key={comment.time} comment={comment}/>
                                                ))
                                            }
                                        </Row>
                                    </>
                                    }
                                </>
                                }
                            </Col>
                            <Col xs={24} sm={24} md={7} lg={7}>
                                <Input.Search
                                    placeholder="search"
                                    size="large"
                                    onSearch={value => console.log(value)}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  isMobile : state.isMobile,
  discussion: state.discussionPost,
  user: state.user
})

const mapDispatchToProps = dispatch =>  ({
  fetchDiscussionPost : (id) => dispatch(fetchDiscussionPost(id)),
  voteDiscussion: (id, vote) => dispatch(voteDiscussion(id, vote)),
  deleteDiscussion: id => dispatch(deleteDiscussion(id)),
  followDiscussion : () => dispatch(followDiscussion()),
  unfollowDiscussion : () => dispatch(unfollowDiscussion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
