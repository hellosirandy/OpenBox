import { USER_SET_NAME } from '../actionTypes';

export const setUserName = (name) => {
  return (dispatch) => {
    dispatch({
      type: USER_SET_NAME,
      firstName: name.firstName,
      lastName: name.lastName,
    });
  };
};

