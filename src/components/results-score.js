import React from 'react';
import { connect } from 'react-redux';

export function ResultsScore(props) {
  let infoModal;
  console.log('ResultsScore', props);
  if (props.user) {
      infoModal = <p className="temp">ResultsScore Test</p>;
  }
    return (
      <div>
        {infoModal}
          <p>Score with numbers</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(ResultsScore);