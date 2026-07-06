

import { Link, useNavigate } from "react-router-dom";
import { User, CreditCard, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          💸 PayFlow
        </Link>

        <div className="flex gap-6">

          <Link
            to="/payment"
            className="flex items-center gap-2"
          >
            <CreditCard size={20} />
            Payment
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2"
          >
            <User size={20} />
            Profile
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;