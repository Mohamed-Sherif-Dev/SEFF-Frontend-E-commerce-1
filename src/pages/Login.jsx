import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const savedUser = JSON.parse(localStorage.getItem("attar-user"));

    if (!savedUser) {
      setError("No account found, please register first.");
      return;
    }

    if (
      form.email.trim().toLowerCase() === savedUser.email &&
      form.password === savedUser.password
    ) {
      localStorage.setItem("attar-logged-in", "true");
      navigate("/"); // redirect after success
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 mt-6 py-12 border border-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
      <p className="mt-1 text-sm text-gray-600">Please login to continue.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4  ">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gray-900 text-white font-medium hover:opacity-90"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-900 font-medium underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}