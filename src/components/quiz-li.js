import React from 'react';
import { connect } from 'react-redux';
import QuizLiStatus from './quiz-li-status';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizLi(props) {
  
  const copyUserWithNewQuiz = (quiz) => {    
    const quizIsListed = props.user.quizzes.filter(exQuiz=>{
      return exQuiz.id === quiz.id;
    });
    if (quizIsListed.length >= 1) {
       return null;
    } else {
      const newQuizList = [...props.user.quizzes, quiz ];
      const userCopy = Object.assign({},props.user);
      userCopy.quizzes = newQuizList;
      return userCopy;
    }
  }

  const handleAddQuizButton = (quiz) => {
    const userCopy = copyUserWithNewQuiz(quiz);
    if ( userCopy ) {
      console.log('about to update user data', userCopy);
      console.log('props at handleAdQuizButton', props);
      props.dispatch(actionsUser.updateUserData(userCopy, props.user.authToken))      
    }
  }

  const handleTakeQuizButton = (quiz) => {
    if ( props.mode.view !== 'dashboard') {
      console.log('I AM NOT ON THE DASHBOARD');
      handleAddQuizButton(quiz)
    }
    console.log('JUST SELECTED QUIZ TO TAKE', quiz);    
    props.dispatch(actionsQuiz.takeQuiz(quiz))
    
    // starts @ 1st unanswered question
  }

  const id = props.li.id;
  const category= props.li.category || 'cat';
  const difficulty= props.li.difficulty || 'dif';
  const name= props.li.name || 'name';

  const theQuiz = <div className="quizLi">
    <div className="quizLiName">{name}</div>
    <div className="quizLiCategory">{category}</div>
    <div className="quizLiDifficulty">{difficulty}</div>
  </div>;

  const total= props.li.total;
  const completed= props.li.completed;
  const correct= props.li.correct;

  const statusBox = <QuizLiStatus
    id={id}
    total={total}
    completed={completed}
    correct={correct}
  />;

  const addButton = props.mode.view==='dashboard' ? '' :
  <i className="fa fa-list-ul smallIcon" aria-hidden="true"onClick={()=>handleAddQuizButton(props.li)}>
    <span className="faText">Add</span>
  </i>;
 
 const statusBoxOrAddButton = props.mode.view==='dashboard' ? statusBox : addButton ;

  const takeButton = <i className="fa fa-hand-o-right smallIcon" aria-hidden="true" onClick={()=>handleTakeQuizButton(props.li)}>
    <span className="faText">Go!</span>
  </i>;
  
  return (
      <li>{theQuiz}{statusBoxOrAddButton}{takeButton}</li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);