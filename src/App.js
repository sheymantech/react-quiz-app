import Header from "./Header";
import Main from "./MainBody";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, statue: "error" };

    default:
      throw new Error("Action unknow");
  }
}
export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
