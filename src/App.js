import React, { Component } from 'react';
import Landing from './components/landing';
import Login from './components/login';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import ListOfAllQuizzes from './components/listofallquizzes';
import Question from  './components/question';
import Results from  './components/results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing user={'manual'}/>
        <Login />
        <Profile />
        <Dashboard />
        <ListOfAllQuizzes />
        <Question />
        <Results />
        <hr /><h2>1 Landing</h2>
        <ul>
          <li>Header: none</li>
          <li>Logo image</li>
          <li>Login button - gotoLogin()</li>
          <li>About button - gotoAbout()</li>
        </ul>
        <hr /><h2>2 Login</h2>
        <ul>
          <li>Header</li>
          <ul>
            <li>Login</li>
          </ul>
          <li>Form</li>
            <ul>
            <li>Username</li>
            <li>Password</li>
            <li>Login submit button - userLogin()</li>
            </ul>
          <li>End Form</li>
          <li>Create Account button - gotoProfile()</li>
        </ul>



        <hr /><h2>3 Profile</h2>
        <ul>
        <li>Header</li>
          <ul>
            <li>Home - gotoHome()</li>
            <li>Username's Profile || Create Profile</li>
            <li>Settings???? - gotoUserSettings() ??</li>
          </ul>
          <li>Form</li>
          <ul>
            <li>Username - text</li>
            <li>First Name - text</li>
            <li>Last Name - text</li>
            <li>Password - text pw characters</li>
            <li>Password2 - text pw characters</li>
            <li>Submit || Save Changes - button saveProfile(userId)</li>
          </ul>
          <li>End Form</li>
        </ul>
        <hr /><h2>4 Dashboard</h2>
        <ul>
        <li>Header</li>
          <ul>
            <li>Profile - gotoProfile(user)</li>
            <li>Username's Dashboard</li>
            <li>Settings???? - gotoUserSettings(user) ??</li>
          </ul>
          <li>Badges - React Component || Image</li>
          <li>RecentActivity - React Component(user)</li>
          <ul>
            <li>RecentActivity includes unfinished quizzes</li>
          </ul>
          <li>List of Quizzes (this user)</li>
          <ul>
            <li>QuizLi React Component for Each Quiz (quizId, categ, diff, status[total, answered, correct]</li>
            <li>Add Another Quiz - button gotoListOfQuizzes()</li>
          </ul>
        </ul>
        <hr /><h2>5 List of All Quizzes</h2>
        <ul>
          <li>Header</li>
        <ul>
          <li>Profile - gotoProfile(user)</li>
          <li>Menu of Quizzes</li>
          <li>Settings???? - gotoUserSettings(user) ??</li>
        </ul>
        <li>List of All Quizzes</li>
        <li>QuizLi React Component for Each Quiz (quizId, categ, diff)</li>
        </ul>
        <hr /><h2>4-5 subComponent - QuizLi</h2>
        <ul>
          <li>Quiz Name</li>
          <li>props.status => Status React Component w/ score</li>
          <li>props.categ</li>
          <li>props.diff</li>
          <li>props.add (allow to add to list, reads from props.status)</li>
          <li>Take quiz arrow - button takeQuiz(quiz)</li>
          <ul>
            <li>takeQuiz() starts @ 1st unanswered question</li>
          </ul>
        </ul>
        <hr /><h2>6 Question</h2>
        <ul>
        <li>Header</li>
          <ul>
          <li>Dashboard - gotoDash(user)</li>
          <li>Quiz Name</li>
          <li>StatusBar React Component</li>
          <li>Settings???? - gotoQuizSettings() ??</li>
          </ul>
          <li>Question</li>
          <ul>
            <li>Form</li>
            <li>Options</li>
            <li>Submit - button, submit submitChoices(choices)</li>
            <ul>
              <li>submitChoices() will:</li>
              <li>if not last, gotoQuestion(1)</li>
              <li>if last, gotoResults(quiz)</li>
              <li>send choices to server/db</li>
              <li>if last, calculate score for entire quiz on server</li>
            </ul>
            <li>End Form</li>
          </ul>
          <li>Footer - can arrows be inside form, or should "appear" inside form</li>
          <ul>
            <li>Back - button, gotoQuestion(-1)</li>
            <li>Forward - button, gotoQuestion(1)</li>
          </ul>
        </ul>
        <hr /><h2>6b?? Answers??</h2>
        <ul>
        <li>Skip for now, same as questions, but add in:</li>
          <li>User's choice</li>
          <li>Correct answer (optional)</li>
          <li>Links to resources</li>
          <li>Commenting</li>
          <li>No submit button</li>
          <li>If viewing answers, record that so user cannot re-take for credit</li>
        </ul>
        <hr /><h2>7 Results</h2>
        <ul>
        <li>Header</li>
          <ul>
          <li>Dashboard - gotoDash(user)</li>
          <li>Quiz Name</li>
          <li>Results</li>
          </ul>
          <li>ResultsGraph React Component</li>
          <li>Score React Component with numbers</li>
          <li>See Accuracy button gotoAccuracy(quiz)</li>
          <li>Take Another Quiz gotoAnotherQuiz(user)</li>
          <ul>
            <li>gotoAnotherQuiz() === gotoDash(user) || gotoListOfQuizzes()</li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default App;
