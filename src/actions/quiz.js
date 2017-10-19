import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
// NOTE: Quiz is for quizzes and questions
// CHOICES GO IN USERS !!!

export const QUESTIONS = 'QUESTIONS';
export const questions = (questions) => ({
  type: QUESTIONS,
  questions
});

// this is the single current quiz
export const UPDATE_QUIZ_STORE = 'UPDATE_QUIZ_STORE';
export const updateQuizStore = (quiz) => ({
  type: UPDATE_QUIZ_STORE,
  id: quiz.id,    
  name: quiz.name,
  category: quiz.category,
  difficulty: quiz.difficulty,
  current: 0,
});

// this is the single current quiz
export const UPDATE_QUIZ_STORE_QUESTIONS = 'UPDATE_QUIZ_STORE_QUESTIONS';
export const updateQuizStoreQuestions = (questions) => ({
  type: UPDATE_QUIZ_STORE_QUESTIONS,
  current: 0,
  questions: questions,
});

export const UPDATE_QUIZ_MENU = 'UPDATE_QUIZ_MENU';
export const updateQuizMenu = (menu) => ({
  type: UPDATE_QUIZ_MENU,
  menuOfAllQuizzes: menu
});
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const updateCurrentQuestion = (index) => ({
  type: UPDATE_CURRENT_QUESTION,
  current: index
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes
export const  fetchQuizzes = () => dispatch => {
  console.log("fetches quizzes async action");
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/`)
      .then(res => {
        console.log('quizzes fetched',res);
          if (!res.ok) {
              return Promise.reject(res.statusText);
          }
          return res.json();
      })
      .then(quizzes => {
        console.log('quizzes fetched',quizzes);
          dispatch(updateQuizMenu(quizzes));
          return dispatch(actionsMode.gotoQuizlist());
      })
      .catch(error => {
       // dispatch(fetchError(error));
        console.log(error);
      });
};

//update quiz by ID
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id`
// name:req.body.name,
{/*description: req.body.description,
category: req.body.category,
difficulty: req.body.difficulty,
questions: req.body.questions*/}


// get all questions by quiz id
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id/questions`
//quizId

export const takeQuiz = quiz => dispatch => {
  console.log('do something clever while fetching questions');
  dispatch(updateQuizStore(quiz));
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/${quiz.id}/questions`)
        .then(res => {
          console.log(res);
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(questions => {
          console.log('quiz returned', questions);
          dispatch(actionsMode.gotoQuestion());
            return dispatch(updateQuizStoreQuestions(questions));
        })
        .then()
        .catch(error => {
         // dispatch(fetchError(error));
          console.log(error);
        });
  };

