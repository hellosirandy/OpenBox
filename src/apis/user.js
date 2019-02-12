import API from './api';

const api = new API();

export const createUserAPI = () => {
  return api.post('/user');
};
