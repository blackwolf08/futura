import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case REMOVE_MESSAGE:
      const msgs = state.filter(m =>  m._id !== action.messageId);
      return msgs;
    default:
      return state;
  }
};

export default messages;