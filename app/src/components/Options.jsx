import React from "react";

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null; // if the answer is not null, it means the user has answered the question
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`} // if the answer is correct, we add the correct class, if the answer is wrong, we add the wrong class and if the answer is null, we add the answer class
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })} // when the user clicks on an option, we dispatch the newAnswer action with the index of the option as payload
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
