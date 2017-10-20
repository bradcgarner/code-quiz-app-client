import React from 'react';
import { connect } from 'react-redux';
import ResultsGraph from './results-graph';
import ResultsScore from './results-score';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function Results(props) {

  const handleGotoAnotherQuizButton = () => {
    if ( props.user.id ) {
      console.log('also check to make sure user has un-taken quizzes on the list') 
      props.dispatch(actionsMode.gotoDashboard() )
    } else {
      props.dispatch(actionsMode.gotoQuizlist() )
    }
  } 

  const handleGotoAccuracyButton = () => {
    props.dispatch(actionsMode.gotoResult() )
  } 

    return (
      <div>
        <h2 className="temp">7 Results</h2>
        <ResultsGraph score={'score'}/>
        <ResultsScore score={'score'}/>
        <button onClick={()=>handleGotoAccuracyButton()}>Check Accuracy</button>
        <button onClick={()=>handleGotoAnotherQuizButton()}>Take Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Results);