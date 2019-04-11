import createReducer from '../util/createReducer'
import * as types from '../actions/types'


export const auth = createReducer({loggedIn: false}, {
    [types.SET_AUTH](state, action){
        return {loggedIn: action.loggedIn}
    },
    [types.LOGOUT](state, action){
        return {loggedIn: false}
    }
    
})

export const signup = createReducer({completed: false}, {
    [types.COMPLETE_SIGNUP](state,action){
        return {completed : action.completed}
    }
})

export const user = createReducer({
    name: '',
    picture: ''
}, {
    [types.SET_USER](state, action){
        return action.user
    },
    [types.UPDATE_USER](state, action){
        return Object.assign({}, state, action.user)
    }
})



