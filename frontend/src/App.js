/*import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the prediction');
      }

      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        setPrediction(result.category);
      }
    } catch (err) {
      setError('Error: Could not connect to the backend. Make sure Flask is running.');
    }
  };

  return (
    <div className="App">
      <h1>Text Classification</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for classification"
          rows="4"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InputPage from './components/InputPage';
import PredictionPage from './components/PredictionPage';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState('');

  const handlePrediction = async (text) => {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const result = await response.json();
    setPrediction(result.category);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/input" element={<InputPage onSubmit={handlePrediction} />} />
          <Route path="/prediction" element={<PredictionPage prediction={prediction} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
