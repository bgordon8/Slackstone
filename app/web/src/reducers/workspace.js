import { GET_WORKSPACE_DATA, SET_ACTIVE_CHANNEL } from '../constants/types';

const intialState = {
  name: null,
  channels: [],
  directMessages: [],
  defaultChannel: null,
  activeChannel: null,
  owner: null,
};

const workspaceReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_WORKSPACE_DATA: {
      return {
        ...state,
        name: action.payload.name,
        channels: action.payload.channels,
        directMessages: action.payload.directMessages,
        defaultChannel: action.payload.defaultChannel,
        owner: action.payload.owner,
      };
    }
    case SET_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannel: action.payload,
      };
    default:
      return state;
  }
};

export default workspaceReducer;
