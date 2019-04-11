import * as types from './types'
import axios from 'axios'

export function authUser(code){
    return (dispatch, getState) => {
        var params = new URLSearchParams();
        params.append('code', code);
        axios.post(process.env.REACT_APP_API + 'api/auth/', params).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                localStorage.setItem('token', data.token);
                dispatch(setAuth(true))
                dispatch(completedSignup(data.user.signup_complete))
                dispatch(setUser(data.user))
            }
        })
    }
}

export function checkAuth(){
    return (dispatch, getState) => {
        let token = localStorage.getItem('token')
        return axios.get(process.env.REACT_APP_API + 'api/auth/check?access_token='+ token).then(({data}) => {
            if(data.code === 1){
                dispatch(setAuth(true))
                dispatch(completedSignup(data.user.signup_complete))
                dispatch(setUser(data.user))
            }
            return data;
            
        })
    }
}

export function signup(data){
    const {username, college, experience, companies, bio} = data
    return (dispatch, getState) => {
        var params = new URLSearchParams();
        params.append('username', username);
        params.append('college', college);
        params.append('experience', experience);
        params.append('companies', companies);
        params.append('bio', bio);
        params.append('access_token', localStorage.getItem('token'))
        axios.post(process.env.REACT_APP_API + 'api/user/', params).then(({data}) => {
            if(data.code ===1){
                dispatch(completedSignup(true))
            }
            
        })
    }
}

export function fetchProfile(){
    return (dispatch, getState) => {
        let token = localStorage.getItem('token')
        return axios.get(process.env.REACT_APP_API + 'api/user/profile/?access_token='+ token).then(({data}) => {
            if(data.code === 1){
                dispatch(updateUser(data.profile))
            }
            return data;
        })
    }
}

export function updateProfile(user){
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('bio', user.bio);
        params.append('access_token', localStorage.getItem('token'))
        return axios.post(process.env.REACT_APP_API + 'api/user/profile', params).then(({data}) => {
            if(data.code === 1){
                dispatch(updateUser({
                    bio : user.bio
                }))
            }

            return data;
            
        })
    }
}



export function logout(){
    localStorage.removeItem('token');
    return {
        type: types.LOGOUT,
    }
}

export function setAuth(loggedIn){
    return {
        type : types.SET_AUTH,
        loggedIn
    }
}

export function completedSignup(completed){
    return{
        type: types.COMPLETE_SIGNUP,
        completed
    }
}


export function setUser(user){
    return {
        type: types.SET_USER,
        user
    }
}

export function updateUser(user){
    return {
        type : types.UPDATE_USER,
        user
    }
}


export function fetchUserProfile(username){
    return dispatch => {
        return axios.get(process.env.REACT_APP_API + `api/user/profile/${username}/?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            return data
        })
    }
}