import { POST_SET_POSTS, POST_SET_POST_DICT } from '../actionTypes';

const initialState = {
  posts: [],
  postDict: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case POST_SET_POST_DICT:
      return {
        ...state,
        postDict: { ...state.postDict, ...action.postDict },
      };
    default:
      return state;
  }
};
export default reducer;
