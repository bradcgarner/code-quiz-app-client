import { combineReducers } from 'redux';
import { reducer as user } from './users';
import { reducer as quiz } from './quiz';
import { reducer as mode } from './mode';

export default combineReducers ( {
  user,
  quiz, 
  mode
})