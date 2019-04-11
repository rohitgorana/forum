import createReducer from '../util/createReducer'
import * as types from '../actions/types'
export const isMobile = createReducer(false, {
    [types.SET_SCREEN](state, action){
        return action.isMobile
    }
})

export const loading = createReducer(false, {
    [types.APP_LOADING](state, action){
        return action.loading
    }
})