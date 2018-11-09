import {
  FETCHING_NEWS,
  FETCHING_NEWS_FAILURE,
  FETCHING_NEWS_SUCCESS,
  FETCHING_NEW_NEWS_SUCCESS,
  FETCHING_NEW_NEWS,
} from '../constants/Reducers';

const initialState = {
  news: { hits: [] },
  isFetching: false,
  isFetchingMore: false,
  error: false,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_NEWS:
      return {
        ...state,
        isFetchingMore: true,
      };
    case FETCHING_NEW_NEWS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_NEWS_SUCCESS:
      const test = [...state.news.hits, action.data.hits];
      console.log(test);
      return {
        ...state,
        isFetchingMore: false,
        news: { ...state.news, hits: [...state.news.hits, ...action.data.hits] },
      };
    case FETCHING_NEWS_FAILURE:
      return {
        ...state,
        isFetchingMore: false,
        error: true,
      };
    case FETCHING_NEW_NEWS_SUCCESS:
      console.log(...state);
      return {
        ...state,
        isFetching: false,
        news: action.data,
      };
    default:
      return state;
  }
}
