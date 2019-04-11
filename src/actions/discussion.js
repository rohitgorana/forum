import * as types from './types'
import axios from 'axios'
import moment from 'moment'
import { dispatch } from 'rxjs/internal/observable/pairs';


export function postDiscussion(discussion){
    return dispatch => {
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('title', discussion.title)
        params.append('content', discussion.content) 
        params.append('tags', discussion.tags)

        return axios.post(process.env.REACT_APP_API + `api/discussion`, params).then(({data}) => {
            return data
        })

    }
}

export function editDiscussion(id,discussion){
    return dispatch => {
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('title', discussion.title)
        params.append('content', discussion.content) 
        params.append('tags', discussion.tags)

        return axios.post(process.env.REACT_APP_API + `api/discussion/post/${id}`, params).then(({data}) => {
            dispatch(updateDiscussion(discussion))
        })

    }
}

export function updateDiscussion(discussion){
    return {
        type: types.UPDATE_DISCUSSION,
        discussion
    }
}

export function fetchDiscussions(filter = 'popular'){
    return dispatch => {
        
        return axios.get(process.env.REACT_APP_API+ `api/discussion/?filter=${filter}&access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(setDiscussions(data.discussions, filter))
            }

            return data
        })
    }
}

export function setDiscussions(data, filter){
    return {
        type : types.SET_DISCUSSIONS,
        discussions : {
            filter,
            data
        }
    }
}

export function searchDiscussion(key){
    return dispatch =>{
        return axios.get(process.env.REACT_APP_API+ `api/discussion/search/?key=${key}&access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(setDiscussions(data.discussions, 'search'))
            }

            return data
        })
    }
}

export function fetchDiscussionPost(id){
    return dispatch => {
        return axios.get(process.env.REACT_APP_API + `api/discussion/post/${id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            dispatch(setDiscussionPost(data.discussion))
            return data
        })
    }
}

export function setDiscussionPost(discussion){
    return {
        type: types.SET_DISCUSSION_POST,
        discussion
    }
}

export function postComment(comment, parent){
    return (dispatch, getState) => {

        const {discussionPost, user} = getState()

        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('comment', comment)

        if(parent !== undefined){
            params.append('parent', parent)
        }

        return axios.post(process.env.REACT_APP_API + `api/comment/post/${discussionPost.id}`, params).then(({data}) => {
           
            if(data.code === 1){
                dispatch(addComment({
                    id : data.id,
                    post: comment,
                    parent,
                    score: 0,
                    time: moment.now(),
                    user_id: user.id,
                    name: user.name,
                    picture: user.picture,
                    replies: [],
                    vote: 'none'
                }))
            }
            return data
        })

    }
}

export function editComment(comment, id){
    return dispatch => {

        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('comment', comment)


        return axios.post(process.env.REACT_APP_API + `api/comment/edit/${id}`, params).then(({data}) => {
           
            if(data.code === 1){
                dispatch({
                    type: types.EDIT_COMMENT,
                    comment:{
                        id,
                        post: comment,
                    }
                })
                
            }
            return data
        })

    }
}

export function addComment(comment){
    return {
        type: types.ADD_COMMENT,
        comment
    }
}

export function voteComment(id, vote){
    return dispatch => {

        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))

        return axios.post(process.env.REACT_APP_API + `api/comment/${vote}/${id}/?entity=comment`, params).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch({
                    type: vote === 'upvote'?types.UPVOTE_COMMENT: types.DOWNVOTE_COMMENT,
                    id
                })
                
            }
            return data
        })

    }
}

export function voteDiscussion(id, vote, origin='post'){
    return dispatch => {
        
        
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))

        return axios.post(process.env.REACT_APP_API + `api/comment/${vote}/${id}/?entity=discussion`, params).then(({data}) => {
            if(data.code === 1){
                    dispatch({
                        type: vote === 'upvote'?types.UPVOTE_DISCUSSION: types.DOWNVOTE_DISCUSSION,
                        id,
                        origin
                    })
                
            }
            return data
        })

    }
}

export function deleteDiscussion(id){
    return dispatch => {
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))

        return axios.post(process.env.REACT_APP_API + `api/comment/delete/${id}/?entity=discussion`, params).then(({data}) => {
           
            if(data.code === 1){
                window.location = '/forum'
            }
            return data
        })
    }
}

export function deleteComment(id){
    return dispatch => {
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))

        return axios.post(process.env.REACT_APP_API + `api/comment/delete/${id}/?entity=comment`, params).then(({data}) => {
           console.log(data)
            if(data.code === 1){
                dispatch({
                    type: types.DELETE_COMMENT,
                    id
                })
            }
            return data
        })
    }
}

export function followDiscussion(){
    return (dispatch, getState) => {
        const {discussionPost} = getState()
        return axios.get(process.env.REACT_APP_API+ `api/discussion/follow/${discussionPost.id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch({
                    type: types.FOLLOW_DISCUSSION
                })
            }
        })
    }
}
export function unfollowDiscussion(){
    return (dispatch, getState) => {
        const {discussionPost} = getState()
        return axios.get(process.env.REACT_APP_API+ `api/discussion/unfollow/${discussionPost.id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            if(data.code === 1){
                dispatch({
                    type: types.UNFOLLOW_DISCUSSION
                })
            }
        })
    }
}
