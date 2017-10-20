import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import StatusBar from './question-statusbar';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function Question(props) {

  const handleSubmitButton = (choice) => {
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    const formattedChoiceObject = {
      userId: props.user.id, // user must be logged in
      questionId: props.quiz.questions[current].id,
      quizId: props.quiz.id,
      choices : formattedChoices
    };
    const next = props.quiz.current === (props.quiz.questions.length - 1) ? 'score' : props.quiz.current + 1 ;
    props.dispatch(actionsUser.submitChoices(formattedChoiceObject, props.user.authToken, next));
  }  // refer to actions/users.js for format of values

  const current = props.quiz.current || 0;
  const currQuestion = props.quiz.questions[current];
  const inputType = currQuestion.inputType; 
  
  const options = currQuestion.answers.map((answer,index)=>{
    const optionName = inputType === 'radio' ? 'option' : `${answer.id}`;
    return (
      <div key={index}>
        <Field 
          name={optionName} 
          id={answer.id}
          component='input'
          type={inputType}
          value={answer.id}
        />
        <label htmlFor={answer.id}>{answer.option}</label>
      </div>
    )
  });

  const handleGotoQuestionButton = index => {
    // get current # and go up or back 1
    props.dispatch(actionsQuiz.updateCurrentQuestion(props.quiz.current + index))
  }
  
  const prevQuestionClass = props.quiz.current > 0 ?  'fa fa-hand-o-left smallIcon'  : 'fa fa-hand-o-left smallIcon inactive' ;
  const nextQuestionClass = props.quiz.questions.length > ( props.quiz.current + 1 ) ?  'fa fa-hand-o-right smallIcon'  : 'fa fa-hand-o-right smallIcon inactive' ;
  const submitButtonClass = 'formisEmpty'==='empty' ?  'submitButton'  : 'submitButton inactive' ;
  

  return (
    <div className="question">
      <StatusBar 
      total={props.quiz.questions.length}
      current={props.quiz.current}
      />

      <p className="questionAsked">{currQuestion.question}</p>
      <form className="questionForm" onSubmit={props.handleSubmit(values =>
        handleSubmitButton(values)
      )}>
        <ul className="questionOptions">
          {options}
        </ul>

        <i className={prevQuestionClass} 
          onClick={()=>handleGotoQuestionButton(-1)}
          aria-hidden="true">
          <span className="faText">Previous</span>
        </i>
      
        <button className={submitButtonClass} type="submit">Submit</button>

        <i className={nextQuestionClass} 
          onClick={()=>handleGotoQuestionButton(1)}
          aria-hidden="true">
          <span className="faText">Skip</span>
        </i>

      </form>

      <p>Answers: Skip for now, same as questions, but add in: 
          User's choice, 
          Correct answer (optional), 
          Links to resources, 
          Commenting, 
          No submit button, 
          If viewing answers, record that so user cannot re-take for credit</p>
    
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'question'}) // in the state we'll have state.form.login
)(Question);