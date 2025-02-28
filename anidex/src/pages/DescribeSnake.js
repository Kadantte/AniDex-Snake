import React, { useState } from 'react';
import axios from 'axios';
import './DescribeSnake.css'; // Ensure this import is correct

function DescribeSnake() {
    const [userAnswers, setUserAnswers] = useState({
        location: '',
        color: '',
        appearance: '',
        description: '',
        type: ''
    });
    const [submittedDescription, setSubmittedDescription] = useState(null);
    const [error, setError] = useState(null);

    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        setUserAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
    };

    const submitAnswers = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/snake/identify-description', userAnswers);
            setSubmittedDescription(response.data.result);
        } catch (err) {
            console.error('Error identifying creature:', err);
            setError('Failed to identify the creature. Please try again.');
        }
    };

    return (
        <div className="describe-container">
            <h2 className="title">Describe the Creature</h2>
            <form className="describe-form" onSubmit={submitAnswers}>
                <label>Location:</label>
                <input type="text" name="location" value={userAnswers.location} onChange={handleAnswerChange} required />

                <label>Color:</label>
                <input type="text" name="color" value={userAnswers.color} onChange={handleAnswerChange} required />

                <label>Appearance:</label>
                <input type="text" name="appearance" value={userAnswers.appearance} onChange={handleAnswerChange} required />

                <label>Description:</label>
                <textarea name="description" value={userAnswers.description} onChange={handleAnswerChange} required />

                <label>Type:</label>
                <select name="type" value={userAnswers.type} onChange={handleAnswerChange} required>
                    <option value="">Select Type</option>
                    <option value="Snake">Snake</option>
                    <option value="Scorpion">Scorpion</option>
                    <option value="Frog">Frog</option>
                    <option value="Lizard">Lizard</option>
                </select>

                <button type="submit" className="submit-btn">Identify</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {submittedDescription && (
                <div className="result">
                    <h3>Identified Creature:</h3>
                    <p>{submittedDescription}</p>
                </div>
            )}
        </div>
    );
}

export default DescribeSnake;