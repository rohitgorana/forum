import * as types from './types'

export function setScreen(isMobile){
    return {
        type : types.SET_SCREEN,
        isMobile
    }
}

export function loading(loading){
    return {
        type: types.APP_LOADING,
        loading
    }
}