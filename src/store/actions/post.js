import { checkAuthenticated } from './auth';
import { createPostAPI } from '../../apis/post';

export const createPost = (image) => {
  return async (dispatch) => {
    console.log(image);
    const token = await dispatch(checkAuthenticated());
    const body = {
      data: {
        image,
      },
    };
    const result = await createPostAPI(token, body);
    console.log(result);
  };
};
