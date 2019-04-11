import * as types from './types'
import axios from 'axios'
import moment from 'moment'
import { dispatch } from 'rxjs/internal/observable/pairs';



export function fetchMeetings(filter){
    return (dispatch, getState) => {

        return axios.get(process.env.REACT_APP_API + `api/meeting/?filter=${filter.toLowerCase()}&access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(setMeetings(filter, data.meetings))
            }

            return data
        })
    }
}

export function addMeeting(meeting, form){
    return (dispatch, getState) => {

        let timeStr = meeting.date.format('DD-MM-YYYY')+' '+meeting.time.format('HH:MM:SS')
        let time = moment(timeStr   , 'DD-MM-YYYY HH:MM:SS');


        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('date', moment.utc(time).format('YYYY-MM-DD'))
        params.append('time', moment.utc(time).format('HH:mm:ss'))
        params.append('case', meeting.case)

        return axios.post(process.env.REACT_APP_API + `api/meeting`, params).then(({data}) => {
            if(data.code === 1){
                
            }

            return data;
        })

    }
}

export function setMeetings(filter, data){
    return {
        type: types.SET_MEETINGS,
        meetings : {filter, data}
    }
}

export function fetchInvitations(filter){
    return (dispatch, getState) => {

        return axios.get(process.env.REACT_APP_API + `api/invitations/?filter=${filter.toLowerCase()}&access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(setInvitations(filter, data.invitations))
            }

            return data
        })
    }
}

export function setInvitations(filter, data){
    return {
        type: types.SET_INVITATIONS,
        invitations : {filter, data}
    }
}

export function acceptInvitation(id){
    return dispatch => {
        return axios.get(process.env.REACT_APP_API + `api/invitations/accept/${id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            return data;
        })
    }
}

export function fetchMeetingInfo(id){
    return dispatch => {
        return axios.get(process.env.REACT_APP_API + `api/meeting/details/${id}?access_token=${localStorage.getItem('token')}`).then(({data}) =>{
            if(data.code === 1){
                dispatch(setMainMeeting(data.meeting));
            }

            return data;
        })
    }
}

export function setMainMeeting(data){
    return {
        type : types .SET_MAIN_MEETING,
        data
    }
}


export function proceedMeeting(id){
    return dispatch => {
        return axios.get(process.env.REACT_APP_API + `api/meeting/proceed/${id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(fetchMeetingInfo(id))
            }
        })
    }
}

export function fetchInterview(id){
    return (dispatch, getState) => {
        const {meeting} = getState()
        return axios.get(process.env.REACT_APP_API + `api/interview/details/${meeting.meeting_id}/${id}?access_token=${localStorage.getItem('token')}`).then(({data}) => {
            if(data.code === 1){
                dispatch(setInterview(data.interview))
            }
        })
        
    }
}

export function postFeedback(feedback){
    return (dispatch, getState) => {
        const {meeting} = getState()
        feedback = Object.assign({}, meeting.interview.feedback, feedback)


        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('structure',feedback.structure)
        params.append('analysis',feedback.analysis)
        params.append('communication',feedback.communication)
        params.append('appearance',feedback.appearance)
        return axios.post(process.env.REACT_APP_API + `api/interview/feedback/${meeting.interview.id}`, params).then(({data}) => {
            if(data.code === 1){
                dispatch(setFeedback({
                    structure: feedback.structure,
                    analysis: feedback.analysis,
                    communication: feedback.communication,
                    appearance: feedback.appearance,
                }))
            }
            return data
        })
    }
}

export function setFeedback(feedback){
    return {
        type : types.SET_FEEDBACK,
        feedback
    }
}

export function setInterview(data){
    return {
        type: types.SET_INTERVIEW,
        data
    }
}

export function updateInterview(data = {}){
    return {
        type: types.UPDATE_INTERVIEW,
        data
    }
}

export function resumeInterview(){
    return (dispatch, getState) => {
        const {meeting} = getState()
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('state', 'going')
        params.append('elapsed', meeting.interview.elapsed)

        return axios.post(process.env.REACT_APP_API + `api/interview/update/${meeting.interview.id}`, params).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(updateInterview({
                    state: 'going'
                }))
            }
        })
    }
}

export function pauseInterview(){
    return (dispatch, getState) => {
        const {meeting} = getState()
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('state', 'paused')
        params.append('elapsed', meeting.interview.elapsed)

        return axios.post(process.env.REACT_APP_API + `api/interview/update/${meeting.interview.id}`, params).then(({data}) => {
            if(data.code === 1){
                dispatch(updateInterview({
                    state: 'paused'
                }))
            }
        })
    }
}

export function finishInterview(){
    return (dispatch, getState) => {
        const {meeting} = getState()
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('state', 'finished')
        params.append('elapsed', meeting.interview.elapsed)
        

        return axios.post(process.env.REACT_APP_API + `api/interview/update/${meeting.interview.id}`, params).then(({data}) => {
            if(data.code === 1){
                dispatch(updateInterview({
                    state: 'finished'
                }))
                dispatch(proceedMeeting(meeting.meeting_id))
            }
        })
    }
}

export function syncInterviewTimer(){
    return (dispatch, getState) => {
        const {meeting} = getState()
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('state', meeting.interview.state)
        params.append('elapsed', meeting.interview.elapsed)
        return axios.post(process.env.REACT_APP_API + `api/interview/update/${meeting.interview.id}`, params).then(({data}) => {
            console.log(data.code)
        })
    }
}

export function fetchMessages(){
    return (dispatch, getState) => {
        const {meeting} = getState()
        const last = meeting.interview.messages.length? meeting.interview.messages[meeting.interview.messages.length -1].id: 0;
        console.log(last)
        return axios.get(process.env.REACT_APP_API + `api/interview/message/${meeting.interview.id}?last=${last}&access_token=${localStorage.getItem('token')}`).then(({data}) => {
            if(data.code === 1){
                dispatch(setMessages(data.messages))
            }
            return data
        })
    }
}

export function setMessages(messages){
    return {
        type : types.SET_MESSAGES,
        messages
    }
}

export function postMessage(message){
    return (dispatch, getState) => {
        const {meeting} = getState()
        var params = new URLSearchParams()
        params.append('access_token', localStorage.getItem('token'))
        params.append('message', message)
        return axios.post(process.env.REACT_APP_API + `api/interview/message/${meeting.interview.id}`, params).then(({data}) => {
            console.log(data)
            if(data.code === 1){
                dispatch(fetchMessages())
            }
            return data
        })
    }
}