// src/components/LikeButton.jsx
import api from '../services/api';
import { useState } from 'react';

export default function LikeButton({ answerId }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const res = await api.post(`answers/${answerId}/like/`);
      setLiked(res.data.liked);
    } catch (err) {
      alert('Like action failed');
    }
  };

  return (
    <button onClick={toggleLike}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
}
