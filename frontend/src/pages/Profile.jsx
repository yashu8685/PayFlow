import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/auth";

function Profile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();

    setForm({
      username: data.username,
      email: data.email,
      phone: data.phone || "",
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(form);

    alert("Profile Updated Successfully");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
          placeholder="Username"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
          placeholder="Phone"
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;