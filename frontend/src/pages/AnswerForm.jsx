import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId, setAnswers }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`http://localhost:8000/query/questions/${questionId}/answers/`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers((prev) => [...prev, res.data.data]);
      setText("");
    } catch (err) {
      alert("Failed to post answer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <textarea className="w-full border rounded-md p-2" placeholder="Your answer..." value={text} onChange={(e) => setText(e.target.value)} required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Post Answer</button>
    </form>
  );
};

export default AnswerForm;