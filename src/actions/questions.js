import { REACT_APP_BASE_URL } from '../config';

export const QUESTIONS = 'QUESTIONS';
export const questions = (questions) => ({
  type: QUESTIONS,
  questions
});

export const  fetchQuestions = () => dispatch => {
  console.log("fetches questions async action");
  fetch(`${API_BASE_URL}/api/quizzes/questions`)
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
//const url = `${API_BASE_URL}/api/quizzes/:id`
// name:req.body.name,
{/*description: req.body.description,
category: req.body.category,
difficulty: req.body.difficulty,
questions: req.body.questions*/}


//gotoListOfQuizzes
//show all gotoListOfQuizzes  GET
//const url = `${API_BASE_URL}/api/quizzes`
//
// takeQuiz
//get  takeQuiz by id 
//const url = `${API_BASE_URL}/api/quizzes/:id`
//quizId

// get all questions by quiz id
//const url = `${API_BASE_URL}/api/quizzes/:id/questions`
//quizId


