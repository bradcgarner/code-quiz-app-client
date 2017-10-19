import React from 'react';
import { connect } from 'react-redux';
import QuizLiStatus from './quiz-li-status';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizLi(props) {
  console.log('QuizLi!!!!',props); // where is _id coming from???
  
  const copyUserWithNewQuiz = (quiz) => {    
    console.log(' add quiz ', quiz); // fine
    console.log('inside handle add quiz ', props); // fine
    const quizIsListed = props.user.quizzes.filter(exQuiz=>{
      console.log('quiz is listed: compare ex', exQuiz, 'against new', quiz);  // 
      return exQuiz.id === quiz.id;
    });
    console.log('quizIsListed (empty if not listed)', quizIsListed);
    if (quizIsListed.length >= 1) {
       return null;
    } else {
      console.log('add quiz', quiz);
      const newQuizList = [...props.user.quizzes, quiz ];
      console.log('newQuizList', newQuizList)
      const userCopy = Object.assign({},props.user);
      console.log('userCopy', userCopy)
      userCopy.quizzes = newQuizList;
      console.log(userCopy);
      return userCopy;
    }
  }

  const handleAddQuizButton = (quiz) => {
    const userCopy = copyUserWithNewQuiz(quiz);
    if ( userCopy ) {
      console.log('about to update user data', userCopy);
      props.dispatch(actionsUser.updateUserData(userCopy))      
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
  const theQuiz = <span>{name}/{category}/{difficulty}</span>;

  const total= props.li.total;
  const completed= props.li.completed;
  const correct= props.li.correct;

  const statusBox = <QuizLiStatus
    id={id}
    total={total}
    completed={completed}
    correct={correct}
  />;

  const addButton = <button onClick={()=>handleAddQuizButton(props.li)}>Add</button> ;
  const takeButton = <button onClick={()=>handleTakeQuizButton(props.li)}>Go!</button> ;

  const status = props.li.status ? statusBox : addButton ;
  
  return (
      <li>{theQuiz}{status}{takeButton}</li>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);