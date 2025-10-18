import { useState } from "react";
import { signup } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const employee = await signup(name, email, password);
      setUser(employee);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Employee Signup</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700">
          Sign Up
        </button>
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
