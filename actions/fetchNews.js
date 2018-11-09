import {
  FETCHING_NEWS,
  FETCHING_NEWS_FAILURE,
  FETCHING_NEWS_SUCCESS,
  FETCHING_NEW_NEWS_SUCCESS,
  FETCHING_NEW_NEWS,
} from '../constants/Reducers';

function getNews() {
  return {
    type: FETCHING_NEWS,
  };
}

function getNewNews() {
  return {
    type: FETCHING_NEW_NEWS,
  };
}

function getNewsSuccess(data) {
  console.log('newData:');
  console.log(data.hits);
  return {
    type: FETCHING_NEWS_SUCCESS,
    data,
  };
}

function getNewNewsSuccess(data) {
  return {
    type: FETCHING_NEW_NEWS_SUCCESS,
    data,
  };
}

function getNewsFailure() {
  return {
    type: FETCHING_NEWS_FAILURE,
  };
}

export function fetchNews(pageNum) {
  return (dispatch) => {
    dispatch(getNews());
    return fetch(`http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`)
      .then(res => res.json())
      .then((data) => {
        dispatch(getNewsSuccess(data));
      })
      .catch(err => dispatch(getNewsFailure(err)));
  };
}
export function fetchNewNews() {
  return (dispatch) => {
    dispatch(getNewNews());
    return fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
      .then(res => res.json())
      .then((data) => {
        dispatch(getNewNewsSuccess(data));
      })
      .catch(err => dispatch(getNewsFailure(err)));
  };
}
