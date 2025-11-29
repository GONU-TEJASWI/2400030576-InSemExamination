import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("role", role);
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <p className="subtext">Access personalized career assessments</p>

      <div className="card">
        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleLogin} style={{ marginTop: "15px" }}>
          Continue
        </button>
      </div>
    </div>
  );
}
