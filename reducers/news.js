import { FETCHING_NEWS, FETCHING_NEWS_FAILURE, FETCHING_NEWS_SUCCESS } from '../constants/Reducers';

const initialState = {
  news: { hits: [] },
  isFetching: false,
  error: false,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_NEWS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        news: action.data,
      };
    case FETCHING_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
}
