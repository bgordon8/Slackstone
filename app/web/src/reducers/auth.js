import { AUTH_SUCCESS } from '../constants/types';

const initialState = {
  token: null,
  expiresAt: null,
  userInfo: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        userInfo: action.payload.userInfo,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
