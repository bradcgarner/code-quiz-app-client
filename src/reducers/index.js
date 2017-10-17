import { combineReducers } from 'redux';
import { reducer as user } from './users';
import { reducer as question } from './questions';

export default combineReducers ( {
  user,
  question
})