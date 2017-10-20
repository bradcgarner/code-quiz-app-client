import * as actions from '../actions/users';
import { initialUser } from './initialState';


export const reducer = ( state = initialUser, action ) => {
  if ( action.type === actions.UPDATE_USER_STORE ) {
    return Object.assign({}, state, {
      authToken: action.authToken,
      id: action.id,
      username: action.username,
      firstName: action.firstName,
      lastName: action.lastName,
      badges: action.badges,
      recent: action.recent,
      quizzes: action.quizzes
    })

  // this updated the USER SCORECARD, saved in the database
  } else if (action.type === actions.DISPLAY_QUIZ_SCORE ) {
    console.log('statequizzes', state.quizzes)
    const quizzes = [...state.quizzes]; // create/copy immutable object from state.quizzes
    // const currentQuiz = quizzes.filter(quiz=>quiz.id === quizId);
    console.log('quizzes after array assign', quizzes)
    const quizIndex = quizzes.findIndex(quiz => quiz.id == action.quizId);
    console.log('quizIndex', quizIndex)
    quizzes[quizIndex].correct = action.totalCorrect;
    console.log('quizzes correct', quizzes)
    quizzes[quizIndex].completed = action.totalCompleted;
    console.log('quizzes completed', quizzes)
    return Object.assign({}, state, { quizzes });

  } else if ( action.type === 'actions.ADD_QUIZ_USER_LIST' ) {
    return Object.assign({}, state, {
      quizzes: action.quizzes
    })

  } else {
    return state;
  }
}