// src/components/AnswerForm.jsx
import { useState } from 'react';
import api from '../services/api';

export default function AnswerForm({ questionId }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await api.post(`questions/${questionId}/answers/`, { answer });
      if (res.data.status) {
        alert('Answer posted!');
        setAnswer('');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Failed to post answer');
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Your answer"
        rows={3}
      />
      <br />
      <button onClick={handleSubmit}>Post Answer</button>
    </div>
  );
}
