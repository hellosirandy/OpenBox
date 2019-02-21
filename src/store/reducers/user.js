import { USER_SET_NAME } from '../actionTypes';

const initialState = {
  firstName: '',
  lastName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_NAME:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    default:
      return state;
  }
};
export default reducer;
