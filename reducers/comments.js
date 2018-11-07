import {
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_FAILURE,
  FETCHING_COMMENTS_SUCCESS,
} from '../constants/Reducers';

const initialState = {
  comments: [],
  isFetching: false,
  error: false,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_COMMENTS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.data.children,
      };
    case FETCHING_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
}
