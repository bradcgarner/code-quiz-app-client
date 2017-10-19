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
  } else if ( action.type === actions.UPDATE_QUIZ_STORE ) {
    return Object.assign({}, state, {
      id: action.id,    
      name: action.name,
      category: action.category,
      difficulty: action.difficulty,
      current: action.currrent || 0,
    })   
  } else if ( action.type === actions.UPDATE_QUIZ_STORE_QUESTIONS ) {
    return Object.assign({}, state, {
      current: action.current || 0,
      questions: action.questions
    })
  }
    else if ( action.type === actions.UPDATE_CURRENT_QUESTION ) {
      return Object.assign({}, state, {
        current: action.current
      })       
  } else { 
    return state;
  }
}

