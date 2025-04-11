import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import AnswerList from "./AnswerList";
import { useAuth } from "../context/AuthProvider";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { access } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/query/questions/",
          {
            headers: { Authorization: `Bearer ${access}` },
          }
        );
        setQuestions(response.data.data);
      } catch (err) {
        console.error("Error fetching questions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [access]);

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Questions</h2>
      <QuestionForm setQuestions={setQuestions} />
      <div className="space-y-6 mt-6">
        {questions.length === 0 ? (
          <p className="text-center">No questions found.</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="bg-white p-4 shadow-lg rounded-xl">
              <h3 className="text-xl font-semibold mb-2">{q.title}</h3>
              <p className="mb-2">{q.body}</p>
              <p className="text-sm text-gray-500 mb-4">By: {q.author__email}</p>
              <AnswerList questionId={q.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionList;