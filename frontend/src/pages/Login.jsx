import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">

          <h1 className="text-4xl font-bold mb-4">
            Welcome Back 👋
          </h1>

          <p className="text-lg text-blue-100">
            Login to continue managing your UPI payments, QR codes,
            analytics, and transaction history.
          </p>

          <div className="mt-8 bg-blue-500 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Fast • Secure • Reliable
            </h2>

            <p className="mt-2 text-blue-100">
              Built with React, Django REST Framework and JWT Authentication.
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-center mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;