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
    default:
      return state;
  }
};

export default workspaceReducer;
