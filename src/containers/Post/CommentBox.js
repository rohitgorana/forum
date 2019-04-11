import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Input, message} from 'antd'
import {postComment, editComment} from '../../actions/discussion'
import {PopButton} from '../../components/Design'

export class CommentBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment : this.props.defaultValue
        }
    }

    handleCommentChange = (e) => {
        this.setState({comment: e.target.value})
    } 

    postComment = () =>{
        let parent = this.props.parent
        if(this.state.comment !== ''){
            if(this.props.type === 'edit'){
                this.props.editComment(this.state.comment, this.props.commentId).then(data => {
                    if(data.code === 1){
                        this.props.onCancel()
                    } else{
                        message.warning('Something went wrong. Please try again.')
                    }
                })
            } else {
                this.props.postComment(this.state.comment, parent).then(data => {
                    if(data.code === 1){
                        this.setState({comment: ''})
                        if(this.props.onCancel){
                            this.props.onCancel()
                        }
                        message.success('Comment Posted')
                    } else{
                        message.warning('Something went wrong. Please try again.')
                    }
                })
            }
        }
    }

    render() {
        return (
            <div>
                <Input.TextArea 
                    style={{padding: 15, color: '#4c4c4c', fontWeight: 500, fontSize: 17, background: '#f7f7f7', border: '2px solid #e5e5e5'}} 
                    rows={3} 
                    placeholder='Leave a new comment.'
                    onChange={this.handleCommentChange}
                    value={this.state.comment}
                />
                <div style={{marginTop: 10}}>
                    <PopButton onClick={this.postComment}> POST </PopButton>
                    { this.props.onCancel &&
                        <PopButton type='white' onClick={this.props.onCancel}> CANCEL </PopButton>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  postComment : (comment, parent) => dispatch(postComment(comment, parent)),
  editComment : (comment, id) => dispatch(editComment(comment, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)
