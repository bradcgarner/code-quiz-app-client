import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
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
    const next = props.quiz.current === (props.quiz.questions.length - 1) ? 'score' : 'next' ;
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

  const prevQuestionButton = props.quiz.current > 0 ?  'normal'  : 'grey' ;

  const nextQuestionButton = props.quiz.questions.length > ( props.quiz.current + 1 ) ?  'normal'  : 'grey' ;

  return (
    <div>
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
          
        <button className={prevQuestionButton} onClick={()=>handleGotoQuestionButton(-1)}>back</button>
        <button className={nextQuestionButton} onClick={()=>handleGotoQuestionButton(1)}>fwd</button>

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