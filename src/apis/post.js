import API from './api';

const api = new API();

export const createPostAPI = (token, body) => {
  return api.post('/post', token, body);
};
