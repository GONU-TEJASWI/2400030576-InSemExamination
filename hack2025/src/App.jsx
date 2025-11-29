import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import questionBank from "./data/questions";

/*
 App flow (single page):
 1. initial role selection (student/admin)
 2. login (username/password vertical stack)
 3. interest selection (Coding / Hardware / Technical / Management / Creative)
 4. tailored assessment
 5. results with specific career recommendations
*/

export default function App() {
  const [stage, setStage] = useState("chooseRole"); // chooseRole, login, interest, assessment, results, home
  const [role, setRole] = useState("student");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [interest, setInterest] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // login handler: admin has fixed creds admin/admin; student any non-empty username
  function handleLogin(e) {
    e.preventDefault();
    const { username, password } = credentials;
    if (role === "admin") {
      if (username === "admin" && password === "admin") {
        setUser({ username, role });
        setStage("home");
      } else {
        alert("Invalid admin credentials. Try admin / admin");
      }
    } else {
      // student
      if (!username || !password) {
        alert("Enter username and password (student)");
        return;
      }
      setUser({ username, role });
      setStage("interest");
    }
  }

  function startAssessment() {
    if (!interest) {
      alert("Please choose an interest area to continue.");
      return;
    }
    setAnswers({});
    setStage("assessment");
  }

  function handleAnswer(qid, val) {
    setAnswers((s) => ({ ...s, [qid]: Number(val) }));
  }

  function computeResults() {
    // simple scoring: sum answers (1..5)
    // build trait totals, then map to specific career suggestions by interest
    const qs = questionBank[interest] || [];
    const totals = {};
    qs.forEach((q) => {
      totals[q.trait] = (totals[q.trait] || 0) + (answers[q.id] || 0);
    });
    // find top trait
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const top = sorted[0] || ["General", 0];
    const topTrait = top[0];

    // career mapping per interest + trait (distinct)
    const careerMap = {
      Coding: {
        Algorithms: ["Software Engineer", "Algorithm Engineer", "Competitive Programmer"],
        Fullstack: ["Full-Stack Developer", "Frontend Engineer", "Backend Engineer"],
        Data: ["Data Engineer", "Machine Learning Engineer"],
        System: ["Platform Engineer", "DevOps Engineer"],
      },
      Hardware: {
        Embedded: ["Embedded Systems Engineer", "Firmware Developer"],
        PCB: ["PCB Designer", "Hardware Design Engineer"],
        Test: ["Hardware Test Engineer", "Field Service Engineer"],
      },
      Technical: {
        Networking: ["Network Engineer", "Systems Administrator"],
        Mechanical: ["Mechanical Technician", "Maintenance Engineer"],
        Electrical: ["Electrical Engineer", "Power Systems Engineer"],
      },
      Management: {
        Product: ["Product Manager", "Business Analyst"],
        Ops: ["Operations Manager", "Project Coordinator"],
        HR: ["HR Executive", "Recruitment Specialist"],
      },
      Creative: {
        Design: ["UI/UX Designer", "Graphic Designer"],
        Content: ["Content Writer", "Creative Strategist"],
        Media: ["Animator", "Video Editor"],
      },
    };

    // pick recommendations: look up by interest and trait; fallback to reasonable defaults
    const recs =
      (careerMap[interest] && careerMap[interest][topTrait]) ||
      (careerMap[interest] && Object.values(careerMap[interest]).flat().slice(0, 3)) ||
      ["Consultant", "Freelancer", "Further Study"];

    const summary = {
      interest,
      topTrait,
      totals,
      recommendations: recs,
    };

    setResult(summary);
    setStage("results");
  }

  function logout() {
    setUser(null);
    setStage("chooseRole");
    setRole("student");
    setCredentials({ username: "", password: "" });
    setInterest("");
    setAnswers({});
    setResult(null);
  }

  // UI: white background, black text (index.css will set)
  return (
    <div className="app-root" style={{ minHeight: "100vh" }}>
      <div className="container">
        <header className="header">
          <h1 className="title">Career Assessment Tool</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {user ? <div style={{ fontSize: 14 }}>Signed in as: <strong>{user.username}</strong></div> : null}
            {user ? <button className="btn small" onClick={logout}>Logout</button> : null}
          </div>
        </header>

        {/* choose role */}
        {stage === "chooseRole" && (
          <section className="card">
            <h2>Who are you?</h2>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <label style={{ flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />{" "}
                Student
              </label>
              <label style={{ flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />{" "}
                Admin
              </label>
            </div>

            <div style={{ marginTop: 18 }}>
              <button className="btn" onClick={() => setStage("login")}>Proceed to Login</button>
            </div>

            <p className="muted" style={{ marginTop: 12 }}>
              Admin quick test credentials: <strong>admin / admin</strong>
            </p>
          </section>
        )}

        {/* login */}
        {stage === "login" && (
          <section className="card">
            <h2>Login ({role === "admin" ? "Admin" : "Student"})</h2>
            <form onSubmit={handleLogin} style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <label style={{ fontSize: 14 }}>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials((s) => ({ ...s, username: e.target.value }))}
                placeholder="Enter username"
              />
              <label style={{ fontSize: 14 }}>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((s) => ({ ...s, password: e.target.value }))}
                placeholder="Enter password"
              />

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" type="submit">Login</button>
                <button
                  type="button"
                  className="btn outline"
                  onClick={() => {
                    setStage("chooseRole");
                    setCredentials({ username: "", password: "" });
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </section>
        )}

        {/* home after login */}
        {stage === "home" && user && (
          <section className="card">
            <h2>Welcome, {user.username}</h2>
            <p style={{ marginTop: 8 }}>
              Use the assessment to discover career paths. Choose "Explore Careers" to learn more about roles.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn" onClick={() => setStage("interest")}>Take a Career Assessment</button>
              <button className="btn outline" onClick={() => setStage("interest")}>Explore Careers</button>
              <button className="btn outline" onClick={logout}>Sign out</button>
            </div>
          </section>
        )}

        {/* interest selection */}
        {stage === "interest" && (
          <section className="card">
            <h2>Select Primary Interest Area</h2>
            <p style={{ marginTop: 6 }}>Pick the area you are most curious about — we'll tailor questions to this.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 10, marginTop: 12 }}>
              {Object.keys(questionBank).map((k) => (
                <button
                  key={k}
                  className={interest === k ? "btn selected" : "btn outline"}
                  onClick={() => setInterest(k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={startAssessment}>Start Assessment</button>
              <button className="btn outline" onClick={() => setStage("home")} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </section>
        )}

        {/* assessment */}
        {stage === "assessment" && (
          <section>
            <h2 style={{ marginTop: 8 }}>{interest} Assessment</h2>
            <p className="muted">Answer honestly. Scale: 1 (Strongly disagree) — 5 (Strongly agree)</p>

            <div style={{ marginTop: 12 }}>
              {(questionBank[interest] || []).map((q) => (
                <QuestionCard key={q.id} question={q} onSelect={handleAnswer} />
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={computeResults}>Submit & See Results</button>
              <button className="btn outline" onClick={() => setStage("interest")} style={{ marginLeft: 8 }}>Back</button>
            </div>
          </section>
        )}

        {/* results */}
        {stage === "results" && result && (
          <section className="card">
            <h2>Assessment Results</h2>
            <p style={{ marginTop: 8 }}>
              <strong>Interest area:</strong> {result.interest}
            </p>
            <p>
              <strong>Top trait:</strong> {result.topTrait}
            </p>

            <h3 style={{ marginTop: 12 }}>Recommended career options</h3>
            <ul>
              {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => setStage("home")}>Back to Home</button>
              <button
                className="btn outline"
                onClick={() => {
                  setInterest("");
                  setAnswers({});
                  setResult(null);
                  setStage("interest");
                }}
                style={{ marginLeft: 8 }}
              >
                Re-take / Different Interest
              </button>
            </div>
          </section>
        )}

        {/* footer */}
        <footer style={{ marginTop: 28, textAlign: "center", color: "#333", padding: 12 }}>
          <small>FEDF-PS30 — Career Assessment Tool · Built for student guidance</small>
        </footer>
      </div>
    </div>
  );
}
