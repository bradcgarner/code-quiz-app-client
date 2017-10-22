import React from 'react';
import { connect } from 'react-redux';
import QuizLiStatus from './quiz-li-status';
import * as actionsUser from '../actions/users';
import * as actionsQuiz from '../actions/quiz';

export function QuizLi(props) {
  
  const copyUserWithNewQuiz = (newQuiz) => {  
    const quizIsListed = props.user.quizzes.filter(exQuiz=>{
      return exQuiz.id === newQuiz.id;
    });
    if (quizIsListed.length > 0) {
       return null;
    } else {
      newQuiz.attempt = 0;
      const newQuizList = [...props.user.quizzes, newQuiz ];
      const userCopy = Object.assign({},props.user);
      userCopy.quizzes = newQuizList;
      return userCopy;
    }
  }

  const handleAddQuizButton = (quiz) => { 
    console.log('quiz at add quiz button', quiz);
    const userCopy = copyUserWithNewQuiz(quiz); // copy user; add to quizzes; attempt is alway 0 when adding
    if ( userCopy ) {
      console.log('about to update user data', userCopy);
      console.log('props at handleAdQuizButton', props);
      props.dispatch(actionsUser.updateUserData(userCopy, props.user.authToken)) // update db, then store, archived quizzes filtered out by server before responding   
    }
  }

  const handleTakeQuizButton = (quiz) => {
    let attempt = 0;
    if ( props.mode.view !== 'dashboard') {
      console.log('NOT ON DASHBOARD, adding quiz', quiz, attempt);
      handleAddQuizButton(quiz)
    }
    console.log('JUST SELECTED QUIZ TO TAKE', quiz);  
    // calculate attempt
    const quizId = quiz.id;
    const priorQuizAttempt = props.user.quizzes.filter(quiz=>quiz.id === quizId);
    console.log('priorQuizAttempt', priorQuizAttempt)
    const howMany = priorQuizAttempt.length;
    console.log('howmany', howMany)    
    attempt = howMany === 0 ? 0 : priorQuizAttempt[howMany-1].attempt + 1; 
    console.log('attempt', attempt)  
    props.dispatch(actionsQuiz.takeQuiz(quiz, attempt, props.user))
    // probably pass below as argument to above
    // if quiz.completed > 0
       // const increment = quiz.attempt + 1
       // props.dispatch(actionsUser.incrementAttempt(quiz));
       // new choices will receive the attempt #
       // find user in db
       // mark quiz.archive as true in db
       // when we update the user, we'll filter out archived quizzes
       // props.dispatch(actionsUser.updateUserData(userCopy, props.user.authToken))      

  }

  const id = props.li.id;
  const attempt = props.li.attempt;
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
 
 // condition below needs to change to ===='dashboard' || the quiz is included in props.user.quizzes...
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