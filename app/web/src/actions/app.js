import { GET_WORKSPACES } from '../constants/types';

export const getWorkspaces = ({ userId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:4000/users/${userId}/workspaces`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseBody = await res.json();
      dispatch({
        type: GET_WORKSPACES,
        payload: responseBody.workspaces,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
