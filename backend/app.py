from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # This allows cross-origin requests from React frontend

# Load the trained model and vectorizer
model_path = os.path.join(os.path.dirname(__file__), 'models', 'logistic_regression_model.pkl')
vectorizer_path = os.path.join(os.path.dirname(__file__), 'models', 'tfidf_vectorizer.pkl')

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  
    text = data.get('text', '')  
    
    if text:
        transformed_text = vectorizer.transform([text])
        prediction = model.predict(transformed_text)
        return jsonify({'category': prediction[0]})
    else:
        return jsonify({'error': 'No text provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
