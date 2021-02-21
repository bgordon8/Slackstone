import {
  GET_DIRECT_MESSAGE_DATA,
  NEW_DIRECT_MESSAGE,
} from '../constants/types';

const initialState = {
  messages: [],
};

const directMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIRECT_MESSAGE_DATA: {
      return {
        ...state,
        messages: action.payload.messages,
        user: action.payload.user,
      };
    }
    case NEW_DIRECT_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat([action.payload]),
      };
    }
    default:
      return state;
  }
};

export default directMessageReducer;
