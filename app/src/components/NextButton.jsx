import React from "react";

const NextButton = ({ index, dispatch, answer, numQuestions }) => {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </div>
    ); // show the next button if the index is less than the number of questions - 1

  if (index === numQuestions - 1)
    return (
      <div className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </div>
    ); // show the finish button if the index is equal to the number of questions - 1
};

export default NextButton;
