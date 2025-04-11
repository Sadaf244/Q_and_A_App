import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ setQuestions }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8000/query/questions/", { title, body }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions((prev) => [response.data.data, ...prev]);
      setTitle("");
      setBody("");
    } catch (error) {
      alert("Failed to post question");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-xl space-y-4">
      <h3 className="text-xl font-semibold">Ask a Question</h3>
      <input type="text" placeholder="Title" className="border w-full p-2 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Body" className="border w-full p-2 rounded-md" value={body} onChange={(e) => setBody(e.target.value)} required />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default QuestionForm;