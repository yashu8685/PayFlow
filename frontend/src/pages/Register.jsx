import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (error) {
      toast.error("Registration Failed");
      console.log(error);
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
            Welcome to PayFlow
          </h1>

          <p className="text-lg text-blue-100">
            Create your account and start managing UPI payments,
            QR codes, analytics, and transaction history.
          </p>

          <div className="mt-8">
            <div className="bg-blue-500 rounded-xl p-6">
              <h2 className="text-xl font-semibold">
                Secure & Fast
              </h2>

              <p className="mt-2 text-blue-100">
                Built using React, Django REST Framework,
                JWT Authentication, and SQLite.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Create Account
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
              type="email"
              name="email"
              placeholder="Email"
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;