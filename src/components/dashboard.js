import React from 'react';
import { connect } from 'react-redux';
import Badges from './dashboard-badges';
import Recent  from './dashboard-recent';
import QuizLi from './quiz-li';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function Dashboard(props) {
  console.log('Dashboard',props.user);

  const handleQuizlistButton = () => {
    props.dispatch(actionsMode.gotoQuizlist());
  }
  const listHeader = props.user.quizzes ? 'My Quizzes' : '' ;
  const quizLi = props.user.quizzes.map((quiz, index)=>{
    return <QuizLi
      key={index} 
      id={quiz.id}
      name={quiz.name}
      total={quiz.total}
      completed={quiz.completed}
      correct={quiz.correct}
      category={quiz.category} 
      difficulty={quiz.difficulty}
    />
  })

    return (
      <div>
        <h2 className="temp">4 Dashboard</h2>
          <Badges />
          <Recent recent={props.user.recent}/>
          <h3>{listHeader}</h3>
          {quizLi}            
          <button onClick={()=>handleQuizlistButton()}>Add Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Dashboard);