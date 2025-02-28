// descriptionModel.js

const xgb_model = require('xgboost'); // Assuming you are using the xgboost model
const ada_model = require('adaboost'); // Example, adjust based on the model you're using
const { LabelEncoder } = require('label-encoder'); // For inverse transformation of predictions
const tfidf = require('tf-idf'); // Assuming you use a TF-IDF model for feature transformation

// Example function to load and initialize models
// You can replace this with actual model loading logic, such as loading pre-trained models from disk
let loadedXGBoostModel = null;
let loadedAdaBoostModel = null;

// Function to load models (this could be a real loading function if models are stored on disk)
const loadModels = () => {
    loadedXGBoostModel = xgb_model.loadModel('path/to/xgboost_model');
    loadedAdaBoostModel = ada_model.loadModel('path/to/adaboost_model');
};

// Function to predict snake species using the location and description
const predictSnakes = (location, description, modelType = 'XGBoost') => {
    // Ensure the models are loaded
    if (!loadedXGBoostModel || !loadedAdaBoostModel) {
        loadModels();
    }

    // Transform the description using TF-IDF or other feature extraction methods
    const descriptionTransformed = transformDescription(description);

    // Select the correct model
    let model = null;
    if (modelType === 'XGBoost') {
        model = loadedXGBoostModel;
    } else if (modelType === 'AdaBoost') {
        model = loadedAdaBoostModel;
    } else {
        throw new Error('Invalid model type');
    }

    // Make prediction using the selected model
    const prediction = model.predict(descriptionTransformed);

    // Post-process the predictions if necessary (e.g., reverse encoding labels)
    const predictedSpecies = postProcessPrediction(prediction);

    return predictedSpecies;
};

// Function to transform the description into a feature vector
const transformDescription = (description) => {
    // Here, you could use any kind of feature extraction, like TF-IDF or word embeddings
    return tfidf.transform([description]).toArray();
};

// Function to post-process the predictions (e.g., inverse transform label encodings)
const postProcessPrediction = (prediction) => {
    const labelEncoder = new LabelEncoder();
    return labelEncoder.inverseTransform(prediction);
};

// Export functions
module.exports = { predictSnakes };
