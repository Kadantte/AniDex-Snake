import React, { useState } from 'react';
import axios from 'axios';

function DescribeSnake() {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/snake/describe', { description });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Describe the Snake</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DescribeSnake;
