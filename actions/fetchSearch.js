import {
  FETCHING_SEARCH,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  FETCHING_MORE_SEARCH__SUCCESS,
  FETCHING_MORE_SEARCH,
} from '../constants/Reducers';

function getSearch() {
  return {
    type: FETCHING_SEARCH,
  };
}

function getMoreSearch() {
  return {
    type: FETCHING_MORE_SEARCH,
  };
}

function getSearchSuccess(data) {
  return {
    type: FETCHING_SEARCH_SUCCESS,
    data,
  };
}

function getMoreSearchSuccess(data) {
  return {
    type: FETCHING_MORE_SEARCH__SUCCESS,
    data,
  };
}

function getSearchFailure() {
  return {
    type: FETCHING_SEARCH_FAILURE,
  };
}

export function fetchMoreSearch(pageNum) {
  return (dispatch) => {
    dispatch(getMoreSearch());
    return fetch(`http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`)
      .then(res => res.json())
      .then((data) => {
        dispatch(getMoreSearchSuccess(data));
      })
      .catch(err => dispatch(getSearchFailure(err)));
  };
}

/**
 * @param {searchType}          string    Available types: { search: Sorted by relevance,
 *                                        then points, then number of comments.
 *                                        search_by_date: Sorted by date, more recent first}.
 *                                        Defaults to search
 * @param {tags}                String    Available tags: story, comment, poll, pollopt,
 *                                        show_hn, ask_hn, front_page, author_:USERNAME,
 *                                        story_:ID. Defaults to front_page
 * @param {pageNum}             string    page number. Defaults to 0
 * @param {numericFilters}      string    filter on a specific numerical
 *                                        condition (<, <=, =, > or >=).
                                              Available numerical fields:
                                                  created_at_i,
                                                  points,
                                                  num_comments.
 */
export function fetchSearch(
  searchType = 'search',
  tag = 'front_page',
  pageNum = 0,
  numericFilters = '',
) {
  return (dispatch) => {
    if (pageNum > 0) {
      dispatch(getMoreSearch());
    } else {
      dispatch(getSearch());
    }
    return fetch(
      `http://hn.algolia.com/api/v1/${searchType}?tags=${tag}&page=${pageNum}&numericFilters=${numericFilters}`,
    )
      .then(res => res.json())
      .then((data) => {
        const type = { [tag]: data };
        if (pageNum > 0) {
          dispatch(getMoreSearchSuccess(type));
        } else {
          dispatch(getSearchSuccess(type));
        }
      })
      .catch(err => dispatch(getSearchFailure(err)));
  };
}
