import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function authUser(type, userData) {
  console.log(type)
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `http://localhost:2000/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem('token', token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          console.log('jjjjjjjjjj')
          dispatch(addError(err.message));
          reject();
        });
    })
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken();
    dispatch(setCurrentUser({}));
  }
}
