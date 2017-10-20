import React from 'react';
import { connect } from 'react-redux';
import QuizLi from './quiz-li';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizList(props) {

  const handleTakeQuizButton = (id) => {
    props.dispatch(actionsQuiz.takeQuiz(id));
  }
 
  const handleAddQuizButton = (quiz) => {
    let userData;
    props.dispatch(actionsUser.updateUserData(userData));
  }

  const quizLi = props.quiz.menuOfAllQuizzes.map((quiz, index)=>{
    return <QuizLi key={index} status={true} testing={true} li={quiz} />
  })
  
    return (
      <div className="quizlist">
        <ul>
          {quizLi}
        </ul>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizList);