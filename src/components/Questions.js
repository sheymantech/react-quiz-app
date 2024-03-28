import { useQuiz, QuizProvider } from "../context/QuizContext";
import Options from "./Options";

function Questions() {
  const { index, dispatch, answer, questions } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
