import React, { Component } from 'react'
import Comment from './Comment'

export default class CommentsList extends Component {
  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
            <Comment key={comment.time} comment={comment}/>
        ))}
      </div>
    )
  }
}
