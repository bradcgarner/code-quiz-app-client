import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsUser from './users';
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
  currentIndex: 0,
});

// update current quiz with score for 1 question
export const SCORE_CHOICE = 'SCORE_CHOICE';
export const scoreChoice = correct => ({
  type: SCORE_CHOICE,
  questionId: correct.questionId,
  correct: correct.correct,
  choices: correct.choices
});

// this is the single current quiz
export const UPDATE_QUIZ_STORE_QUESTIONS = 'UPDATE_QUIZ_STORE_QUESTIONS';
export const updateQuizStoreQuestions = (questions) => ({
  type: UPDATE_QUIZ_STORE_QUESTIONS,
  currentIndex: 0,
  questions: questions,
});

export const UPDATE_QUIZ_MENU = 'UPDATE_QUIZ_MENU';
export const updateQuizMenu = (menu) => ({
  type: UPDATE_QUIZ_MENU,
  menuOfAllQuizzes: menu
});
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const updateCurrentQuestion = (nextIndex) => ({
  type: UPDATE_CURRENT_QUESTION,
  currentIndex: nextIndex
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


  export const  scoreQuiz = (quizId, userId) => dispatch => {
    console.log("score quiz");
    return fetch(`${REACT_APP_BASE_URL}/api/choices/quizzes/${quizId}/users/${userId}`)
       .then(res => {
          console.log('choices fetched to score',res);
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(choices => {
          console.log('choices fetched to score',choices);
          const choicesCorrect = choices.filter(choice => choice.correct === true );
          const totalCorrect = choicesCorrect.length;
          const totalCompleted = choices.length;
          dispatch(actionsUser.displayQuizScore(quizId, totalCorrect, totalCompleted));
        })
        .catch(error => {
         // dispatch(fetchError(error));
          console.log(error);
        });
  };

