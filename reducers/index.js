import { combineReducers } from 'redux';
import newsStore from './news';
import commentsStore from './comments';

const rootReducer = combineReducers({
  newsStore,
  commentsStore,
});

export default rootReducer;
