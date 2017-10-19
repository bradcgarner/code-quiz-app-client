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
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    console.log('formattedChoice', formattedChoices);
    const formattedChoiceObject = {
      userId: props.user.id, // user must be logged in
      questionId: props.quiz.questions[current].id,
      quizId: props.quiz.id,
      choices : formattedChoices
    };
    console.log('formattedChoiceObject', formattedChoiceObject);
    props.dispatch(actionsUser.submitChoices(formattedChoiceObject));
  }  // refer to actions/users.js for format of values

  console.log('props inside question.js', props);
  const current = props.quiz.current || 0;
  const currQuestion = props.quiz.questions[current];
  const inputType = currQuestion.inputType; 
  console.log('questions', props.quiz.questions);
  
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
  }

  const prevQuestionButton = props.quiz.current > 0 ? 
    <button onClick={()=>handleGotoQuestionButton(-1)}>back</button> : '' ;

  const nextQuestionButton = props.quiz.questions.length > ( props.quiz.current + 1 ) ?
    <button onClick={()=>handleGotoQuestionButton(1)}>fwd</button> : '' ;

  return (
    <div>
      <h2 className="temp">6 Question</h2>
        <p>{currQuestion.question}</p>
        <form onSubmit={props.handleSubmit(values =>
          handleSubmitButton(values)
        )}>
          <ul>
            {options}
          </ul>
          <button type="submit">Submit</button>
        </form>

        {/*Footer - can arrows be inside form, or should "appear" inside form*/}
          
        {prevQuestionButton}
        {nextQuestionButton}

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