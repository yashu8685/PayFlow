import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="flex justify-between items-center p-6 shadow bg-white">
        <h1 className="text-2xl font-bold text-blue-600">
          PayFlow
        </h1>

        <div className="space-x-4">
          <Link to="/login" className="text-blue-600">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="text-center py-24">

        <h1 className="text-5xl font-bold">
          Secure UPI Payment Management
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Create, manage and track UPI payments with QR codes.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Get Started
        </Link>

      </section>

    </div>
  );
}

export default Home;