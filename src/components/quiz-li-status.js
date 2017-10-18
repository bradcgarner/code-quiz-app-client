import React from 'react';
import { connect } from 'react-redux';

export function QuizLiStatus(props) {
  console.log('QuizLiStatus',props);

  const total= props.total;
  const completed= props.completed;
  const correct= props.correct;

    return (
      <div>
        <h4 className="temp">Status</h4>
        <p>{total}/{completed}/{correct}</p>
      </div>
    );
}

export default connect()(QuizLiStatus);