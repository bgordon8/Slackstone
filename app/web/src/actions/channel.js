import { GET_CHANNEL_DATA } from '../constants/types';

export const getChannelData = ({ channelId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:4000/channels/${channelId}/data`,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );

      const responseBody = await res.json();

      dispatch({
        type: GET_CHANNEL_DATA,
        payload: responseBody,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
