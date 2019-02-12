import { signInAPI, signOutAPI, checkAuthenticatedAPI, signUpAPI, changePasswordAPI } from '../../apis/auth';
import { AUTH_SET_TOKEN } from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SIGNIN } from '../loadingTypes';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading(AUTH_SIGNIN));
      const token = await signInAPI(email, password);
      dispatch(uiStopLoading(AUTH_SIGNIN));
      dispatch(setAuthenticated(token));
    } catch (e) {
      dispatch(uiStopLoading(AUTH_SIGNIN));
      if (e.code === 'UserNotConfirmedException') {
        throw Object({ needConfirmation: true });
      } else {
        throw String('Incorrect email/password');
      }
    }
  };
};

export const signUp = (email: string, password: string, firstName: string, lastName: string) => {
  return async () => {
    try {
      const result = await signUpAPI(email, password, firstName, lastName);
      console.log(result.user);
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        throw String('User already exists');
      } else {
        throw String('Invalid email/password');
      }
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await signOutAPI();
    dispatch(setAuthenticated(null));
  };
};

export const checkAuthenticated = () => {
  return async (dispatch, getState) => {
    try {
      const token = await checkAuthenticatedAPI();
      const { auth: { token: oldToken } } = getState();
      if (token !== oldToken) {
        dispatch(setAuthenticated(token));
      }
      return token;
    } catch (e) {
      dispatch(setAuthenticated(null));
    }
  };
};

// export const changePassword = (email, oldPassword, newPassword) => {
//   return async (dispatch) => {
//     dispatch(uiStartLoading(ACCOUNT_UPDATING_USER));
//     await changePasswordAPI(oldPassword, newPassword);
//     dispatch(uiStopLoading(ACCOUNT_UPDATING_USER));
//   };
// };

const setAuthenticated = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
  };
};

