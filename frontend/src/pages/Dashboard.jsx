import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        PayFlow Dashboard
      </h1>

      <Link
        to="/payment"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Create Payment
      </Link>
    </div>
  );
}

export default Dashboard;