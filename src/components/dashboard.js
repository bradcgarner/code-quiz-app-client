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

  const handleQuizlistButton = () => {
    if ( props.quiz.menuOfAllQuizzes.length > 1) {
      props.dispatch(actionsMode.gotoQuizlist());
    } else {
      props.dispatch(actionsQuiz.fetchQuizzes());      
    }
  }
  console.log('props on dashboard',props);
  const listHeader = props.user.quizzes ? 'My Quizzes' : '' ;
  const quizLi = props.user.quizzes.map((quiz, index)=>{
    return <QuizLi key={index} status={true} li={quiz} />
  })

    return (
      <div className="dashboard">
        <Badges />
        <Recent recent={props.user.recent}/>
        <h3 className="dashboardQuizListHeader">{listHeader}</h3>
        {quizLi}            
        <button className="gotoQuizListButton"onClick={()=>handleQuizlistButton()}>Add Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Dashboard);