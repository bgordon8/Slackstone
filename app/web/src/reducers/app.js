import { GET_WORKSPACES } from '../constants/types';

const intialState = {
  workspaces: [],
};

const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_WORKSPACES: {
      return {
        ...state,
        workspaces: action.payload,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
