import React, { useEffect, useState } from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";

const AnswerList = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:8000/query/questions/${questionId}/answers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnswers(res.data.data);
      } catch (error) {
        console.error("Error fetching answers");
      }
    };
    fetchAnswers();
  }, [questionId]);

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold">Answers</h4>
      {answers.map((ans) => (
        <div key={ans.id} className="bg-gray-100 p-2 rounded-md">
          <p>{ans.text}</p>
          <p className="text-xs text-gray-500">By: {ans.author__email}</p>
        </div>
      ))}
      <AnswerForm questionId={questionId} setAnswers={setAnswers} />
    </div>
  );
};

export default AnswerList;
