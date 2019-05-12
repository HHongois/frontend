import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import msgReducer from './msgReducer';

export default combineReducers({
  authReducer,
  errorReducer,
  postsReducer,
  userReducer,
  msgReducer
});
