import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <span>Career Assessment Tool</span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/assessment">Assessments</Link>
        <Link to="/explore">Career Explorer</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
