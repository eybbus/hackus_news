import { combineReducers } from 'redux';
import newsStore from './news';
import commentsStore from './comments';
import searchStore from './search';
import savedListStore from './readLater';

const rootReducer = combineReducers({
  newsStore,
  commentsStore,
  searchStore,
  savedListStore,
});

export default rootReducer;
