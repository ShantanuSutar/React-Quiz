import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading", //  loading | error | ready | active | finished
  index: 0, // index of the current question
  answer: null, // the answer to the current question
  points: 0, // the number of points the user has
  highscore: 0, // the highscore of the user
}; // initial state of the app is an empty array of questions and a status of loading

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }; // when the data is received, the status is ready and the questions are populated
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }; // if the data fails to load, the status is error
    case "start":
      return { ...state, status: "active" }; // when the game starts, the status is active
    case "newAnswer":
      const question = state.questions.at(state.index); // the current question is the question at the current index
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }; // when a new answer is submitted, the answer is set to the payload and the points are updated
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }; // when the next question is clicked, the index is incremented and the answer is set to null

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }; // when the finish button is clicked, the status is set to finished

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      }; // when the restart button is clicked, the status is set to ready and the index, answer and points are reset

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState); // useReducer is a hook that allows us to manage state with a reducer function

  const numQuestions = questions.length; // the number of questions is the length of the questions array

  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  ); // the max possible points is the sum of all the points of all the questions

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); // here we fetch the data from the server and dispatch the dataReceived action with the data as payload
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {/* if the status is loading, we show the loader */}
        {status === "error" && <Error />}
        {/* if the status is error, we show the error */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {/* if the status is ready, we show the start screen */}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {/* if the status is active, we show the question */}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {/* if the status is finished, we show the finish screen  */}
      </Main>
    </div>
  );
}

export default App;
