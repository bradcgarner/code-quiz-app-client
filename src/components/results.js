import React from 'react';
import { connect } from 'react-redux';
import ResultsGraph from './results-graph';
import ResultsScore from './results-score';

export function Results(props) {
  console.log('Results', props.user);

  const gotoAnotherQuiz = () => {
    // === gotoDash(user) || gotoListOfQuizzes()
  } 
  const gotoAccuracy = () => {
    // === gotoDash(user) || gotoListOfQuizzes()
  } 

    return (
      <div>

        <h2 className="temp">7 Results</h2>

        <ResultsGraph score={'score'}/>
        <ResultsScore score={'score'}/>
        <button onClick={()=>gotoAccuracy()}>Check Accuracy</button>
        <button onClick={()=>gotoAnotherQuiz()}>Take Another Quiz</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Results);