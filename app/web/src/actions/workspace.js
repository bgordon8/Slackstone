import { GET_WORKSPACE_DATA } from '../constants/types';
import workspaceReducer from '../reducers/workspace';

export const getWorkspaceData = ({ workspaceId }) => {
  return async (dispatch) => {
    console.log(workspaceReducer);
    try {
      const res = await fetch(
        `http://localhost:4000/workspaces/${workspaceId}/data`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const responseBody = await res.json();

      dispatch({
        type: GET_WORKSPACE_DATA,
        payload: responseBody,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
