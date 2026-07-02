import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          💸 PayFlow
        </h1>

        <div className="space-x-6">
          <Link className="hover:text-blue-600" to="/">
            Home
          </Link>

          <Link className="hover:text-blue-600" to="/login">
            Login
          </Link>

          <Link className="hover:text-blue-600" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;