import { combineReducers } from 'redux';
import newsStore from './news';
import commentsStore from './comments';
import searchStore from './search';

const rootReducer = combineReducers({
  newsStore,
  commentsStore,
  searchStore,
});

export default rootReducer;
