import { SET_CURRENT_USER } from '../actionTypes';

const DEAFULT_STATE = {
    isAuthenticated: false,
    user: {}
}

export default (state = DEAFULT_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
}