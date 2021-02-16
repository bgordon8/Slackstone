import { AUTH_SUCCESS } from '../constants/types';

export const loginUser = ({ email, password }, success) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        throw new Error(responseBody.message);
      }

      localStorage.setItem('token', responseBody.token);
      localStorage.setItem('userInfo', JSON.stringify(responseBody.userInfo));
      localStorage.setItem('expiresAt', responseBody.expiresAt);

      dispatch({
        type: AUTH_SUCCESS,
        payload: responseBody,
      });
      success(true, { user: responseBody.userInfo });
    } catch (err) {
      console.log(err);
    }
  };
};
