import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/query/questions/")
      .then(response => {
        if (response.data.status) {
          setQuestions(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Questions</h2>
      {questions.map(q => (
        <div key={q.id} className="mb-4 border p-3 rounded shadow">
          <h3 className="text-lg font-semibold">{q.title}</h3>
          <p>{q.body}</p>
          <p className="text-sm text-gray-500">By {q.author__email}</p>
          <Link
            to={`/questions/${q.id}/answers`}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View Answers
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
