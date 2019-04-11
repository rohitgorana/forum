import { combineReducers } from "redux";
import * as envReducers from './environment' 
import * as userReducers from './user' 
import * as casesReducers from './cases' 
import * as meetingReducers from './meeting'
import * as discussionReducers from './discussion'



export default combineReducers({
    ...userReducers, 
    ...envReducers,
    ...casesReducers,
    ...meetingReducers,
    ...discussionReducers,
});