import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

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