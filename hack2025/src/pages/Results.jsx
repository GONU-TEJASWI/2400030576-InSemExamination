import questions from "../data/questions";

export default function Results() {
  const results = JSON.parse(localStorage.getItem("results")) || {};

  const scoreSummary = {};
  questions.forEach((q) => {
    scoreSummary[q.trait] = (scoreSummary[q.trait] || 0) + (results[q.id] || 0);
  });

  const topTrait = Object.entries(scoreSummary).sort((a, b) => b[1] - a[1])[0];

  const recommendations = {
    Analytical: "Data Scientist, Engineer, Analyst",
    Social: "Psychologist, HR, Counselor",
    Creative: "Designer, Writer, UI/UX",
    Technical: "Software Developer, Mechanical Engineer",
    Management: "Business Manager, Operations Lead",
  };

  return (
    <div className="container">
      <h2 className="heading">Your Results</h2>
      <p>Your top skill area is: <strong>{topTrait[0]}</strong></p>
      <h3>Recommended Careers:</h3>
      <p>{recommendations[topTrait[0]]}</p>
    </div>
  );
}
