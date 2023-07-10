import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading", //  loading | error | ready | active | finished
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState); // useReducer is a hook that allows us to manage state with a reducer function

  const numQuestions = questions.length; // the number of questions is the length of the questions array

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
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
        {/* if the status is ready, we show the start screen */}
      </Main>
    </div>
  );
}

export default App;
