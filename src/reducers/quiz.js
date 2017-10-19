import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {
  if ( action.type === actions.questions ) {
    return Object.assign({}, state, {
      questions: action.questions
    })
  } else if ( action.type === actions.UPDATE_QUIZ_MENU ) {
    return Object.assign({}, state, {
      menuOfAllQuizzes: action.menuOfAllQuizzes
    })
  } else {
    return state;
  }
}