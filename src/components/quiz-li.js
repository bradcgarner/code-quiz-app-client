import React from 'react';
import { connect } from 'react-redux';
import QuizLiStatus from './quiz-li-status';

export function QuizLi(props) {
  console.log('QuizLi',props);

  const takeQuiz = (id) => {
    // starts @ 1st unanswered question
  }

  const addQuizToList = (id) => {
    // add to list
  }

  const id = props.id;
  const category= props.category;
  const difficulty= props.difficulty;
  const name= props.name;
  const theQuiz = <span onClick={()=>takeQuiz(id)}>{name}/{category}/{difficulty}</span>;

  const total= props.total;
  const completed= props.completed;
  const correct= props.correct;

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
    <div>
      <ul>
        {theQuiz}
        {status}
        {categ}
        {diff}
        <button onClick={()=>takeQuiz()}>></button>
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(QuizLi);