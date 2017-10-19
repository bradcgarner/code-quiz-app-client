import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export function Question(props) {
  console.log('Question', props);      

  const handleSubmitButton = (choice) => {
    console.log('submitting choice',choice);
    props.dispatch(actionsUser.submitChoices(choice));
  }  // refer to actions/users.js for format of values

  const current = props.quiz.current;
  const question = props.quiz.questions[current];
  const inputType = question.inputType; 
  console.log('questions', props.quiz.questions);
  
  const options = question.answers.map((option,index)=>{
    console.log('1 Question', option);
    const name = inputType === 'radio' ? 'option' : `${option}${index}`;
    return (
      <div key={index}>
      <Field component="input" type={inputType} name={name} value={option.id}/>
      <label htmlFor={name}>{option.option}</label>
    </div>
    )
  });

  const handleGotoQuestionButton = index => {
    // get current # and go up or back 1
  }

  const prevQuestion = props.quiz.current > 0 ? 
    <button onClick={()=>handleGotoQuestionButton(-1)}>fwd</button> : '' ;

  const nextQuestion = props.quiz.questions.length > ( props.quiz.current + 1 ) ?
    <button onClick={()=>handleGotoQuestionButton(1)}>fwd</button> : '' ;

  return (
    <div>
      <h2 className="temp">6 Question</h2>
        <p>{question.question}</p>
        <form onSubmit={props.handleSubmit(choice =>
          handleSubmitButton(choice)
        )}>
          <ul>
            {options}
          </ul>
          <button type="submit">Submit</button>
        </form>

        {/*Footer - can arrows be inside form, or should "appear" inside form*/}
          
        {prevQuestion}
        {nextQuestion}

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