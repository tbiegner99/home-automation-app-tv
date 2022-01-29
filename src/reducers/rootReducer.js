import { combineReducers } from 'redux';
import TVStore from '../stores/tv/TVStore';

export default combineReducers({
  tv: TVStore.reduce
});
