import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

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
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer is a hook that allows us to manage state with a reducer function

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
