import { checkAuthenticated } from './auth';
import { createPostAPI } from '../../apis/post';
import { uiStartLoading, uiStopLoading } from './ui';
import { POST_CREATING } from '../loadingTypes';

export const createPost = (data) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(POST_CREATING));
    const token = await dispatch(checkAuthenticated());
    const body = {
      data,
    };
    try {
      const content = await createPostAPI(token, body);
      console.log(content);
      dispatch(uiStopLoading(POST_CREATING));
    } catch (e) {
      dispatch(uiStopLoading(POST_CREATING));
    }
  };
};
