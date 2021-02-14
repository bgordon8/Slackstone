const initialState = {
  token: null,
  expiresAt: null,
  userInfo: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default authReducer;
