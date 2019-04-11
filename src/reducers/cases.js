import createReducer from '../util/createReducer'
import * as types from '../actions/types'


export const cases = createReducer([], {
    [types.SET_CASES](state, action){
        return action.cases
    }
    
})