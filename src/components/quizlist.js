import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';

export function QuizList(props) {
  let infoModal;
  console.log('QuizList',props.user);
  if (props.user) {
      infoModal = <p className="temp">ListOfAllQuestions Test</p>;
      
  }
  // do for each quiz in the array
  let quizId = '999';
  let categ;
  let diff;
  const quizLi = <QuizLi id={quizId} categ={categ} diff={diff}/>
  
    return (
      <div>
        {infoModal}
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