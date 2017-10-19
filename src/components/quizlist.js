import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizList(props) {
  console.log('QuizList',props.user);

  const handleTakeQuizButton = (id) => {
    props.dispatch(actionsQuiz.takeQuiz(id));
  }
  const handleAddQuizButton = (quiz) => {
    console.log('quiz is object with props read from DOM');
    let userData;
    console.log('add to user data from store');
    props.dispatch(actionsUser.updateUserData(userData));
  }

  // do for each quiz in the array
  let quizId = '999';
  let categ;
  let diff;
  const quizLi = <QuizLi status={true} id={quizId} categ={categ} diff={diff}/>
  
    return (
      <div>
        <h2 className="temp">5 List of All Quizzes</h2>
        {quizLi}
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizList);