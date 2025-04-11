import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnswerList = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/query/questions/${id}/answers/`)
      .then(response => {
        if (response.data.status) {
          setAnswers(response.data.data.answers);
        }
      })
      .catch(error => console.error("Error fetching answers:", error));
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Answers</h2>
      {answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        answers.map(ans => (
          <div key={ans.id} className="mb-4 border p-3 rounded shadow">
            <p>{ans.text}</p>
            <p className="text-sm text-gray-500">By {ans.user}</p>
            <p>Likes: {ans.like_count}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AnswerList;
