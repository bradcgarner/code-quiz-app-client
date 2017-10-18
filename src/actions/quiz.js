import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
// NOTE: Quiz is for quizzes and questions
// CHOICES GO IN USERS !!!

export const QUESTIONS = 'QUESTIONS';
export const questions = (questions) => ({
  type: QUESTIONS,
  questions
});

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
//
// takeQuiz
//get  takeQuiz by id 
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id`
//quizId

// get all questions by quiz id
//const url = `${REACT_APP_BASE_URL}/api/quizzes/:id/questions`
//quizId


