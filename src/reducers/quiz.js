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
      currentIndex: action.currentIndex || 0,
    })   
  } else if ( action.type === actions.UPDATE_QUIZ_STORE_QUESTIONS ) {
    return Object.assign({}, state, {
      currentIndex: action.currentIndex || 0,
      questions: action.questions
    })
  } else if ( action.type === actions.UPDATE_CURRENT_QUESTION ) {
      return Object.assign({}, state, {
        currentIndex: action.currentIndex
      })    
      
  // this updates the CURRENT quiz
  } else if (action.type === actions.SCORE_CHOICE) {
    console.log('action', action)
    const questions = [...state.questions]; // create/copy immutable object from state.quizzes
    console.log('questions after array assign', questions)
    const questionIndex = questions.findIndex(question => question.id === action.questionId);
    console.log('questionIndex', questionIndex)
    questions[questionIndex].correct = action.correct;
    questions[questionIndex].choices = action.choices;
    console.log('questions correct', questions)
    return Object.assign({}, state, { questions });
  } else { 
    return state;
  }
}

