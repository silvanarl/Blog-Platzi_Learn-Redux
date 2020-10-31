import { combineReducers } from 'redux';
import usersReducer from './users-reducers';
import publicReducer from './publicReducer';

export default combineReducers({
    usersReducer,
    publicReducer,
});