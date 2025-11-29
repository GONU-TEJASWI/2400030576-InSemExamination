import React from "react";

/*
 Props:
  - question: { id, text, trait }
  - onSelect(qid, value)
*/
export default function QuestionCard({ question, onSelect }) {
  return (
    <div className="question-row" style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 6 }}>
        <strong>{question.text}</strong>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((val) => (
          <label key={val} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="radio"
              name={`q-${question.id}`}
              value={val}
              onChange={() => onSelect(question.id, val)}
            />
            <span style={{ fontSize: 14 }}>{val}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
