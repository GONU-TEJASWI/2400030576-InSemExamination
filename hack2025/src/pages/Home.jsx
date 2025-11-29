export default function Home() {
  return (
    <div className="container">
      <h1 className="heading">Career Assessment Tool</h1>
      <p className="subtext">Discover your strengths. Explore your future.</p>

      <div className="card" style={{ marginTop: "50px" }}>
        <h3>🚀 Start Your Journey</h3>
        <ul>
          <li>📌 Discover Your Strengths</li>
          <li>🎯 Explore Suitable Career Paths</li>
          <li>📚 Take Assessments and View Results</li>
        </ul>

        <button style={{ marginTop: "15px" }} onClick={() => (window.location.href = "/assessment")}>
          Start Assessment
        </button>
      </div>
    </div>
  );
}
