import * as types from './types'
import axios from 'axios'

export function fetchCases(){
    return (dispatch, getState) => {

        axios.get(process.env.REACT_APP_API + `api/cases/?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            dispatch(setCases(data.cases))
        })
    }
}

export function setCases(cases){
    return {
        type: types.SET_CASES,
        cases
    }
}

