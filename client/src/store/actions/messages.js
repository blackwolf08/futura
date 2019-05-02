import {apiCall} from '../../services/api';
import {addError} from './errors';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const fetchMessages = () => {
  return dispatch => {
    return apiCall('get', 'http://localhost:2000/api/messages')
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => addError(err.message))
  }
};

export const remove = messageId => ({
  type: REMOVE_MESSAGE,
  messageId
}); 

export const removeMessage = (userId, messageId) => {
  return dispatch => {
    return apiCall('delete', `http://localhost:2000/api/users/${userId}/messages/${messageId}`)
      .then(() => dispatch(remove(messageId)))
      .catch(err => dispatch(addError(err.message)));
  }
}

export const postNewMessage = text => (dispatch, getState) => {
  let {currentUser} = getState()
  const id = currentUser.user.id;
  return apiCall('post', `http://localhost:2000/api/users/${id}/messages`, {text})
    .then(res =>{

    })
    .catch(err => {
      dispatch(addError(err.message));
    });
}