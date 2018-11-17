import { SAVED_LIST_ADD, SAVED_LIST_REMOVE, SAVED_LIST_FETCH } from '../constants/Reducers';

const initialState = {
  savedList: [],
};

export default function SavedListReducer(state = initialState, action) {
  switch (action.type) {
    case SAVED_LIST_FETCH:
      return {
        ...state,
        savedList: action.data,
      };
    case SAVED_LIST_ADD:
      return {
        ...state,
        savedList: action.data,
      };
    case SAVED_LIST_REMOVE:
      return {
        ...state,
        savedList: action.data,
      };
    default:
      return state;
  }
}
