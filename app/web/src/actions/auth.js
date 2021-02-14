import { AUTH_SUCCESS } from '../constants/types';

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
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

      console.log(responseBody);
    } catch (err) {
      console.log(err);
    }
  };
};
