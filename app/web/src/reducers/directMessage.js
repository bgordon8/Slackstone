import { GET_DIRECT_MESSAGE_DATA } from '../constants/types';

const initialState = {
  messages: [],
};

const directMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIRECT_MESSAGE_DATA: {
      return {
        ...state,
        messages: action.payload.messages,
      };
    }
    default:
      return state;
  }
};

export default directMessageReducer;
