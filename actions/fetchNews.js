import { FETCHING_NEWS, FETCHING_NEWS_FAILURE, FETCHING_NEWS_SUCCESS } from '../constants/Reducers';

export function fetchNews() {
  return (dispatch) => {
    dispatch(getNews());
    return fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        dispatch(getNewsSuccess(data));
      })
      .catch(err => dispatch(getNewsFailure(err)));
  };
}

function getNews() {
  return {
    type: FETCHING_NEWS,
  };
}

function getNewsSuccess(data) {
  return {
    type: FETCHING_NEWS_SUCCESS,
    data,
  };
}

function getNewsFailure() {
  return {
    type: FETCHING_NEWS_FAILURE,
  };
}
