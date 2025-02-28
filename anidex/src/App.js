import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IdentifyImage from './pages/IdentifyImage';

import Results from './pages/Results';
import IdentifyByCamera from './pages/IdentifyByCamera';
import DescribeSnake from './pages/DescribeSnake'; // Ensure correct import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/describe" element={<DescribeSnake />} />
                <Route path="/identify-image" element={<IdentifyImage />} />
                <Route path="/results" element={<Results />} />
                <Route path="/identify-camera" element={<IdentifyByCamera />} />
            </Routes>
        </Router>
    );
}

export default App;
