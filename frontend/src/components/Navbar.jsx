import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#222",
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>
      <Link to="/login" style={{ color: "white" }}>Login</Link>
      <Link to="/register" style={{ color: "white" }}>Register</Link>
      <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
    </nav>
  );
}

export default Navbar;