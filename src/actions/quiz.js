import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
// NOTE: Quiz is for quizzes and questions
// CHOICES GO IN USERS !!!

export const QUESTIONS = 'QUESTIONS';
export const questions = (questions) => ({
  type: QUESTIONS,
  questions
});

export const UPDATE_QUIZ_STORE = 'UPDATE_QUIZ_STORE';
export const updateQuizStore = (quiz) => ({
  type: UPDATE_QUIZ_STORE,
  id: quiz.id,    
  name: quiz.name,
  category: quiz.category,
  difficulty: quiz.difficulty,
  current: 0,
  questions: quiz.questions,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

export const  fetchQuestions = () => dispatch => {
  console.log("fetches questions async action");
  fetch(`${REACT_APP_BASE_URL}/api/quizzes/questions`)
      .then(res => {
        console.log(res);
          if (!res.ok) {
              return Promise.reject(res.statusText);
          }
          return res.json();
      })
      .then(questions => {
        console.log(questions);
          dispatch(fetch(questions(questions)));
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

//gotoListOfQuizzes
//show all gotoListOfQuizzes  GET
//const url = `${REACT_APP_BASE_URL}/api/quizzes`

// takeQuiz
//get  takeQuiz by id 
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id`
//quizId

// get all questions by quiz id
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id/questions`
//quizId

export const takeQuiz = id => dispatch => {
  console.log('do something clever while loading')
  console.log('get all questions by Quiz id')
  console.log('add quiz to user\'s list if not already');
  console.log('update store to reflect which quiz we are taking')
  console.log('update store to reflect question mode')
}

