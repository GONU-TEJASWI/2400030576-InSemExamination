import { useState } from "react";

export default function Admin({ navigate }) {
  const storedQ = JSON.parse(localStorage.getItem("questions")) || [];
  const [questions, setQuestions] = useState(storedQ);
  const [newQ, setNewQ] = useState("");

  const addQuestion = () => {
    if (!newQ) return;
    const updated = [...questions, newQ];
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
    setNewQ("");
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <input
        placeholder="Enter new assessment question"
        value={newQ}
        onChange={(e) => setNewQ(e.target.value)}
      />
      <button onClick={addQuestion}>Add Question</button>

      <h3>Stored Questions</h3>
      <ul>
        {questions.map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ul>

      <button onClick={() => navigate("home")} className="secondary-btn">
        Back
      </button>
    </div>
  );
}
