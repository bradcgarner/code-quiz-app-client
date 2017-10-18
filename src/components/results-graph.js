import React from 'react';
import { connect } from 'react-redux';

export function ResultsGraph(props) {
  let infoModal;
  console.log('ResultsGraph', props);
  if (props.user) {
      infoModal = <p className="temp">Results Test</p>;
  }
    return (
      <div>
        {infoModal}
        <p className="temp">7 ResultsGraph</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(ResultsGraph);