import { useState } from "react";
import questions from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const finish = () => {
    localStorage.setItem("results", JSON.stringify(answers));
    navigate("/results");
  };

  return (
    <div className="container">
      <h2 className="heading">Assessment</h2>
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} onSelect={handleSelect} />
      ))}
      <button onClick={finish} style={{ marginTop: "20px" }}>
        Submit
      </button>
    </div>
  );
}
