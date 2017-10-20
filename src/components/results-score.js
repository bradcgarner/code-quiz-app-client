import React from 'react';
import { connect } from 'react-redux';

export function ResultsScore(props) {

    return (
      <div>
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