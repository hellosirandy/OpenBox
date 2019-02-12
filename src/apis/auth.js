import Amplify, { Auth } from 'aws-amplify';

const poolDatas = {
  dev: {
    userPoolId: 'us-east-1_cNQBnEEPb',
    userPoolWebClientId: '36umbuvdiffcd5sgkiccov100q',
  },
};

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    ...poolDatas[process.env.REACT_APP_ENV],
  },
});

export const checkAuthenticatedAPI = async () => {
  const session = await Auth.currentSession();
  if (session.isValid()) {
    return session.getIdToken().getJwtToken();
  }
  throw String('Token is invalud');
};

export const signOutAPI = () => {
  return Auth.signOut();
};

export const signUpAPI = (email: string, password: string, firstName: string, lastName: string) => {
  return Auth.signUp({
    username: email,
    password,
    attributes: { email, given_name: firstName, family_name: lastName },
  });
};

export const signInAPI = async (email: string, password: string) => {
  const user = await Auth.signIn(email, password);
  return user.signInUserSession.getIdToken().getJwtToken();
};

export const confirmUserAPI = (email: string, code: string) => {
  return Auth.confirmSignUp(email, code);
};

export const changePasswordAPI = async (oldPassword: string, newPassword: string) => {
  const user = await Auth.currentAuthenticatedUser();
  return Auth.changePassword(user, oldPassword, newPassword);
};

