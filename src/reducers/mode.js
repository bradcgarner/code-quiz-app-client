import * as actions from '../actions/mode';
import { initialMode } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  console.log(action.type);
  if ( action.type === 'actions.NAME' ) {
    //do something
  } else if ( action.type === actions.GOTO_LOGIN ) {
    console.log('login at reducer');
    return Object.assign({}, state, {
      view: action.view,
    })
  } else {
    return state;
  }
}