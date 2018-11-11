import {
  FETCHING_SEARCH,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  FETCHING_MORE_SEARCH__SUCCESS,
  FETCHING_MORE_SEARCH,
} from '../constants/Reducers';

const initialSearchState = {
  search: {
    show_hn: { hits: [] },
    ask_hn: { hits: [] },
    job: { hits: [] },
  },
  isFetching: false,
  isFetchingMore: false,
  error: false,
};

export default function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case FETCHING_SEARCH:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_MORE_SEARCH:
      return {
        ...state,
        isFetchingMore: true,
      };
    case FETCHING_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        search: { ...state.search, ...action.data },
      };
    case FETCHING_MORE_SEARCH__SUCCESS:
      var type = Object.keys(action.data)[0];
      return {
        ...state,
        isFetchingMore: false,
        search: {
          ...state.search,
          [type]: { hits: [...state.search[type].hits, ...action.data[type].hits] },
        },
      };
    case FETCHING_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchingMore: false,
        error: true,
      };
    default:
      return state;
  }
}
