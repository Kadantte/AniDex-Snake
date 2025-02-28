// Controller functions

const { predictSnakes } = require('../models/descriptionModel');
const { spawn } = require('child_process');
const path = require('path');

// Logic to process the image and call the ML model
const identifySnake = async (req, res) => {
    try {
        // Example logic for processing the image
        res.json({ success: true, message: 'Image processed', snake: 'Example Snake' });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image. Please try again.' });
    }
};

// Logic to process the description and call the ML model
const describeSnake = async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    try {
        // Example logic for processing the description
        res.json({ success: true, message: 'Description processed', snake: 'Example Snake' });
    } catch (error) {
        console.error('Error processing description:', error);
        res.status(500).json({ error: 'Failed to process description. Please try again.' });
    }
};

// Logic to identify a snake by description using a model
const identifyByDescriptionUsingModel = async (req, res) => {
    const { location, description } = req.body;

    if (!location || !description) {
        return res.status(400).json({ error: 'Location and description are required.' });
    }

    try {
        const result = predictSnakes(location, description, 'XGBoost'); // Use "XGBoost" or "AdaBoost"
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error in identifying snake by description:', error);
        res.status(500).json({ error: 'Failed to identify the snake. Please try again.' });
    }
};

// Logic to identify a snake by calling a Python script
const identifyByDescriptionUsingPython = (req, res) => {
    const { location, description } = req.body;

    if (!location || !description) {
        return res.status(400).json({ error: 'Location and description are required.' });
    }

    // Path to the Python script
    const pythonScript = path.join(__dirname, '../ml/snake_description_identifier.py');

    // Spawn a Python process
    const pythonProcess = spawn('python', [pythonScript, location, description]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                res.status(200).json({ success: true, result: JSON.parse(result) });
            } catch (error) {
                console.error('Error parsing Python script output:', error);
                res.status(500).json({ error: 'Error processing Python script output.' });
            }
        } else {
            res.status(500).json({ error: 'Failed to process description-based identification.' });
        }
    });
};

// Export functions
module.exports = {
    identifySnake,
    describeSnake,
    identifyByDescription: identifyByDescriptionUsingModel, // Default to model-based logic
    identifyByDescriptionUsingPython, // Python-based alternative
};
