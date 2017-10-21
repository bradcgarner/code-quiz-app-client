import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function QuizLiStatus(props) {

  const total= props.total || 0;
  const completed= props.completed || 0;
  const correct= props.correct || 0;

    return (
      <div className="statusBox">
        <span>{total}|{completed}|{correct}</span>
      </div>
    );
}

export default connect()(QuizLiStatus);