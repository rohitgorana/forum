import createReducer from '../util/createReducer'
import * as types from '../actions/types'


export const discussions = createReducer({popular: [], new: [], top: [], following:[]}, {
    [types.SET_DISCUSSIONS](state, action){
        let x = {};
        x[action.discussions.filter] = [...action.discussions.data]
        return Object.assign({}, state, x)
    },
    [types.UPVOTE_DISCUSSION](state, action){
        if(action.origin == 'post'){
            return state
        }
        
        let x = {}
        x[action.origin] = state[action.origin].map(item => {
            if(item.id === action.id){
                var scoreDiff = 0, vote = 'up';
                switch(item.vote){
                    case 'up': scoreDiff = -1; vote='none'; break;
                    case 'none': scoreDiff = 1; break;
                    case 'down': scoreDiff = 2; break;
                }
                item.score = parseInt(item.score) + scoreDiff
                item.vote = vote
            }
            return item
        })

        return Object.assign({}, state, x)
    },
    [types.DOWNVOTE_DISCUSSION](state, action){
        if(action.origin == 'post'){
            return state
        }
        
        let x = {}
        x[action.origin] = state[action.origin].map(item => {
            if(item.id === action.id){
                var scoreDiff = 0, vote = 'down';
                switch(item.vote){
                    case 'up': scoreDiff = -2; break;
                    case 'none': scoreDiff = -1; break;
                    case 'down': scoreDiff = 1; vote='none';  break;
                }
                item.score = parseInt(item.score) + scoreDiff
                item.vote = vote
            }
            return item
        })

        return Object.assign({}, state, x)
    }
    
})

export const discussionPost = createReducer({}, {
    [types.SET_DISCUSSION_POST](state, action){
        return action.discussion
    },
    [types.UPDATE_DISCUSSION](state, action){
        return {...state, ...action.discussion}
    },
    [types.FOLLOW_DISCUSSION](state, action){
        return {...state, following: true}
    },
    [types.UNFOLLOW_DISCUSSION](state, action){
        return {...state, following: false}
    },
    [types.UPVOTE_DISCUSSION](state, action){
        if(action.origin != 'post'){
            return state
        }
        var scoreDiff = 0, vote = 'up';
        switch(state.vote){
            case 'up': scoreDiff = -1; vote='none'; break;
            case 'none': scoreDiff = 1; break;
            case 'down': scoreDiff = 2; break;
        }
        return Object.assign({}, state, {score: parseInt(state.score) + scoreDiff, vote})
    },
    [types.DOWNVOTE_DISCUSSION](state, action){
        if(action.origin != 'post'){
            return state
        }
        var scoreDiff = 0, vote = 'down';
        switch(state.vote){
            case 'up': scoreDiff = -2; break;
            case 'none': scoreDiff = -1; break;
            case 'down': scoreDiff = 1; vote='none';  break;
        }
        return Object.assign({}, state, {score: parseInt(state.score) + scoreDiff, vote})
    },
    [types.ADD_COMMENT](state, action){
        if(action.comment.parent == undefined){
            return Object.assign({}, state, {comments: [action.comment, ...state.comments]})
        }

        function find(comments){
            return comments.map(comment => {
                if(comment.id == action.comment.parent){
                    return {...comment, replies: [action.comment, ...comment.replies]}
                } 
                return {...comment, replies: find(comment.replies)}
            })

            
        }
        return Object.assign({}, state, {comments: find(state.comments), comments_count: state.comments_count +1});
    },
    [types.DELETE_COMMENT](state, action){

        function find(comments){
            return comments.reduce((filtered, comment) => {
                if(comment.id != action.id){
                    filtered.push({...comment, replies: find(comment.replies)})
                }
                return filtered
            }, [])            
        }
        return Object.assign({}, state, {comments: find(state.comments)});
    },
    [types.EDIT_COMMENT](state, action){

        function find(comments){
            return comments.map(comment => {
                if(comment.id == action.comment.id){
                    return {...comment, post: action.comment.post}
                } 
                return {...comment, replies: find(comment.replies)}
            })

            
        }
        return Object.assign({}, state, {comments: find(state.comments)});

    },
    [types.UPVOTE_COMMENT](state, action){   
        function find(comments){
            return comments.map(comment => {
                if(comment.id == action.id){

                    var scoreDiff = 0, vote = 'up';
                    switch(comment.vote){
                        case 'up': scoreDiff = -1; vote='none'; break;
                        case 'none': scoreDiff = 1; break;
                        case 'down': scoreDiff = 2; break;
                    }

                    return {...comment, score: parseInt(comment.score) + scoreDiff, vote}
                } 
                return {...comment, replies: find(comment.replies)}
            })

            
        }
        return Object.assign({}, state, {comments: find(state.comments)});
    },
    [types.DOWNVOTE_COMMENT](state, action){
        function find(comments){
            return comments.map(comment => {
                if(comment.id == action.id){
                    var scoreDiff = 0, vote = 'down';
                    switch(comment.vote){
                        case 'up': scoreDiff = -2; break;
                        case 'none': scoreDiff = -1; break;
                        case 'down': scoreDiff = 1; vote='none';  break;
                    }

                    return {...comment, score: parseInt(comment.score) + scoreDiff, vote}
                } 
                return {...comment, replies: find(comment.replies)}
            })

            
        }
        return Object.assign({}, state, {comments: find(state.comments)});
    },
})
