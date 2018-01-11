import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Landing(props) {

  const handleLoginButton = () => {
    props.dispatch(actionsMode.gotoLogin());
  }

  const handleAboutButton = () => {
    props.dispatch(actionsMode.gotoAbout());
  }  
  
    return (
      <div className="landing">
        <div className="landingCover">
          <p className="landingLogo landingLogoTop">{`{()=>{}}`}</p>
          <p className="landingLogo landingLogoMid">{`~~:~~`}</p>
          <p className="landingLogo landingLogoBot">{`==`}</p>
          <h1 className="landingTitle">Code Quiz</h1>
        </div>
        <div class="landingDescription">
          <p>The Code Quiz app helps you test your knowledge of software
             programming using a quiz based format. Login the page and you can start your quiz by selecting 
             different quiz groups.</p>
             
        </div>
        <div>
        <h3>Demo Login:</h3>
             <p>userName: guest</p>
             <p>password: mypassword</p>
        </div>
        <button className="loginButton clearfix" onClick={()=>handleLoginButton()}>Enter</button>
        <br />
        <button className="aboutButton clearfix"onClick={()=>handleAboutButton()}>About</button>
      </div>

    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Landing);