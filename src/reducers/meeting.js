import createReducer from '../util/createReducer'
import * as types from '../actions/types'


export const meetings = createReducer({upcomming: [], completed: [], unattended: []}, {
    [types.SET_MEETINGS](state, action){
        let x = {};
        x[action.meetings.filter] = [...action.meetings.data]
        return Object.assign({}, state, x)
    }
    
})

export const invitations = createReducer({today: [], tomorrow: [], later: []}, {
    [types.SET_INVITATIONS](state, action){
        let x = {};
        x[action.invitations.filter] = [...action.invitations.data]
        return Object.assign({}, state, x)
    }
    
})

export const meeting = createReducer({}, {
    [types.SET_MAIN_MEETING](state, action){
        return action.data
    },
    [types.SET_INTERVIEW](state, action){
        return Object.assign({}, state, {
            interview : {messages: [] , ...action.data}
        })
    },
    [types.UPDATE_INTERVIEW](state, action){
        return Object.assign({}, state, {interview : Object.assign({}, state.interview, action.data)})
    },
    [types.SET_MESSAGES](state, action){
        return Object.assign({}, state, {interview : Object.assign({}, state.interview, {messages: [...state.interview.messages, ...action.messages]})})
    }, 
    [types.SET_FEEDBACK](state, action){
        return Object.assign({}, state, {interview : Object.assign({}, state.interview, {feedback: action.feedback})})
    }
})
