import {
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_FAILURE,
  FETCHING_COMMENTS_SUCCESS,
} from '../constants/Reducers';

function getComments() {
  return {
    type: FETCHING_COMMENTS,
  };
}

function getCommentsSuccess(data) {
  return {
    type: FETCHING_COMMENTS_SUCCESS,
    data,
  };
}

function getCommentsFailure() {
  return {
    type: FETCHING_COMMENTS_FAILURE,
  };
}

export function fetchComments(id) {
  return (dispatch) => {
    dispatch(getComments());
    return fetch(`http://hn.algolia.com/api/v1/items/${id}`)
      .then(res => res.json())
      .then((data) => {
        dispatch(getCommentsSuccess(data));
      })
      .catch(err => dispatch(getCommentsFailure(err)));
  };
}
