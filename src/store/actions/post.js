import { checkAuthenticated } from './auth';
import { createPostAPI, getPostAPI, getSinglePostAPI } from '../../apis/post';
import { uiStartLoading, uiStopLoading } from './ui';
import { POST_CREATING, POST_GETTING } from '../loadingTypes';
import { POST_SET_POSTS, POST_SET_POST_DICT } from '../actionTypes';

export const createPost = (data) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(POST_CREATING));
    const token = await dispatch(checkAuthenticated());
    const body = {
      data,
    };
    try {
      createPostAPI(token, body);
      dispatch(uiStopLoading(POST_CREATING));
    } catch (e) {
      dispatch(uiStopLoading(POST_CREATING));
    }
  };
};

export const getPost = () => {
  return async (dispatch) => {
    dispatch(uiStartLoading(POST_GETTING));
    const token = await dispatch(checkAuthenticated());
    try {
      const posts = await getPostAPI(token);
      dispatch(setPost(posts));
      const postDict = {};
      posts.forEach((post) => {
        postDict[post.postId] = post;
      });
      dispatch(setPostDict(postDict));
      dispatch(uiStopLoading(POST_GETTING));
    } catch (e) {
      dispatch(uiStopLoading(POST_GETTING));
    }
  };
};

export const getSinglePost = (postId) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(POST_GETTING));
    const token = await dispatch(checkAuthenticated());
    try {
      const post = await getSinglePostAPI(token, postId);
      console.log(post);
      const postDict = {
        [postId]: post,
      };
      dispatch(setPostDict(postDict));
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(POST_GETTING));
    }
  };
};

const setPost = (posts) => {
  return {
    type: POST_SET_POSTS,
    posts,
  };
};

const setPostDict = (postDict) => {
  return {
    type: POST_SET_POST_DICT,
    postDict,
  };
};

