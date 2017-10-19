import React from 'react';
import { connect } from 'react-redux';
import QuizLiStatus from './quiz-li-status';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizLi(props) {
  console.log('QuizLi!!!!',props);

  const handleTakeQuizButton = (id) => {
    // starts @ 1st unanswered question
  }

  const addQuizToList = (id) => {
    // add to list
  }

  const id = 'props.quiz.id';
  const category= props.quiz.category || 'cat';
  const difficulty= props.quiz.difficulty || 'dif';
  const name= props.quiz.name || 'name';
  const theQuiz = <span>{name}/{category}/{difficulty}</span>;

  const total= props.quiz.total;
  const completed= props.quiz.completed;
  const correct= props.quiz.correct;

  const statusBox = <QuizLiStatus
    id={id}
    total={total}
    completed={completed}
    correct={correct}
  />;

  const addButton = <button onClick={()=>addQuizToList(id)}>+</button> ;

  const status = props.status ? statusBox : addButton ;
  const categ = props.categ ; // make these graphic
  const diff = props.diff; // make these graphic
  
  return (
      <li onClick={()=>handleTakeQuizButton(id)}>
        {theQuiz}{status}{categ}{diff}{'>'}
      </li>
  );
}

export default connect()(QuizLi);