import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/accounts/create-account/", formData);
      if (response.status === 201 || response.data?.status) {
        navigate("/login");
      } else {
        setError("Could not create account. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" className="border w-full p-3 rounded-md" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="border w-full p-3 rounded-md" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="bg-green-600 w-full py-2 text-white rounded-md hover:bg-green-700">Sign Up</button>
      </form>
      <p className="text-sm mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Signup;