import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60); // get the minutes by dividing the seconds by 60 and rounding down
  const seconds = secondsRemaining % 60; // get the seconds by getting the remainder of the seconds divided by 60
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000); // 1000 milliseconds = 1 second means this function runs every second

    return () => clearInterval(id); // this function is run when the component unmounts i.e. when the user finishes the quiz
  }, [dispatch]); // only run this effect when the dispatch function changes
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
