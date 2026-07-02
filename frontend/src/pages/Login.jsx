import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        form.username,
        form.password
      );

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Username or Password");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-5">
          Login
        </h2>

        <input
          className="border w-full p-2 mb-4"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2 mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;