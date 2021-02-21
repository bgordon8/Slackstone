import { GET_DIRECT_MESSAGE_DATA } from '../constants/types';

export const getDirectMessageData = ({ workspaceId, recipientId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:4000/workspaces/${workspaceId}/direct-messages/${recipientId}`,
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
        type: GET_DIRECT_MESSAGE_DATA,
        payload: responseBody,
      });
    } catch (err) {
      console.log(err);
    }
  };
};