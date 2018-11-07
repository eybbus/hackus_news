import { combineReducers } from 'redux';
import news from './news';
import comments from './comments';

const rootReducer = combineReducers({
  news,
  comments,
});

export default rootReducer;
