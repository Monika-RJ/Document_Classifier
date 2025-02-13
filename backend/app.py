from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # This allows cross-origin requests from React frontend

# Load the trained model and vectorizer
model = joblib.load('D:/Document classification/documentclassification/models/logistic_regression_model.pkl')
vectorizer = joblib.load('D:/Document classification/documentclassification/models/tfidf_vectorizer.pkl')

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
