import React from 'react';
import { useLocation } from 'react-router-dom';

const PredictionPage = () => {
  const location = useLocation();

  // Retrieve the passed state (prediction result)
  const { category } = location.state || { category: "No prediction received" };

  return (
    <div>
      <h2>Prediction Result</h2>
      <p>The predicted category is: {category}</p>
    </div>
  );
};

export default PredictionPage;
