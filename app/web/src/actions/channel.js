import { GET_CHANNEL_DATA, NEW_CHANNEL_MESSAGE } from '../constants/types';

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

export const newChannelMessage = ({ message }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:4000/channels/${message.channelId}/messages/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            message: message.message,
          }),
        }
      );

      const responseBody = await res.json();
      dispatch({
        type: NEW_CHANNEL_MESSAGE,
        payload: responseBody.message,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
