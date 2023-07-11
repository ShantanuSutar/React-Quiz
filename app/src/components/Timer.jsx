import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000); // 1000 milliseconds = 1 second means this function runs every second

    return () => clearInterval(id); // this function is run when the component unmounts i.e. when the user finishes the quiz
  }, [dispatch]); // only run this effect when the dispatch function changes
  return <div className="timer">{secondsRemaining}</div>;
};

export default Timer;
