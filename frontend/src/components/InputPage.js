import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://document-classifier-xu5e.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const result = await response.json();
    navigate('/prediction', { state: { category: result.category } });
  };

  return (
    <div>
      <h1>Enter Text for Classification</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
        />
        <button type="submit">Classify</button>
      </form>
    </div>
  );
};

export default InputPage;
