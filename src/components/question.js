import React from 'react';
import { connect } from 'react-redux';

export function Question(props) {
  console.log('Question', props);      

  const current = props.quiz.current;
  const question = props.quiz.questions[current];
  const inputType = question.inputType; 
  console.log('questions', props.quiz.questions);
  
  const options = question.answers.map((option,index)=>{
    console.log('1 Question', option);
    const name = inputType === 'radio' ? 'option' : `${option}${index}`;
    return (
      <div>
      <input type={inputType} name={name} value={option.id}/>
      <label htmlFor={name}>{option.option}</label>
    </div>
    )
  });

  const submitChoices = (e) => {
    // if not last, gotoQuestion(1)
    // if last, gotoResults(quiz)
    // send choices to server/db<
    // if last, calculate score for entire quiz on server
  }; 

  const gotoQuestion =(index) => {
    // get current # and go up or back 1
  }

  const prevQuestion = props.quiz.current > 0 ? <button onClick={()=>gotoQuestion(-1)}>fwd</button> : '' ;  
  const nextQuestion = props.quiz.questions.length > ( props.quiz.current + 1 ) ? <button onClick={()=>gotoQuestion(1)}>fwd</button> : '' ;

  return (
    <div>
      <h2 className="temp">6 Question</h2>
        <p>{question.question}</p>
        <form>
          <ul>
            {options}
          </ul>
          <button type="submit" onSubmit={(e)=>{submitChoices(e)}}>Submit</button>
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

export default connect(mapStateToProps)(Question);