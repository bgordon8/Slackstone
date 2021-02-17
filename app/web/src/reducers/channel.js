import { GET_CHANNEL_DATA, NEW_CHANNEL_MESSAGE } from '../constants/types';

const intialState = {
  name: null,
  private: null,
  default: null,
  members: [],
  messages: [],
};

const channelReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_DATA: {
      return {
        name: action.payload.name,
        private: action.payload.private,
        members: action.payload.members,
        messages: action.payload.messages,
      };
    }
    case NEW_CHANNEL_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat([action.payload]),
      };
    }
    default:
      return state;
  }
};

export default channelReducer;
