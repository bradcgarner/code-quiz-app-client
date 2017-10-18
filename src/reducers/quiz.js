import * as actions from '../actions/questions';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {
  if ( action.type === 'actions.NAME' ) {
    //do something
  } else if ( action.type === 'actions.NAME' ) {
    // do something else
  } else {
    return state;
  }
}