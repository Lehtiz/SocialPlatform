import axios from 'axios';

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    // make call to api with credentials
    const res = await axios.post('auth/login', userCredentials);
    // on success return user object
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    // on failure return error
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};
