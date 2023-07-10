import React from "react";

const StartScreen = ({ numQuestions }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} question to test your React Mastery</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
};

export default StartScreen;