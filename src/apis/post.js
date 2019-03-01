import API from './api';

const api = new API();

export const createPostAPI = (token, body) => {
  return api.post('/post', token, body);
};

export const getPostAPI = (token) => {
  return api.get('/post', token);
};

export const getSinglePostAPI = (token, postId) => {
  const params = {
    postId,
  };
  return api.get('/post', token, params);
};
